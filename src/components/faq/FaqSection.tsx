import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  PhoneCall,
  Flame,
  Search,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'how_it_works' | 'why_askaman';
  tag: string;
}

export const FAQ_DATA: FaqItem[] = [
  // SEZIONE A: "Come Funziona" (Focus operativo)
  {
    id: 'anonimato-totale',
    category: 'how_it_works',
    tag: 'Sicurezza & Privacy',
    question: 'Come garantite il mio anonimato totale?',
    answer:
      'La chiamata avviene tramite un bridge vocale protetto. Tu non vedi il numero dell\'operatore, lui non vede il tuo. Nessuna registrazione audio viene conservata.'
  },
  {
    id: 'costo-e-pagamento',
    category: 'how_it_works',
    tag: 'Tariffe & Minuti',
    question: 'Quanto costa e come funziona il pagamento?',
    answer:
      'I primi 10 minuti sono gratuiti. Successivamente, acquisti solo i minuti che desideri a partire da 5€. Un avviso vocale ti avvisa quando il credito sta per esaurirsi, senza addebiti a sorpresa.'
  },
  {
    id: 'chi-sono-gli-operatori',
    category: 'how_it_works',
    tag: 'Team & Selezione',
    question: 'Chi sono gli operatori AskAMan?',
    answer:
      'Non sono consulenti professionali o psicologi. Sono uomini reali, verificati dalla piattaforma, con un bagaglio di esperienze di vita, relazioni e lavoro, selezionati per la loro capacità di ascolto e sincerità.'
  },

  // SEZIONE B: "Perché AskAMan" (Focus sui Paypoint e Valore Unico)
  {
    id: 'differenza-podcast-libri',
    category: 'why_askaman',
    tag: 'Unicità del Servizio',
    question: 'In cosa vi differenziate da un podcast o da un libro di relazioni?',
    answer:
      'Un podcast è intrattenimento "uno-a-molti". AskAMan è un servizio "uno-a-uno" on-demand. Risolvi un tuo dubbio specifico in tempo reale, non ricevi consigli generici.'
  },
  {
    id: 'vantaggio-100-italiano',
    category: 'why_askaman',
    tag: 'Contesto Culturale',
    question: 'Perché è un vantaggio che il servizio sia 100% italiano?',
    answer:
      'Le dinamiche familiari, le sfumature del lavoro e i "codici" relazionali italiani sono unici. Un operatore italiano comprende istintivamente il tuo contesto culturale, cosa che un contenuto internazionalizzato non può offrire.'
  },
  {
    id: 'pragmatico-non-terapeutico',
    category: 'why_askaman',
    tag: 'Filosofia & Metodo',
    question: 'Perché definite il servizio "pragmatico" e non terapeutico?',
    answer:
      'Offriamo una traduzione pratica del pensiero maschile basata su esperienze vissute. Non facciamo diagnosi né usiamo gergo accademico. Siamo un complemento di chiarezza, non una sostituzione della terapia.'
  }
];

interface FaqSectionProps {
  onCtaClick?: () => void;
  className?: string;
  defaultCategory?: 'all' | 'how_it_works' | 'why_askaman';
  showTabs?: boolean;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  onCtaClick,
  className = '',
  defaultCategory = 'all',
  showTabs = true
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'how_it_works' | 'why_askaman'>(defaultCategory);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'anonimato-totale': true // Aperta di default per trasparenza immediata
  });
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredItems = FAQ_DATA.filter(item => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const sectionAItems = filteredItems.filter(i => i.category === 'how_it_works');
  const sectionBItems = filteredItems.filter(i => i.category === 'why_askaman');

  return (
    <div className={`space-y-12 max-w-4xl mx-auto ${className}`}>
      {/* Search & Tabs Controls */}
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Cerca un argomento o una domanda..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#14213D]/15 text-[#14213D] text-sm placeholder:text-[#6B7A99]/70 focus:outline-hidden focus:border-[#E07A5F] shadow-xs transition-all"
          />
          <Search size={18} className="absolute left-4 top-3.5 text-[#6B7A99]" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3.5 text-xs text-[#6B7A99] hover:text-[#14213D] cursor-pointer"
            >
              Cancella
            </button>
          )}
        </div>

        {/* Tabs switcher */}
        {showTabs && (
          <div className="flex items-center justify-center p-1.5 bg-[#14213D]/5 border border-[#14213D]/10 rounded-2xl max-w-md mx-auto">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white text-[#14213D] shadow-xs'
                  : 'text-[#6B7A99] hover:text-[#14213D]'
              }`}
            >
              Tutte ({FAQ_DATA.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('how_it_works')}
              className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'how_it_works'
                  ? 'bg-[#14213D] text-[#F6F1E7] shadow-xs'
                  : 'text-[#6B7A99] hover:text-[#14213D]'
              }`}
            >
              <PhoneCall size={14} className="shrink-0" />
              <span>Come Funziona</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('why_askaman')}
              className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'why_askaman'
                  ? 'bg-[#E07A5F] text-[#F6F1E7] shadow-xs'
                  : 'text-[#6B7A99] hover:text-[#14213D]'
              }`}
            >
              <Flame size={14} className="shrink-0" />
              <span>Perché AskAMan</span>
            </button>
          </div>
        )}
      </div>

      {/* Accordion Sections */}
      <div className="space-y-12">
        {/* SEZIONE A: COME FUNZIONA */}
        {(activeTab === 'all' || activeTab === 'how_it_works') && sectionAItems.length > 0 && (
          <section aria-labelledby="section-how-it-works" className="space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-[#14213D]/10">
              <div className="w-7 h-7 rounded-lg bg-[#14213D] text-[#F6F1E7] flex items-center justify-center shrink-0">
                <PhoneCall size={15} />
              </div>
              <div>
                <h3 id="section-how-it-works" className="text-lg sm:text-xl font-extrabold text-[#14213D]">
                  Come Funziona
                </h3>
                <p className="text-xs text-[#6B7A99]">
                  Aspetti operativi, privacy telefonica e gestione dei minuti
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {sectionAItems.map(item => (
                <AccordionCard
                  key={item.id}
                  item={item}
                  isOpen={!!openItems[item.id]}
                  onToggle={() => toggleItem(item.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* SEZIONE B: PERCHÉ ASKAMAN */}
        {(activeTab === 'all' || activeTab === 'why_askaman') && sectionBItems.length > 0 && (
          <section aria-labelledby="section-why-askaman" className="space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-[#14213D]/10">
              <div className="w-7 h-7 rounded-lg bg-[#E07A5F] text-[#F6F1E7] flex items-center justify-center shrink-0">
                <Flame size={15} />
              </div>
              <div>
                <h3 id="section-why-askaman" className="text-lg sm:text-xl font-extrabold text-[#14213D]">
                  Perché AskAMan
                </h3>
                <p className="text-xs text-[#6B7A99]">
                  Focus sui punti di forza, valore unico e pragmatismo del dialogo
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {sectionBItems.map(item => (
                <AccordionCard
                  key={item.id}
                  item={item}
                  isOpen={!!openItems[item.id]}
                  onToggle={() => toggleItem(item.id)}
                  accent="terracotta"
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty state if search has no results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12 px-4 rounded-3xl bg-white/60 border border-[#14213D]/10 space-y-3">
            <HelpCircle size={32} className="mx-auto text-[#6B7A99]" />
            <h4 className="font-bold text-[#14213D]">Nessuna domanda trovata</h4>
            <p className="text-xs text-[#6B7A99]">
              Prova a cercare un termine differente o ripristina la visualizzazione di tutte le categorie.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveTab('all');
              }}
              className="px-4 py-2 rounded-xl bg-[#14213D] text-[#F6F1E7] text-xs font-semibold cursor-pointer"
            >
              Mostra tutte le FAQ
            </button>
          </div>
        )}
      </div>

      {/* Reassurance Footer Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#14213D] to-[#1E293B] text-[#F6F1E7] shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E07A5F] flex items-center gap-1.5">
              <ShieldCheck size={14} />
              <span>Nessun rischio, nessuna carta richiesta</span>
            </span>
            <h4 className="text-lg sm:text-xl font-extrabold text-[#F6F1E7]">
              Hai un dubbio che merita una risposta sincera?
            </h4>
            <p className="text-xs text-[#F6F1E7]/70 max-w-lg leading-relaxed">
              Ascolta la voce degli operatori verificati e testa subito la prima chiamata senza impegno.
            </p>
          </div>

          <button
            type="button"
            onClick={onCtaClick}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#E07A5F] hover:bg-[#C8532F] text-[#F6F1E7] font-bold text-xs sm:text-sm tracking-tight shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>Prova con 10 Min Gratis</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

interface AccordionCardProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  accent?: 'navy' | 'terracotta';
}

const AccordionCard: React.FC<AccordionCardProps> = ({
  item,
  isOpen,
  onToggle,
  accent = 'navy'
}) => {
  return (
    <div
      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
        isOpen
          ? 'bg-white border-[#14213D]/25 shadow-md'
          : 'bg-white/80 border-[#14213D]/10 hover:border-[#14213D]/20 hover:bg-white shadow-xs'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer focus:outline-hidden"
      >
        <div className="space-y-1.5 pr-2">
          <span
            className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              accent === 'terracotta'
                ? 'bg-[#E07A5F]/15 text-[#C8532F]'
                : 'bg-[#14213D]/10 text-[#14213D]'
            }`}
          >
            {item.tag}
          </span>
          <h4
            className={`text-sm sm:text-base font-bold transition-colors ${
              isOpen
                ? accent === 'terracotta'
                  ? 'text-[#C8532F]'
                  : 'text-[#14213D]'
                : 'text-[#14213D] hover:text-[#E07A5F]'
            }`}
          >
            {item.question}
          </h4>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
            isOpen
              ? accent === 'terracotta'
                ? 'bg-[#E07A5F] text-[#F6F1E7]'
                : 'bg-[#14213D] text-[#F6F1E7]'
              : 'bg-[#14213D]/5 text-[#6B7A99]'
          }`}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm text-[#4A5568] leading-relaxed border-t border-[#14213D]/5">
              <p>{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FaqSection;
