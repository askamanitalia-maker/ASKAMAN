export type UserRole = 'user' | 'operator' | 'admin';

export interface User {
  uid: string;
  phone: string;
  createdAt: string;
  creditsMinutes: number;
  hasUsedFreeTrial: boolean;
  isFounder: boolean; // Prezzo bloccato 12 mesi a €1/min per chi si registra nei primi 6 mesi
  role: UserRole;
  name?: string;
}

export interface Operator {
  uid: string;
  name: string;
  ageRange: string; // es. 35-42
  region: string; // es. Lombardia, Lazio, ecc.
  accent: string; // es. Milanese pacato, Romano caldo, Neutro
  bio: string; // Testo narrativo, vietati numeri su relazioni/amiche
  themes: string[]; // es. "Comportamenti maschili", "Crisi di coppia", "Uscite e segnali", "Lavoro e priorità"
  audioIntroUrl: string;
  audioDurationSeconds?: number;
  photoUrl: string; // Immagine con blur
  photoUnlockedByConsent: boolean; // Sblocco solo per consenso operatore, MAI legato al pagamento
  badges: string[]; // es. "Verificato", "Ascolto Empatico", "Top Valutato"
  pricePerMinute: number; // 1.0 €/min
  availableSlots: string[]; // es. "Oggi 15:00 - 19:00", "Domani 10:00 - 14:00"
  rating: number; // es. 4.9
  totalCalls: number;
  status: 'online' | 'busy' | 'offline';
  slotIndex: number; // 0 to 9 per griglia fissa di 10 slot
  testimonials?: { text: string; author: string }[];
}

export interface Call {
  callSid: string;
  userId: string;
  userName?: string;
  operatorId: string;
  operatorName?: string;
  status: 'completed' | 'failed' | 'in-progress' | 'cancelled';
  startTime: string;
  endTime: string;
  durationMinutes: number;
  totalCost: number; // calcolato in €
  operatorPayout: number; // 50% split (€0.50/min)
  platformFee: number; // 50% split (€0.50/min)
  isFreeTrial: boolean;
}

export interface Transaction {
  id: string;
  userId: string;
  stripeSessionId: string;
  amountEUR: number;
  minutesAdded: number;
  packId: 'starter_pack' | 'pack_10' | 'pack_30' | 'pack_60';
  createdAt: string;
}

export interface ScreeningAnswers {
  q1: string; // "Rifiuto e ricordo che il servizio vive solo in piattaforma."
  q2: string; // "Uso lo script di fuga e chiudo la chiamata."
  q3: string; // "Rifiuto: nessun incontro è consentito."
  q4: string; // "Dico che non sono competente e la rimando al medico."
}

export interface OperatorApplication {
  uid: string;
  name: string;
  phone: string;
  age: string;
  region: string;
  accent: string;
  availability: string;
  relationalExperience: string; // Testo narrativo
  themes: string[];
  selfDescription: string; // Autodescrizione in 3 righe
  answers: Partial<ScreeningAnswers>;
  screeningScore: number; // Deve essere 4/4
  acceptedCodeOfConduct: boolean;
  acceptedPrivacy: boolean;
  acceptedSplit: boolean;
  acceptedBanPolicy: boolean;
  voiceSampleUrl: string;
  photoUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface ComplianceLog {
  id: string;
  operatorUid: string;
  version: string;
  acknowledgedAt: string;
}

export interface CreditPack {
  id: 'starter_pack' | 'pack_10' | 'pack_30' | 'pack_60';
  name: string;
  minutes: number;
  priceEUR: number;
  description: string;
  badge?: string;
  oneTimeOnly?: boolean;
}
