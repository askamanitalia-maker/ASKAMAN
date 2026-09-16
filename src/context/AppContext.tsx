import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Operator,
  Call,
  Transaction,
  OperatorApplication,
  ComplianceLog,
  CreditPack,
  UserRole
} from '../types';
import {
  INITIAL_OPERATORS,
  INITIAL_CALLS,
  INITIAL_TRANSACTIONS,
  INITIAL_APPLICATIONS,
  CREDIT_PACKS
} from '../data/initialData';

interface AppContextType {
  currentUser: User | null;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  loginUser: (phone: string, isOperator?: boolean) => void;
  logout: () => void;
  operators: Operator[];
  calls: Call[];
  transactions: Transaction[];
  applications: OperatorApplication[];
  complianceLogs: ComplianceLog[];
  activeCall: {
    operator: Operator;
    startTime: number;
    durationSeconds: number;
    isFreeTrial: boolean;
    isMuted: boolean;
  } | null;
  startCall: (operator: Operator) => { success: boolean; message?: string };
  endCall: () => void;
  toggleCallMute: () => void;
  buyCreditPack: (pack: CreditPack) => void;
  submitCandidateApplication: (app: Omit<OperatorApplication, 'uid' | 'createdAt' | 'status'>) => void;
  approveCandidate: (appId: string) => void;
  rejectCandidate: (appId: string) => void;
  toggleOperatorStatus: (status: 'online' | 'busy' | 'offline') => void;
  toggleOperatorConsent: (operatorId: string) => void;
  recordComplianceAcknowledgment: (operatorUid: string) => void;
  isStripeModalOpen: boolean;
  setIsStripeModalOpen: (open: boolean) => void;
  isCandidateModalOpen: boolean;
  setIsCandidateModalOpen: (open: boolean) => void;
  selectedOperatorForCall: Operator | null;
  setSelectedOperatorForCall: (op: Operator | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'askaman_app_state_v3';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current user state: default to a new client who gets 10 minutes free trial!
  const [currentUser, setCurrentUser] = useState<User>(() => {
    return {
      uid: 'usr_silvia_demo',
      phone: '+39 347 882 1920',
      createdAt: '2026-09-01T10:00:00Z',
      creditsMinutes: 10, // 10 minuti di benvenuto gratis
      hasUsedFreeTrial: false,
      isFounder: true, // Prezzo bloccato 12 mesi a €1/min
      role: 'user',
      name: 'Elena F.'
    };
  });

  const [currentRole, setCurrentRole] = useState<UserRole>('user');
  const [operators, setOperators] = useState<Operator[]>(INITIAL_OPERATORS);
  const [calls, setCalls] = useState<Call[]>(INITIAL_CALLS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [applications, setApplications] = useState<OperatorApplication[]>(INITIAL_APPLICATIONS);
  const [complianceLogs, setComplianceLogs] = useState<ComplianceLog[]>([
    {
      id: 'comp_1',
      operatorUid: 'op_1',
      version: '2.4',
      acknowledgedAt: '2026-09-15T08:00:00Z'
    }
  ]);

  // Active call state
  const [activeCall, setActiveCall] = useState<{
    operator: Operator;
    startTime: number;
    durationSeconds: number;
    isFreeTrial: boolean;
    isMuted: boolean;
  } | null>(null);

  // Modals state
  const [isStripeModalOpen, setIsStripeModalOpen] = useState(false);
  const [isCandidateModalOpen, setIsCandidateModalOpen] = useState(false);
  const [selectedOperatorForCall, setSelectedOperatorForCall] = useState<Operator | null>(null);

  // Load from local storage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.operators) setOperators(parsed.operators);
        if (parsed.calls) setCalls(parsed.calls);
        if (parsed.transactions) setTransactions(parsed.transactions);
        if (parsed.applications) setApplications(parsed.applications);
        if (parsed.complianceLogs) setComplianceLogs(parsed.complianceLogs);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save changes
  useEffect(() => {
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ operators, calls, transactions, applications, complianceLogs })
      );
    } catch {
      // ignore
    }
  }, [operators, calls, transactions, applications, complianceLogs]);

  // Active call timer interval
  useEffect(() => {
    if (!activeCall) return;

    const interval = setInterval(() => {
      setActiveCall(prev => {
        if (!prev) return null;
        const newDuration = prev.durationSeconds + 1;
        const currentMinutesUsed = Math.ceil(newDuration / 60);

        // Max minutes allowed for this call
        const maxMinutesAllowed = prev.isFreeTrial ? 10 : currentUser.creditsMinutes;

        // Hard stop a credito esaurito
        if (currentMinutesUsed > maxMinutesAllowed) {
          // Trigger hard stop
          setTimeout(() => {
            endCall();
          }, 50);
          return prev;
        }

        return {
          ...prev,
          durationSeconds: newDuration
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeCall, currentUser.creditsMinutes]);

  const loginUser = (phone: string, isOperator: boolean = false) => {
    if (isOperator) {
      setCurrentRole('operator');
      setCurrentUser({
        uid: 'op_1',
        phone,
        createdAt: '2026-08-10T12:00:00Z',
        creditsMinutes: 0,
        hasUsedFreeTrial: true,
        isFounder: false,
        role: 'operator',
        name: 'Stefano M. (Operatore)'
      });
    } else {
      setCurrentRole('user');
      setCurrentUser({
        uid: 'usr_' + Date.now().toString(36),
        phone,
        createdAt: new Date().toISOString(),
        creditsMinutes: 10,
        hasUsedFreeTrial: false,
        isFounder: true,
        role: 'user',
        name: 'Utente Verificata'
      });
    }
  };

  const logout = () => {
    setCurrentRole('user');
  };

  const startCall = (operator: Operator) => {
    const isFreeTrial = !currentUser.hasUsedFreeTrial;
    if (!isFreeTrial && currentUser.creditsMinutes < 1) {
      setIsStripeModalOpen(true);
      return {
        success: false,
        message: 'Credito insufficiente. Ricarica i tuoi minuti per avviare la chiamata.'
      };
    }

    setActiveCall({
      operator,
      startTime: Date.now(),
      durationSeconds: 0,
      isFreeTrial,
      isMuted: false
    });
    setSelectedOperatorForCall(operator);
    return { success: true };
  };

  const endCall = () => {
    if (!activeCall) return;

    const durationMinutes = Math.max(1, Math.ceil(activeCall.durationSeconds / 60));
    const isFreeTrial = activeCall.isFreeTrial;
    const pricePerMin = 1.0;
    const totalCost = isFreeTrial ? 0 : durationMinutes * pricePerMin;
    const operatorPayout = durationMinutes * 0.5; // 50% split fisso
    const platformFee = durationMinutes * 0.5;

    const newCall: Call = {
      callSid: 'CA_' + Math.random().toString(36).substring(2, 12).toUpperCase(),
      userId: currentUser.uid,
      userName: `${currentUser.name || 'Cliente'} (${currentUser.phone})`,
      operatorId: activeCall.operator.uid,
      operatorName: activeCall.operator.name,
      status: 'completed',
      startTime: new Date(activeCall.startTime).toISOString(),
      endTime: new Date().toISOString(),
      durationMinutes,
      totalCost,
      operatorPayout,
      platformFee,
      isFreeTrial
    };

    setCalls(prev => [newCall, ...prev]);

    // Update user credits
    setCurrentUser(prev => {
      if (isFreeTrial) {
        return {
          ...prev,
          hasUsedFreeTrial: true,
          creditsMinutes: Math.max(0, prev.creditsMinutes - durationMinutes)
        };
      }
      return {
        ...prev,
        creditsMinutes: Math.max(0, prev.creditsMinutes - durationMinutes)
      };
    });

    // Update operator stats
    setOperators(prev =>
      prev.map(op =>
        op.uid === activeCall.operator.uid
          ? { ...op, totalCalls: op.totalCalls + 1 }
          : op
      )
    );

    setActiveCall(null);
  };

  const toggleCallMute = () => {
    setActiveCall(prev => (prev ? { ...prev, isMuted: !prev.isMuted } : null));
  };

  const buyCreditPack = (pack: CreditPack) => {
    const txId = 'tx_' + Math.random().toString(36).substring(2, 9);
    const newTx: Transaction = {
      id: txId,
      userId: currentUser.uid,
      stripeSessionId: 'cs_live_' + Math.random().toString(36).substring(2, 14),
      amountEUR: pack.priceEUR,
      minutesAdded: pack.minutes,
      packId: pack.id,
      createdAt: new Date().toISOString()
    };

    setTransactions(prev => [newTx, ...prev]);
    setCurrentUser(prev => ({
      ...prev,
      creditsMinutes: prev.creditsMinutes + pack.minutes
    }));
    setIsStripeModalOpen(false);
  };

  const submitCandidateApplication = (
    data: Omit<OperatorApplication, 'uid' | 'createdAt' | 'status'>
  ) => {
    const newApp: OperatorApplication = {
      ...data,
      uid: 'app_' + Math.random().toString(36).substring(2, 9),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setApplications(prev => [newApp, ...prev]);
  };

  const approveCandidate = (appId: string) => {
    const target = applications.find(a => a.uid === appId);
    if (!target) return;

    // Find first empty slot in 0..9
    const occupiedSlotIndexes = new Set(operators.map(o => o.slotIndex));
    let nextAvailableSlot = -1;
    for (let i = 0; i < 10; i++) {
      if (!occupiedSlotIndexes.has(i)) {
        nextAvailableSlot = i;
        break;
      }
    }

    if (nextAvailableSlot === -1) {
      alert('Tutti i 10 slot operatore sono attualmente occupati.');
      return;
    }

    const newOperator: Operator = {
      uid: 'op_' + Math.random().toString(36).substring(2, 8),
      slotIndex: nextAvailableSlot,
      name: target.name,
      ageRange: `${target.age} anni`,
      region: target.region,
      accent: target.accent,
      bio: target.relationalExperience,
      themes: target.themes.length > 0 ? target.themes : ['Ascolto e confronto', 'Dinamiche maschili'],
      audioIntroUrl: target.voiceSampleUrl || 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg',
      audioDurationSeconds: 35,
      photoUrl: target.photoUrl || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
      photoUnlockedByConsent: false,
      badges: ['Nuovo Operatore', 'Verificato da Admin'],
      pricePerMinute: 1.0,
      availableSlots: [target.availability || 'Oggi 15:00 - 19:00'],
      rating: 5.0,
      totalCalls: 0,
      status: 'online',
      testimonials: [
        { text: 'Nuovo operatore verificato e pronto all ascolto.', author: 'AskAMan Team' }
      ]
    };

    setOperators(prev => [...prev, newOperator]);
    setApplications(prev =>
      prev.map(a => (a.uid === appId ? { ...a, status: 'approved' } : a))
    );
  };

  const rejectCandidate = (appId: string) => {
    setApplications(prev =>
      prev.map(a => (a.uid === appId ? { ...a, status: 'rejected' } : a))
    );
  };

  const toggleOperatorStatus = (status: 'online' | 'busy' | 'offline') => {
    setOperators(prev =>
      prev.map(op => (op.uid === currentUser.uid ? { ...op, status } : op))
    );
  };

  const toggleOperatorConsent = (operatorId: string) => {
    setOperators(prev =>
      prev.map(op =>
        op.uid === operatorId
          ? { ...op, photoUnlockedByConsent: !op.photoUnlockedByConsent }
          : op
      )
    );
  };

  const recordComplianceAcknowledgment = (operatorUid: string) => {
    const newLog: ComplianceLog = {
      id: 'log_' + Date.now().toString(36),
      operatorUid,
      version: '2.4',
      acknowledgedAt: new Date().toISOString()
    };
    setComplianceLogs(prev => [newLog, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        setCurrentRole,
        loginUser,
        logout,
        operators,
        calls,
        transactions,
        applications,
        complianceLogs,
        activeCall,
        startCall,
        endCall,
        toggleCallMute,
        buyCreditPack,
        submitCandidateApplication,
        approveCandidate,
        rejectCandidate,
        toggleOperatorStatus,
        toggleOperatorConsent,
        recordComplianceAcknowledgment,
        isStripeModalOpen,
        setIsStripeModalOpen,
        isCandidateModalOpen,
        setIsCandidateModalOpen,
        selectedOperatorForCall,
        setSelectedOperatorForCall
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
