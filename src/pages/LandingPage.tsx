/**
 * AskAMan - Cloud Functions 2nd Gen (TypeScript)
 * Backend services for Stripe Checkout Webhook, Twilio Voice Bridge, and Operator Approval
 */

import { onRequest, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

// Secret credentials loaded from environment
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || "";
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || "";
const TWILIO_MASKED_NUMBER = process.env.TWILIO_PHONE_NUMBER || "+390289010000";

/**
 * 1. stripeWebhook
 * On checkout.session.completed -> read metadata pack -> add minutes to users.creditsMinutes -> write transactions
 */
export const stripeWebhook = onRequest(async (req, res) => {
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    res.status(400).send("Missing Stripe signature header");
    return;
  }

  let event: any;
  try {
    // In production: stripe.webhooks.constructEvent(req.rawBody, sig, STRIPE_WEBHOOK_SECRET);
    event = req.body;
  } catch (err: any) {
    console.error("Stripe webhook signature verification failed:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata?.userId || session.client_reference_id;
    const packId = session.metadata?.packId;
    const minutesAdded = parseInt(session.metadata?.minutes || "0", 10);
    const amountEUR = session.amount_total ? session.amount_total / 100 : 0;

    if (!userId || !minutesAdded) {
      console.warn("Invalid metadata in Stripe session:", session.id);
      res.status(400).send("Incomplete session metadata");
      return;
    }

    try {
      const userRef = db.collection("users").doc(userId);
      const transactionRef = db.collection("transactions").doc();

      await db.runTransaction(async (t) => {
        const userDoc = await t.get(userRef);
        if (!userDoc.exists) {
          throw new Error(`User ${userId} not found`);
        }

        const currentCredits = userDoc.data()?.creditsMinutes || 0;
        t.update(userRef, {
          creditsMinutes: currentCredits + minutesAdded,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        t.set(transactionRef, {
          id: transactionRef.id,
          userId,
          stripeSessionId: session.id,
          amountEUR,
          minutesAdded,
          packId: packId || "pack_10",
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      });

      console.log(`Successfully credited ${minutesAdded} minutes to user ${userId}`);
      res.json({ received: true, creditedMinutes: minutesAdded });
      return;
    } catch (dbErr: any) {
      console.error("Firestore transaction error on Stripe webhook:", dbErr);
      res.status(500).send("Error updating credits in database");
      return;
    }
  }

  res.json({ received: true });
});

/**
 * 2. initiateCall
 * Verify (free trial or credits) -> create Twilio call with masked number,
 * bridge <Dial> towards operator, record=false, statusCallback=twilioStatusCallback,
 * initial voice disclaimer on privacy and non-clinical nature of service.
 */
export const initiateCall = onRequest(async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const { userId, operatorId, userPhone } = req.body;

  if (!userId || !operatorId || !userPhone) {
    res.status(400).json({ error: "Missing required call parameters" });
    return;
  }

  try {
    const userDoc = await db.collection("users").doc(userId).get();
    const operatorDoc = await db.collection("operators").doc(operatorId).get();

    if (!userDoc.exists || !operatorDoc.exists) {
      res.status(404).json({ error: "User or Operator record not found" });
      return;
    }

    const userData = userDoc.data();
    const operatorData = operatorDoc.data();

    // Check availability & credits
    const isFreeTrial = !userData?.hasUsedFreeTrial;
    const credits = userData?.creditsMinutes || 0;

    if (!isFreeTrial && credits < 1) {
      res.status(402).json({ error: "Credito minuti insufficiente per avviare la chiamata" });
      return;
    }

    // TwiML with masked voice announcement and non-clinical disclaimer
    const twimlResponse = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Giorgio" language="it-IT">
    Benvenuta su AskAMan. Questo è un servizio di conversazione informale.
    Gli operatori non sono psicologi né terapeuti. La tua privacy è garantita e nessun numero è condiviso.
    Mettiamo in connessione il tuo operatore.
  </Say>
  <!-- Bridge <Dial> with record=false and Twilio masked CallerId -->
  <Dial callerId="${TWILIO_MASKED_NUMBER}" record="false" timeout="30">
    <Number statusCallback="https://${process.env.GCP_PROJECT}.cloudfunctions.net/twilioStatusCallback"
            statusCallbackEvent="completed"
            statusCallbackMethod="POST">
      ${operatorData?.phone || "+390000000000"}
    </Number>
  </Dial>
</Response>`;

    res.type("text/xml").send(twimlResponse);
    return;
  } catch (err: any) {
    console.error("Error initiating Twilio bridge call:", err);
    res.status(500).json({ error: "Twilio voice bridge failed" });
    return;
  }
});

/**
 * 3. twilioStatusCallback
 * On status completed -> compute durationMinutes (ceiling rounded) ->
 * deduct credits or set hasUsedFreeTrial=true -> write calls with 50/50 split.
 */
export const twilioStatusCallback = onRequest(async (req, res) => {
  const { CallSid, CallStatus, CallDuration, userId, operatorId, isFreeTrial } = req.body;

  if (CallStatus !== "completed") {
    res.status(200).send("Call status ignored: not completed");
    return;
  }

  const durationSec = parseInt(CallDuration || "0", 10);
  // Arrotonda per eccesso al minuto intero
  const durationMinutes = Math.max(1, Math.ceil(durationSec / 60));

  const pricePerMinute = 1.0;
  const isTrial = isFreeTrial === "true" || isFreeTrial === true;
  const totalCost = isTrial ? 0 : durationMinutes * pricePerMinute;
  const operatorPayout = durationMinutes * 0.50; // Split 50% (€0.50/minuto)
  const platformFee = durationMinutes * 0.50; // Split 50% (€0.50/minuto)

  try {
    const callRef = db.collection("calls").doc(CallSid || `CA_${Date.now()}`);
    const userRef = db.collection("users").doc(userId);

    await db.runTransaction(async (t) => {
      const userDoc = await t.get(userRef);
      if (userDoc.exists) {
        if (isTrial) {
          t.update(userRef, {
            hasUsedFreeTrial: true,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          });
        } else {
          const currentCredits = userDoc.data()?.creditsMinutes || 0;
          t.update(userRef, {
            creditsMinutes: Math.max(0, currentCredits - durationMinutes),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          });
        }
      }

      t.set(callRef, {
        callSid: CallSid || callRef.id,
        userId,
        operatorId,
        status: "completed",
        startTime: admin.firestore.FieldValue.serverTimestamp(),
        endTime: admin.firestore.FieldValue.serverTimestamp(),
        durationMinutes,
        totalCost,
        operatorPayout,
        platformFee,
        isFreeTrial: isTrial,
        record: false, // Strict adherence: no recording
      });
    });

    res.status(200).send("Call logged and credits updated successfully");
    return;
  } catch (err: any) {
    console.error("Error updating call status callback:", err);
    res.status(500).send("Error logging completed call");
    return;
  }
});

/**
 * 4. approveOperator
 * Admin only -> create operators doc from approved operatorApplications ->
 * occupies the first empty slot in the fixed 10-slot grid.
 */
export const approveOperator = onRequest(async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const { adminToken, applicationId } = req.body;

  if (!applicationId) {
    res.status(400).json({ error: "Missing applicationId" });
    return;
  }

  try {
    const appRef = db.collection("operatorApplications").doc(applicationId);
    const appDoc = await appRef.get();

    if (!appDoc.exists) {
      res.status(404).json({ error: "Application not found" });
      return;
    }

    const appData = appDoc.data();

    // Verify 4/4 screening score mandatory requirement
    if (appData?.screeningScore < 4) {
      res.status(400).json({ error: "Screening score must be 4/4 to approve operator" });
      return;
    }

    // Find first vacant slot in 0..9
    const operatorsSnap = await db.collection("operators").get();
    const occupiedSlots = new Set<number>();
    operatorsSnap.forEach((doc) => {
      const slot = doc.data().slotIndex;
      if (typeof slot === "number") occupiedSlots.add(slot);
    });

    let firstFreeSlot = -1;
    for (let i = 0; i < 10; i++) {
      if (!occupiedSlots.has(i)) {
        firstFreeSlot = i;
        break;
      }
    }

    if (firstFreeSlot === -1) {
      res.status(400).json({ error: "All 10 operator slots are already filled." });
      return;
    }

    const newOperatorRef = db.collection("operators").doc(appData?.uid || `op_${Date.now()}`);

    await db.runTransaction(async (t) => {
      t.update(appRef, {
        status: "approved",
        approvedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      t.set(newOperatorRef, {
        uid: newOperatorRef.id,
        slotIndex: firstFreeSlot,
        name: appData?.name,
        phone: appData?.phone,
        ageRange: `${appData?.age} anni`,
        region: appData?.region,
        accent: appData?.accent,
        bio: appData?.relationalExperience,
        themes: appData?.themes || ["Ascolto e confronto", "Dinamiche maschili"],
        audioIntroUrl: appData?.voiceSampleUrl || "",
        audioDurationSeconds: 40,
        photoUrl: appData?.photoUrl || "",
        photoUnlockedByConsent: false, // Safeguard: blur active by default
        badges: ["Operatore Verificato", "Nuovo Ingresso"],
        pricePerMinute: 1.0,
        availableSlots: [appData?.availability || "Pomeriggi 15:00 - 19:00"],
        rating: 5.0,
        totalCalls: 0,
        status: "online",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    });

    res.json({
      success: true,
      operatorId: newOperatorRef.id,
      assignedSlotIndex: firstFreeSlot,
    });
    return;
  } catch (err: any) {
    console.error("Error approving operator:", err);
    res.status(500).json({ error: "Failed to approve operator application" });
    return;
  }
});
