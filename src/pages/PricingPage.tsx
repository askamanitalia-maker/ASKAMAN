import React, { useState } from 'react';
import {
  Check,
  ShieldCheck,
  Phone,
  Sparkles,
  Lock,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Mic,
  Award,
  Users
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CtaButton } from '../components/common/CtaButton';
import { CREDIT_PACKS } from '../data/initialData';

interface PricingPageProps {
  onNavigate: (path: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const {
    currentUser,
    setIsStripeModalOpen,
    openStripeModalWithPack,
    setIsRegistrationModalOpen
  } = useApp();

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleFreeTrialCta = () => {
    if (currentUser?.isRegistered) {
      onNavigate('/operators');
    } else {
      setIsRegistrationModalOpen(true);
    }
  };

  const handlePaidPackCta = (packId: string) => {
    if (openStripeModalWithPack) {
      openStripeModalWithPack(packId);
    } else {
      setIsStripeModalOpen(true);
    }
  };

  const faqs = [
    {
      q: 'Come funziona la prova "5+5\'\' Free" per testare live due operatori?',
      a: 'La prova gratuita ti mette a disposizione 10 minuti complessivi suddivisi in due sessioni da 5 minuti ciascuna: i primi 5 minuti con un primo operatore a tua scelta, e i successivi 5 minuti con un secondo operatore differente. In questo modo puoi saggiare due stili, due voci e due punti di vista maschili autentici prima di decidere se acquistare minuti aggiuntivi. Non è richiesta alcuna carta di credito.'
    },
    {
      q: 'Quando e come viene attivato il microfono?',
      a: 'Ask A Man non chiede mai di attivare il microfono durante la navigazione o l\'accesso al sito. Il microfono viene richiesto esclusivamente prima di cliccare il pulsante di chiamata sull\'interfaccia del telefono, dopo che hai cliccato su "Chiama un operatore". Quando la chiamata termina, l\'accesso al microfono viene immediatamente chiuso.'
    },
    {
      q: 'Cosa succede allo scadere dei minuti?',
      a: 'Nessuna sorpresa: Ask A Man applica una politica di Hard Stop assoluta. La linea viene chiusa automaticamente al termine dei minuti a tua disposizione senza alcun addebito imprevisto. Puoi sempre ricaricare nuovi minuti in qualunque momento.'
    },
    {
      q: 'I minuti acquistati hanno una data di scadenza?',
      a: 'No. Tutti i pacchetti minuti (10 min a 9€, 20 min a 16€ e 30 min a 23€) rimangono accreditati nel tuo conto personale e non hanno alcuna scadenza. Puoi utilizzarli quando ne hai realmente bisogno, anche a distanza di mesi.'
    },
    {
      q: 'Come viene garantito l\'anonimato del mio numero?',
      a: 'Il nostro centralino telefonico proxy instrada la connessione vocale senza mai rivelare il tuo numero reale all\'operatore. La chiamata è cifrata e protetta da privacy totale: non viene effettuata alcuna registrazione audio delle conversazioni.'
    }
  ];

  return (
    <div className="space-y-10 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E07A5F]/15 text-[#E07A5F] border border-[#E07A5F]/30 text-xs font-bold uppercase tracking-wider">
          <Sparkles size={14} className="text-[#E07A5F]" />
          <span>Tariffe Trasparenti • Zero Abbonamenti • Zero Sorprese</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#14213D] tracking-tight">
          Scegli il tuo tempo. <br />
          <span className="text-[#E07A5F]">Testa 2 operatori live gratis.</span>
        </h1>

        <p className="text-sm sm:text-base text-[#6B7A99] leading-relaxed max-w-2xl mx-auto">
          Nessun rinnovo automatico e nessun vincolo. Prova il servizio con la nostra offerta esclusiva{' '}
          <strong className="text-[#14213D]">5+5&apos;&apos; Free</strong> per confrontare due voci e prospettive maschili, oppure acquista pacchetti trasparenti per approfondire.
        </p>

        {/* Security & Microphone Notice */}
        <div className="inline-flex items-center gap-2.5 text-xs text-[#2F6B4F] bg-[#2F6B4F]/10 border border-[#2F6B4F]/25 px-4 py-2 rounded-xl text-left max-w-xl">
          <Mic size={16} className="shrink-0 text-[#2F6B4F]" />
          <span>
            <strong>Trasparenza Audio:</strong> Il microfono non viene mai richiesto all&apos;accesso al sito. Si richiede unicamente prima di avviare la chiamata sull&apos;interfaccia telefono con l&apos;operatore.
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid - 4 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {/* CARD 1: 5+5'' FREE */}
        <div className="relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between border-2 border-[#E07A5F] bg-gradient-to-b from-[#E07A5F]/10 via-[#F6F1E7] to-[#F6F1E7] shadow-lg transition-transform hover:-translate-y-1">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gradient-to-r from-[#E07A5F] to-[#C8532F] text-[#F6F1E7] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
            <Sparkles size={12} />
            <span>5+5&apos;&apos; Free • 2 Operatori Live</span>
          </div>

          <div className="space-y-4 pt-2">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E07A5F]">
                Offerta di Benvenuto
              </span>
              <h3 className="text-xl font-black text-[#14213D]">
                Prova 5+5&apos;&apos; Free
              </h3>
              <p className="text-xs text-[#6B7A99] leading-relaxed">
                Testa live due operatori differenti per confrontare stili e sensibilità maschili diverse.
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-white/80 border border-[#E07A5F]/30 text-center space-y-1">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-black text-[#14213D]">0€</span>
                <span className="text-xs font-semibold text-[#6B7A99]">/ 10 min totali</span>
              </div>
              <span className="inline-block text-[11px] font-bold text-[#2F6B4F] bg-[#2F6B4F]/10 px-2 py-0.5 rounded-full">
                Nessuna carta richiesta
              </span>
            </div>

            {/* Features */}
            <ul className="space-y-2.5 text-xs text-[#14213D] pt-2">
              <li className="flex items-start gap-2">
                <Check size={15} className="text-[#2F6B4F] shrink-0 mt-0.5" />
                <span><strong>5 minuti</strong> con il 1° operatore a scelta</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={15} className="text-[#2F6B4F] shrink-0 mt-0.5" />
                <span><strong>5 minuti</strong> con un 2° operatore diverso</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={15} className="text-[#2F6B4F] shrink-0 mt-0.5" />
                <span>Confronta due pareri e toni di voce</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={15} className="text-[#2F6B4F] shrink-0 mt-0.5" />
                <span>Attivazione istantanea con verifica SMS</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={15} className="text-[#2F6B4F] shrink-0 mt-0.5" />
                <span>Zero vincoli e totale anonimato</span>
              </li>
            </ul>
          </div>

          <div className="pt-6">
            <button
              type="button"
              onClick={handleFreeTrialCta}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#E07A5F] to-[#C8532F] text-[#F6F1E7] font-bold text-xs sm:text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Testa 2 Operatori Live Gratis</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* CARD 2: 10 MINUTI - 9€ */}
        <div className="relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-[#14213D]/15 bg-white/70 shadow-sm transition-transform hover:-translate-y-1">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B7A99]">
                Consiglio Rapido
              </span>
              <h3 className="text-xl font-black text-[#14213D]">
                Pack 10 Minuti
              </h3>
              <p className="text-xs text-[#6B7A99] leading-relaxed">
                Ideale per decodificare un messaggio ambiguo o una reazione specifica.
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-[#14213D]/5 border border-[#14213D]/10 text-center space-y-1">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-black text-[#14213D]">9€</span>
                <span className="text-xs font-semibold text-[#6B7A99]">una tantum</span>
              </div>
              <span className="text-[11px] font-medium text-[#6B7A99]">
                €0,90 al minuto
              </span>
            </div>

            {/* Features */}
            <ul className="space-y-2.5 text-xs text-[#14213D] pt-2">
              <li className="flex items-start gap-2">
                <Check size={15} className="text-[#2F6B4F] shrink-0 mt-0.5" />
                <span><strong>10 minuti</strong> di conversazione telefonica</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={15} className="text-[#2F6B4F] shrink-0 mt-0.5" />
                <span>Valido con qualsiasi operatore online</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={15} className="text-[#2F6B4F] shrink-0 mt-0.5" />
                <span>Nessuna scadenza dei minuti</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={15} className="text-[#2F6B4F] shrink-0 mt-0.5" />
                <span>Zero abbonamenti o rinnovi ricorrenti</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={15} className="text-[#2F6B4F] shrink-0 mt-0.5" />
                <span>Pagamento sicuro con carta / Apple Pay</span>
              </li>
            </ul>
          </div>

          <div className="pt-6">
            <CtaButton
              size="md"
              variant="outline"
              onClick={() => handlePaidPackCta('pack_10')}
              className="w-full flex items-center justify-center gap-1.5"
            >
              <span>Acquista 10 Min (9€)</span>
              <ArrowRight size={14} />
            </CtaButton>
          </div>
        </div>

        {/* CARD 3: 20 MINUTI - 16€ */}
        <div className="relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between border-2 border-[#14213D]/25 bg-white shadow-sm transition-transform hover:-translate-y-1">
          <div className="absolute -top-3.5 right-6 bg-[#14213D] text-[#F6F1E7] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Consigliato
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C8532F]">
                Dinamiche di Coppia
              </span>
              <h3 className="text-xl font-black text-[#14213D]">
                Pack 20 Minuti
              </h3>
              <p className="text-xs text-[#6B7A99] leading-relaxed">
                Il tempo giusto per approfondire una crisi passeggera o un allontanamento recente.
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-[#14213D]/5 border border-[#14213D]/10 text-center space-y-1">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-black text-[#14213D]">16€</span>
                <span className="text-xs font-semibold text-[#6B7A99]">una tantum</span>
              </div>
              <span className="text-[11px] font-medium text-[#2F6B4F]">
                €0,80 al minuto • Risparmi il 11%
              </span>
            </div>

            {/* Features */}
            <ul className="space-y-2.5 text-xs text-[#14213D] pt-2">
              <li className="flex items-start gap-2">
                <Check size={15} className="text-[#2F6B4F] shrink-0 mt-0.5" />
                <span><strong>20 minuti</strong> di dialogo approfondito</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={15} className="text-[#2F6B4F] shrink-0 mt-0.5" />
                <span>Frazionabile anche in più chiamate</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={15} className="text-[#2F6B4F] shrink-0 mt-0.5" />
                <span>Possibilità di cambiare operatore</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={15} className="text-[#2F6B4F] shrink-0 mt-0.5" />
                <span>Priorità di connessione telefonica</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={15} className="text-[#2F6B4F] shrink-0 mt-0.5" />
                <span>Crediti validi a tempo indeterminato</span>
              </li>
            </ul>
          </div>

          <div className="pt-6">
            <CtaButton
              size="md"
              onClick={() => handlePaidPackCta('pack_20')}
              className="w-full flex items-center justify-center gap-1.5"
            >
              <span>Acquista 20 Min (16€)</span>
              <ArrowRight size={14} />
            </CtaButton>
          </div>
        </div>

        {/* CARD 4: 30 MINUTI - 23€ */}
        <div className="relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between border-2 border-[#14213D] bg-[#14213D] text-[#F6F1E7] shadow-xl transition-transform hover:-translate-y-1">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#E07A5F] text-[#F6F1E7] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
            <Award size={12} />
            <span>Più Popolare • Miglior Valore</span>
          </div>

          <div className="space-y-4 pt-2">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E07A5F]">
                Sessione Completa
              </span>
              <h3 className="text-xl font-black text-[#F6F1E7]">
                Pack 30 Minuti
              </h3>
              <p className="text-xs text-[#F6F1E7]/70 leading-relaxed">
                Spazio completo per analizzare a fondo la situazione con lucidità e definire la strategia ideale.
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-[#F6F1E7]/10 border border-[#F6F1E7]/20 text-center space-y-1">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-black text-[#F6F1E7]">23€</span>
                <span className="text-xs font-semibold text-[#F6F1E7]/70">una tantum</span>
              </div>
              <span className="text-[11px] font-bold text-[#E07A5F]">
                €0,76 al minuto • Tariffa più vantaggiosa
              </span>
            </div>

            {/* Features */}
            <ul className="space-y-2.5 text-xs text-[#F6F1E7]/90 pt-2">
              <li className="flex items-start gap-2">
                <Check size={15} className="text-[#E07A5F] shrink-0 mt-0.5" />
                <span><strong>30 minuti</strong> di sessione senza fretta</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={15} className="text-[#E07A5F] shrink-0 mt-0.5" />
                <span>Miglior rapporto prezzo/minuto della piattaforma</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={15} className="text-[#E07A5F] shrink-0 mt-0.5" />
                <span>Frazionabile liberamente su più chiamate</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={15} className="text-[#E07A5F] shrink-0 mt-0.5" />
                <span>Chiedi fino a 3 opinioni diverse</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={15} className="text-[#E07A5F] shrink-0 mt-0.5" />
                <span>Crediti sempre disponibili, nessuna scadenza</span>
              </li>
            </ul>
          </div>

          <div className="pt-6">
            <button
              type="button"
              onClick={() => handlePaidPackCta('pack_30')}
              className="w-full py-3 px-4 rounded-xl bg-[#E07A5F] hover:bg-[#C8532F] text-[#F6F1E7] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Acquista 30 Min (23€)</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Pillars of Transparency */}
      <div className="bg-[#14213D] text-[#F6F1E7] rounded-3xl p-8 sm:p-10 border border-[#14213D] shadow-lg">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E07A5F]">
            Impegno Etico &amp; Sicurezza
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#F6F1E7]">
            Le 4 Garanzie di Ask A Man
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#F6F1E7]/5 border border-[#F6F1E7]/10 p-5 rounded-2xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#E07A5F]/20 text-[#E07A5F] flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <h4 className="font-bold text-sm text-[#F6F1E7]">Zero Abbonamenti</h4>
            <p className="text-xs text-[#F6F1E7]/70 leading-relaxed">
              Nessun rinnovo tacito, nessun addebito mensile. Compri solo i minuti che desideri.
            </p>
          </div>

          <div className="bg-[#F6F1E7]/5 border border-[#F6F1E7]/10 p-5 rounded-2xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#2F6B4F]/20 text-[#2F6B4F] flex items-center justify-center">
              <Mic size={20} />
            </div>
            <h4 className="font-bold text-sm text-[#F6F1E7]">Microfono Protetto</h4>
            <p className="text-xs text-[#F6F1E7]/70 leading-relaxed">
              Il microfono non viene mai richiesto all&apos;accesso al sito: solo prima del click di chiamata sull&apos;interfaccia telefono.
            </p>
          </div>

          <div className="bg-[#F6F1E7]/5 border border-[#F6F1E7]/10 p-5 rounded-2xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#E07A5F]/20 text-[#E07A5F] flex items-center justify-center">
              <Lock size={20} />
            </div>
            <h4 className="font-bold text-sm text-[#F6F1E7]">Numeri Mascherati</h4>
            <p className="text-xs text-[#F6F1E7]/70 leading-relaxed">
              Instradamento telefonico anonimo. Nessun numero visibile e nessuna registrazione vocale.
            </p>
          </div>

          <div className="bg-[#F6F1E7]/5 border border-[#F6F1E7]/10 p-5 rounded-2xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#2F6B4F]/20 text-[#2F6B4F] flex items-center justify-center">
              <Users size={20} />
            </div>
            <h4 className="font-bold text-sm text-[#F6F1E7]">Split Etico 50/50</h4>
            <p className="text-xs text-[#F6F1E7]/70 leading-relaxed">
              Metà del compenso va direttamente all&apos;operatore per riconoscere il suo valore umano e di ascolto.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E07A5F]">
            Chiarezza Totale
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#14213D]">
            Domande Frequenti sui Prezzi
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#14213D]/15 rounded-2xl overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm text-[#14213D] hover:text-[#E07A5F] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp size={18} className="shrink-0 text-[#E07A5F]" />
                  ) : (
                    <ChevronDown size={18} className="shrink-0 text-[#6B7A99]" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#6B7A99] leading-relaxed border-t border-[#14213D]/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Final Action Callout */}
      <div className="text-center space-y-4 pt-4">
        <h3 className="text-2xl font-black text-[#14213D]">
          Pronta a testare due punti di vista differenti?
        </h3>
        <p className="text-sm text-[#6B7A99] max-w-md mx-auto">
          Inizia con i primi 5+5&apos;&apos; gratis. Scegli il tuo primo operatore tra i 10 slot disponibili.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <CtaButton size="lg" onClick={handleFreeTrialCta}>
            <Phone size={16} className="mr-2" />
            Inizia Prova 5+5&apos;&apos; Free
          </CtaButton>
          <CtaButton
            size="lg"
            variant="outline"
            onClick={() => onNavigate('/operators')}
          >
            Esplora gli Operatori
          </CtaButton>
        </div>
      </div>
    </div>
  );
};
