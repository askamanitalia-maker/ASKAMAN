import { Operator, Call, Transaction, OperatorApplication, CreditPack } from '../types';

export const CREDIT_PACKS: CreditPack[] = [
  {
    id: 'starter_pack',
    name: 'Starter Pack',
    minutes: 30,
    priceEUR: 5,
    description: 'Offerta di benvenuto valida 30 giorni. Solo per nuove clienti.',
    badge: 'Offerta Speciale - Una Tantum',
    oneTimeOnly: true
  },
  {
    id: 'pack_10',
    name: 'Pack 10 Minuti',
    minutes: 10,
    priceEUR: 10,
    description: 'Ideale per un consiglio rapido e focalizzato su una situazione specifica.'
  },
  {
    id: 'pack_30',
    name: 'Pack 30 Minuti',
    minutes: 30,
    priceEUR: 27,
    description: 'Il più scelto: spazio per approfondire dinamiche di coppia e messaggi.',
    badge: 'Risparmi il 10%'
  },
  {
    id: 'pack_60',
    name: 'Pack 60 Minuti',
    minutes: 60,
    priceEUR: 50,
    description: 'Massima flessibilità da usare in più chiamate quando ne senti il bisogno.',
    badge: 'Miglior Valore'
  }
];

export const INITIAL_OPERATORS: Operator[] = [
  {
    uid: 'op_1',
    slotIndex: 0,
    name: 'Stefano M.',
    ageRange: '58 anni',
    region: 'Emilia-Romagna',
    accent: 'Emiliano caloroso e diretto',
    bio: '58 anni, emiliano e imprenditore. Alle spalle ho un matrimonio, 6 relazioni importanti durate circa cinque anni ciascuna e due figlie di 21 e 17 anni: una è un vero campione nello sport, l\'altra lo è altrettanto ma è speciale... Ho vissuto la vita a 360 gradi, tra successi professionali, responsabilità familiari e la complessità di far convivere impresa e affetti. Ti offro uno sguardo lucido, schietto e sincero su come noi uomini gestiamo le priorità, le paure e i sentimenti.',
    themes: ['Relazioni lunghe e maturità', 'Padri, figlie e famiglia speciale', 'Lavoro imprenditoriale e vita di coppia', 'Ripartire dopo un matrimonio'],
    audioIntroUrl: 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg',
    audioDurationSeconds: 42,
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    photoUnlockedByConsent: false,
    badges: ['Operatore Verificato', 'Imprenditore', 'Esperienza 50+', 'Mattina (7:00-14:00)'],
    pricePerMinute: 1.0,
    availableSlots: ['Tutti i giorni 07:00 - 14:00'],
    rating: 4.96,
    totalCalls: 184,
    status: 'online',
    testimonials: [
      { text: 'Un uomo di un\'esperienza e sensibilità rare. Ha inquadrato la situazione con il mio compagno in dieci minuti netti.', author: 'Serena, 47 anni' },
      { text: 'Il consiglio di un padre e di un uomo di mondo. Diretto, rispettoso e illuminante.', author: 'Chiara, 42 anni' }
    ]
  },
  {
    uid: 'op_2',
    slotIndex: 1,
    name: 'Paolo T.',
    ageRange: '60 anni',
    region: 'Emilia-Romagna',
    accent: 'Emiliano arguto e di spirito',
    bio: '60 anni, emiliano. Sposato con un matrimonio altalenante, pieno di alti e bassi come accade in ogni storia vera, e un figlio ormai grande fuori sede. Mi considerano una persona intelligente e con molto spirito: se hai bisogno di farti una risata liberatoria, sdrammatizzare un\'ansia e al contempo capire cosa gli passa per la testa quando si chiude a riccio o fa il distratto, sono qui per te con il sorriso e la verità.',
    themes: ['Matrimoni lunghi e dinamiche altalenanti', 'Umorismo e sdrammatizzare le crisi', 'Rapporti con figli fuori sede', 'La mente del marito senza segreti'],
    audioIntroUrl: 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg',
    audioDurationSeconds: 38,
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    photoUnlockedByConsent: false,
    badges: ['Operatore Verificato', 'Spirito & Sorriso', 'Matrimonio Reale', 'Pomeriggio (14:00-19:00)'],
    pricePerMinute: 1.0,
    availableSlots: ['Tutti i giorni 14:00 - 19:00'],
    rating: 4.94,
    totalCalls: 142,
    status: 'online',
    testimonials: [
      { text: 'Oltre a farmi ridere di cuore, mi ha aperto gli occhi sulle abitudini di mio marito dopo 20 anni insieme.', author: 'Daniela, 53 anni' }
    ]
  },
  {
    uid: 'op_3',
    slotIndex: 2,
    name: 'Roberto S.',
    ageRange: '52 anni',
    region: 'Nord Italia',
    accent: 'Lombardo pacato e sincero',
    bio: 'Operaio da una vita con orgoglio, sposato con una donna straordinaria che fa la dirigente aziendale e padre di una figlia che vive e lavora all\'estero. Vivere accanto a una moglie in carriera e con ruoli impegnativi mi ha reso un uomo molto sensibile, concreto e con una naturale predisposizione al vero ascolto. Nessun giudizio, tanta empatia e la schiettezza di chi ha i piedi ben piantati per terra.',
    themes: ['Ascolto empatico e sensibilità', 'Coppia con ruoli e carriere diverse', 'Lontananza e figli all\'estero', 'Comprensione maschile senza filtri'],
    audioIntroUrl: 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg',
    audioDurationSeconds: 45,
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    photoUnlockedByConsent: false,
    badges: ['Operatore Verificato', 'Ascolto Profondo', 'Sensibilità Maschile', 'Sera (18:30-20:00)'],
    pricePerMinute: 1.0,
    availableSlots: ['Tutti i giorni 18:30 - 20:00'],
    rating: 4.97,
    totalCalls: 167,
    status: 'online',
    testimonials: [
      { text: 'Una dolcezza e un\'onestà disarmanti. Non mi sono mai sentita giudicata per le mie fragilità.', author: 'Elena, 39 anni' }
    ]
  },
  {
    uid: 'op_4',
    slotIndex: 3,
    name: 'Paolo M.',
    ageRange: '57 anni',
    region: 'Milano / Cosmopolita',
    accent: 'Neutro internazionale e caldo',
    bio: '57 anni, instancabile viaggiatore. Nel mio passato tante relazioni importanti, un matrimonio con una donna più grande di me di 9 anni, prima separati e successivamente rimasto vedovo. Ho visitato e vissuto mezzo mondo e sviluppato mille competenze in molteplici campi imprenditoriali. Conosco le sfumature dell\'animo maschile, il valore della libertà, il dolore della perdita e la gioia di ricominciare. Disponibile anche a notte fonda per chi non riesce a dormire.',
    themes: ['Differenza di età nella coppia', 'Superare perdite e lutti', 'Visione notturna senza censure', 'Spirito libero e viaggi'],
    audioIntroUrl: 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg',
    audioDurationSeconds: 50,
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    photoUnlockedByConsent: false,
    badges: ['Operatore Verificato', 'Viaggiatore Esperto', 'Sessioni Notturne (24-4am)', 'Poliedrico'],
    pricePerMinute: 1.0,
    availableSlots: ['Pomeriggio 14:00 - 17:00', 'Notte 00:00 - 04:00'],
    rating: 4.98,
    totalCalls: 215,
    status: 'online',
    testimonials: [
      { text: 'Poter parlare alle due di notte con una persona così saggia e accogliente mi ha salvato da una crisi di panico.', author: 'Francesca, 45 anni' }
    ]
  },
  {
    uid: 'op_5',
    slotIndex: 4,
    name: 'Giuseppe I.',
    ageRange: '38 anni',
    region: 'Puglia',
    accent: 'Pugliese solare e magnetico',
    bio: '38 anni, pugliese, armatore appassionato del mare, delle imbarcazioni e del benessere fisico. Essendo un uomo dinamico, sportivo e molto richiesto, so esattamente cosa passa per la mente di un uomo contemporaneo quando desidera una donna, quando è davvero coinvolto o quando al contrario prende tempo e accampa scuse. Ti svelo i retroscena della testa maschile con trasparenza totale e zero sconti.',
    themes: ['Cosa pensa davvero un uomo', 'Segnali di vero interesse vs scuse', 'Corteggiamento, attrazione e verità', 'Passione per il mare e forma fisica'],
    audioIntroUrl: 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg',
    audioDurationSeconds: 35,
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    photoUnlockedByConsent: false,
    badges: ['Operatore Verificato', 'Armatore', 'Cosa Pensa un Uomo', 'Mattina (10:00-14:00)'],
    pricePerMinute: 1.0,
    availableSlots: ['Tutti i giorni 10:00 - 14:00'],
    rating: 4.92,
    totalCalls: 153,
    status: 'online',
    testimonials: [
      { text: 'Diretto e chiarissimo. Mi ha fatto risparmiare mesi di inutili attese dietro a uno che non era davvero interessato.', author: 'Valentina, 36 anni' }
    ]
  },
  {
    uid: 'op_6',
    slotIndex: 5,
    name: 'Marco B.',
    ageRange: '59 anni',
    region: 'Emilia-Romagna (Romagna)',
    accent: 'Romagnolo schietto e riflessivo',
    bio: '59 anni, romagnolo. Ricercatore, studioso e imprenditore nel settore del turismo. Insegno storia e guido percorsi di turismo religioso; due figli e una moglie che lavora come guida di viaggi in Nepal. Essendo io il punto di riferimento più presente a casa, conosco profondamente la conciliazione tra famiglia, indipendenza reciproca e rispetto per le strade di ciascuno. Offro una visione saggia, colta e quotidiana.',
    themes: ['Coppia e vite indipendenti', 'Padre presente e gestione familiare', 'Turismo, storia e spiritualità', 'Dialogo profondo e rispetto reciproco'],
    audioIntroUrl: 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg',
    audioDurationSeconds: 40,
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
    photoUnlockedByConsent: false,
    badges: ['Operatore Verificato', 'Studioso & Storico', 'Turismo & Nepal', 'Fasce 15-17 & 21-23'],
    pricePerMinute: 1.0,
    availableSlots: ['Pomeriggio 15:00 - 17:00', 'Sera 21:00 - 23:00'],
    rating: 4.96,
    totalCalls: 178,
    status: 'online',
    testimonials: [
      { text: 'Una profondità di pensiero magnifica. Mi ha aiutato a capire il bisogno di spazi personali senza sentirmi rifiutata.', author: 'Lucia, 50 anni' }
    ]
  },
  {
    uid: 'op_7',
    slotIndex: 6,
    name: 'Lorenzo F.',
    ageRange: '51 anni',
    region: 'Italia',
    accent: 'Italiano accogliente e misurato',
    bio: '51 anni. Nuovo operatore in arrivo sulla piattaforma AskAMan. Presto disponibile per sessioni di ascolto riservato, confronto autentico e decodifica dei comportamenti e dei pensieri maschili.',
    themes: ['Nuovo operatore', 'Prospettiva maschile', 'Esperienza 50+', 'Ascolto e dialogo'],
    audioIntroUrl: 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg',
    audioDurationSeconds: 30,
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    photoUnlockedByConsent: false,
    badges: ['Nuovo Operatore', 'In Attivazione', 'Slot #7'],
    pricePerMinute: 1.0,
    availableSlots: ['A breve disponibile'],
    rating: 5.0,
    totalCalls: 0,
    status: 'offline',
    testimonials: [
      { text: 'Profilo in attivazione. Presto disponibile per le prime chiamate.', author: 'Team AskAMan' }
    ]
  },
  {
    uid: 'op_8',
    slotIndex: 7,
    name: 'Fabrizio M.',
    ageRange: '59 anni',
    region: 'Italia',
    accent: 'Calmo, saggio ed esperto',
    bio: '59 anni. Nuovo operatore in attivazione su AskAMan. Bagaglio di vita, maturità relazionale e sguardo lucido sulle complessità del mondo maschile.',
    themes: ['Nuovo operatore', 'Maturità e saggezza', 'Dinamiche di coppia', 'Punto di vista maschile'],
    audioIntroUrl: 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg',
    audioDurationSeconds: 30,
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    photoUnlockedByConsent: false,
    badges: ['Nuovo Operatore', 'In Attivazione', 'Slot #8'],
    pricePerMinute: 1.0,
    availableSlots: ['A breve disponibile'],
    rating: 5.0,
    totalCalls: 0,
    status: 'offline',
    testimonials: [
      { text: 'Profilo in attivazione. Presto disponibile per le prime chiamate.', author: 'Team AskAMan' }
    ]
  }
  // Slots 8 and 9 are currently empty ("Posizione aperta — Operatore in arrivo") to complete the 10-slot grid
];

export const INITIAL_CALLS: Call[] = [
  {
    callSid: 'CA_8392019482',
    userId: 'user_current',
    userName: 'Silvia M. (+39 347 *** 912)',
    operatorId: 'op_1',
    operatorName: 'Stefano M.',
    status: 'completed',
    startTime: '2026-09-15T16:30:00Z',
    endTime: '2026-09-15T16:40:00Z',
    durationMinutes: 10,
    totalCost: 0,
    operatorPayout: 5.0, // €0.50/min coperto da piattaforma per trial
    platformFee: 0,
    isFreeTrial: true
  },
  {
    callSid: 'CA_7194012845',
    userId: 'user_cliente_2',
    userName: 'Francesca B. (+39 333 *** 481)',
    operatorId: 'op_2',
    operatorName: 'Paolo T.',
    status: 'completed',
    startTime: '2026-09-14T11:15:00Z',
    endTime: '2026-09-14T11:35:00Z',
    durationMinutes: 20,
    totalCost: 20.0,
    operatorPayout: 10.0, // 50% split
    platformFee: 10.0, // 50% split
    isFreeTrial: false
  },
  {
    callSid: 'CA_6203948172',
    userId: 'user_cliente_3',
    userName: 'Paola G. (+39 328 *** 119)',
    operatorId: 'op_1',
    operatorName: 'Stefano M.',
    status: 'completed',
    startTime: '2026-09-13T18:00:00Z',
    endTime: '2026-09-13T18:15:00Z',
    durationMinutes: 15,
    totalCost: 15.0,
    operatorPayout: 7.5,
    platformFee: 7.5,
    isFreeTrial: false
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_9812401',
    userId: 'user_current',
    stripeSessionId: 'cs_test_a1b2c3d4e5f6',
    amountEUR: 5.0,
    minutesAdded: 30,
    packId: 'starter_pack',
    createdAt: '2026-09-15T10:20:00Z'
  },
  {
    id: 'tx_8719203',
    userId: 'user_cliente_2',
    stripeSessionId: 'cs_test_x9y8z7w6v5u4',
    amountEUR: 27.0,
    minutesAdded: 30,
    packId: 'pack_30',
    createdAt: '2026-09-13T15:40:00Z'
  }
];

export const INITIAL_APPLICATIONS: OperatorApplication[] = [
  {
    uid: 'app_101',
    name: 'Simone B.',
    phone: '+39 340 558 9123',
    age: '41',
    region: 'Liguria (Genova)',
    accent: 'Ligure pacato e riflessivo',
    availability: 'Pomeriggi 15:00 - 19:00 e serali',
    relationalExperience: 'Ho vissuto un percorso umano ricco di confronti personali sinceri. Negli anni ho imparato che la maggior parte delle incomprensioni tra uomo e donna nasce dalla diversa gestione dello stress e dal timore maschile di sentirsi inadeguati quando non hanno una soluzione pratica immediata.',
    themes: ['Gestione dello stress e silenzi', 'Convivenza e spazi personali', 'Comunicazione costruttiva'],
    selfDescription: 'Ascoltatore attento con predisposizione alla sintesi obiettiva.\nEvito giudizi morali e mi concentro sulla decodifica dei fatti.\nOffro calma e un punto di vista maschile ponderato.',
    answers: {
      q1: 'Rifiuto e ricordo che il servizio vive solo in piattaforma.',
      q2: 'Uso lo script di fuga e chiudo la chiamata.',
      q3: 'Rifiuto: nessun incontro è consentito.',
      q4: 'Dico che non sono competente e la rimando al medico.'
    },
    screeningScore: 4,
    acceptedCodeOfConduct: true,
    acceptedPrivacy: true,
    acceptedSplit: true,
    acceptedBanPolicy: true,
    voiceSampleUrl: 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg',
    photoUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&auto=format&fit=crop&q=80',
    status: 'pending',
    createdAt: '2026-09-16T06:30:00Z'
  }
];
