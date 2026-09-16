import React, { useState } from 'react';
import { CtaButton } from '../components/common/CtaButton';
import { OperatorPhoto } from '../components/common/OperatorPhoto';
import { VerificationBadge } from '../components/common/VerificationBadge';
import { Logo, LogoSymbol, LogoWatermark, LogoBanner } from '../components/common/Logo';
import { OperatorPhilosophyExplorer } from '../components/landing/OperatorPhilosophyExplorer';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  PhoneCall,
  SlidersHorizontal,
  Compass,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Play,
  Volume2,
  Lock,
  ArrowRight
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { operators, startCall, currentUser, setIsStripeModalOpen } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const previewOperators = operators.slice(0, 3);

  const toggleAudio = (uid: string) => {
    if (playingAudioId === uid) {
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(uid);
      setTimeout(() => {
        setPlayingAudioId(null);
      }, 5000);
    }
  };

  return (
    <div className="space-y-24 py-2 relative overflow-hidden">
      {/* TOP ANNOUNCEMENT BANNER */}
      <LogoBanner
        variant="bar"
        onCtaClick={() => onNavigate('/operators')}
        className="-mt-2"
      />

      {/* HERO SECTION WITH BACKGROUND WATERMARK (FILIGRANA) */}
      <section className="relative pt-6 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Central Filigrana (Watermark) of the official AskMan silhouette logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 overflow-hidden">
          <LogoWatermark
            size={680}
            opacity={0.045}
            color="#14213D"
            rotation={-4}
          />
        </div>

        {/* Secondary floating watermark on right edge for depth */}
        <div className="hidden lg:block absolute -right-16 top-10 pointer-events-none select-none z-0 opacity-20">
          <LogoWatermark
            size={340}
            opacity={0.03}
            color="#E07A5F"
            rotation={12}
          />
        </div>

        {/* Content Layer (z-10 above watermark) */}
        <div className="relative z-10">
          {/* Official Logo Banner Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/80 border border-[#14213D]/10 text-xs font-bold tracking-wide mb-6 shadow-xs backdrop-blur-xs">
            <LogoSymbol size={26} strokeColor="#14213D" />
            <span className="tracking-tight font-extrabold text-sm">
              <span className="text-[#14213D]">Ask</span>
              <span className="text-[#E07A5F]">Man</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-[#6B7A99]/40" />
            <span className="text-[#6B7A99] font-medium hidden sm:inline">
              il punto di vista maschile
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#2F6B4F]/10 text-[#2F6B4F] text-[10px] font-bold uppercase tracking-wider">
              Ufficiale
            </span>
          </div>

          {/* Hero Title and Subtitle */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C8532F]/10 text-[#C8532F] border border-[#C8532F]/20 text-xs sm:text-sm font-extrabold uppercase tracking-wider">
              <span>Punto di Vista Maschile Diretto</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#14213D] tracking-tight leading-[1.08]">
              Chiedi a chi <br />conosce le risposte
            </h1>
            <h2 className="text-xl sm:text-2xl font-medium text-[#6B7A99] tracking-tight leading-relaxed max-w-3xl mx-auto">
              Il punto di vista maschile che ti mancava. Su una nuova città, una scelta di vita, un bivio lavorativo, una dinamica di coppia o un nodo familiare. Senza dating. Senza terapia. Senza&nbsp;giudizi.
            </h2>
          </div>

          {/* Value narrative / H3 */}
          <h3 className="mt-6 text-base sm:text-lg text-[#14213D]/85 max-w-3xl mx-auto leading-relaxed font-normal">
            Conversazioni telefoniche informali con uomini verificati per decodificare silenzi, comportamenti ambigui, trasferimenti di vita, dinamiche familiari e dubbi quotidiani. Massima riservatezza garantita da un sistema telefonico con proxy anonimo: nessuno saprà mai&nbsp;chi&nbsp;sei.
          </h3>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <CtaButton
              size="lg"
              onClick={() => onNavigate('/operators')}
              className="w-full sm:w-auto shadow-md"
            >
              <span>Prenota i tuoi 10&nbsp;minuti&nbsp;gratis</span>
              <ArrowRight size={18} className="ml-2" />
            </CtaButton>

            <button
              type="button"
              onClick={() => onNavigate('/operators')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-[8px] border border-[#14213D] text-[#14213D] font-semibold text-sm hover:bg-[#14213D] hover:text-[#F6F1E7] transition-all cursor-pointer"
            >
              Ascolta la voce degli operatori
            </button>
          </div>

          {/* Micro guarantees */}
          <div className="mt-10 pt-6 border-t border-[#14213D]/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-[#6B7A99]">
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <CheckCircle2 size={16} className="text-[#2F6B4F] shrink-0" />
              Nessuna carta richiesta per il test
            </span>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <CheckCircle2 size={16} className="text-[#2F6B4F] shrink-0" />
              Zero numeri scambiati
            </span>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <CheckCircle2 size={16} className="text-[#2F6B4F] shrink-0" />
              Chiamata vocale anonima & zero registrazioni
            </span>
          </div>
        </div>
      </section>

      {/* PROMINENT OFFICIAL BRAND BANNER CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LogoBanner
          variant="hero"
          className="shadow-sm"
          onCtaClick={() => onNavigate('/operators')}
        />
      </section>


      {/* 3 USPs SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E07A5F]">
            I tre pilastri del servizio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14213D]">
            Perché parlare con AskAMan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* USP 1 */}
          <div className="bg-[#F6F1E7] border border-[#14213D]/15 rounded-2xl p-8 space-y-4 hover:border-[#14213D]/40 transition-all shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#14213D] text-[#F6F1E7] flex items-center justify-center">
              <Compass size={24} className="text-[#E07A5F]" />
            </div>
            <h3 className="text-xl font-bold text-[#14213D]">Logica, non magia</h3>
            <p className="text-sm text-[#6B7A99] leading-relaxed">
              Nessuna formula astrologica o presunto mistero: gli uomini agiscono secondo codici pratici,
              sintesi verbali e priorità concrete. I nostri operatori ti spiegano cosa c&apos;è dietro un silenzio o una reazione.
            </p>
          </div>

          {/* USP 2 */}
          <div className="bg-[#F6F1E7] border border-[#14213D]/15 rounded-2xl p-8 space-y-4 hover:border-[#14213D]/40 transition-all shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#14213D] text-[#F6F1E7] flex items-center justify-center">
              <ShieldCheck size={24} className="text-[#2F6B4F]" />
            </div>
            <h3 className="text-xl font-bold text-[#14213D]">
              Privacy totale: nessun numero scambiato, nessun&nbsp;incontro
            </h3>
            <p className="text-sm text-[#6B7A99] leading-relaxed">
              La chiamata si svolge tramite centralino vocale protetto e anonimo. Tu non vedi il numero dell&apos;operatore,
              lui non vede il tuo. Nessuna registrazione audio conservata e zero incontri consentiti.
            </p>
          </div>

          {/* USP 3 */}
          <div className="bg-[#F6F1E7] border border-[#14213D]/15 rounded-2xl p-8 space-y-4 hover:border-[#14213D]/40 transition-all shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#14213D] text-[#F6F1E7] flex items-center justify-center">
              <SlidersHorizontal size={24} className="text-[#E07A5F]" />
            </div>
            <h3 className="text-xl font-bold text-[#14213D]">
              Controllo tuo: scegli con chi, quanto e&nbsp;di&nbsp;cosa
            </h3>
            <p className="text-sm text-[#6B7A99] leading-relaxed">
              Sei libera di scegliere l&apos;operatore per età, tono ed esperienza. Decidi tu la durata:
              allo scadere del credito la chiamata si chiude con avviso vocale, senza addebiti imprevisti.
            </p>
          </div>
        </div>
      </section>

      {/* COME FUNZIONA IN 3 STEP */}
      <section className="relative bg-[#14213D] text-[#F6F1E7] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Filigrana in trasparenza sul fondo scuro */}
        <div className="absolute right-0 bottom-0 pointer-events-none select-none z-0 translate-x-12 translate-y-12">
          <LogoWatermark size={540} opacity={0.04} color="#F6F1E7" rotation={8} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E07A5F]">
              Semplicità e riservatezza
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F6F1E7]">
              Come funziona in 3 step
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative p-6 rounded-2xl bg-[#F6F1E7]/5 border border-[#F6F1E7]/10 space-y-4">
              <div className="text-3xl font-extrabold text-[#E07A5F] font-mono">01</div>
              <h3 className="text-lg font-bold text-[#F6F1E7]">Registrazione&nbsp;OTP</h3>
              <p className="text-xs text-[#6B7A99] leading-relaxed">
                Inserisci solo il tuo numero di cellulare per ricevere un SMS con codice monouso.
                Nessuna password, nessun profilo social collegato e nessuna carta di credito.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 rounded-2xl bg-[#F6F1E7]/5 border border-[#F6F1E7]/10 space-y-4">
              <div className="text-3xl font-extrabold text-[#E07A5F] font-mono">02</div>
              <h3 className="text-lg font-bold text-[#F6F1E7]">Scegli&nbsp;operatore</h3>
              <p className="text-xs text-[#6B7A99] leading-relaxed">
                Esplora i 10 slot della piattaforma. Ascolta l&apos;estratto vocale di 30 secondi,
                leggi la sua biografia narrativa e verifica i temi che conosce meglio.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 rounded-2xl bg-[#F6F1E7]/5 border border-[#F6F1E7]/10 space-y-4">
              <div className="text-3xl font-extrabold text-[#E07A5F] font-mono">03</div>
              <h3 className="text-lg font-bold text-[#F6F1E7]">Chiama in&nbsp;sicurezza</h3>
              <p className="text-xs text-[#6B7A99] leading-relaxed">
                Premi &ldquo;Chiama ora&rdquo;: la connessione si attiva via bridge anonimo. I primi
                10 minuti sono gratuiti. Poi acquisti solo i minuti che desideri a partire da €5.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <CtaButton size="lg" onClick={() => onNavigate('/operators')}>
              Esplora la griglia degli operatori
            </CtaButton>
          </div>
        </div>
      </section>

      {/* OPERATORS PREVIEW GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#E07A5F]">
              Voci verificate e selezionate
            </span>
            <h2 className="text-3xl font-extrabold text-[#14213D] tracking-tight">
              Anteprima Operatori AskAMan
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/operators')}
            className="text-xs font-bold text-[#14213D] hover:text-[#E07A5F] flex items-center gap-1 cursor-pointer"
          >
            <span>Vedi tutti i 10 slot</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewOperators.map(op => (
            <div
              key={op.uid}
              className="bg-[#F6F1E7] border border-[#14213D]/15 rounded-2xl p-6 space-y-5 hover:border-[#14213D]/40 transition-all shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <OperatorPhoto
                      photoUrl={op.photoUrl}
                      name={op.name}
                      unlockedByConsent={op.photoUnlockedByConsent}
                      size="md"
                    />
                    <div>
                      <h4 className="font-bold text-base text-[#14213D]">{op.name}</h4>
                      <p className="text-xs text-[#6B7A99]">
                        {op.ageRange} • {op.region}
                      </p>
                      <div className="mt-1">
                        <VerificationBadge size="sm" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Audio player sample */}
                <div className="bg-white/70 border border-[#14213D]/10 rounded-xl p-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleAudio(op.uid)}
                      className="w-8 h-8 rounded-full bg-[#14213D] text-[#F6F1E7] flex items-center justify-center hover:bg-[#E07A5F] transition-colors cursor-pointer"
                      title="Ascolta presentazione vocale"
                    >
                      {playingAudioId === op.uid ? <Volume2 size={14} /> : <Play size={14} className="ml-0.5" />}
                    </button>
                    <div className="text-[11px] leading-tight">
                      <span className="font-bold text-[#14213D] block">Campione Vocale</span>
                      <span className="text-[#6B7A99]">{op.accent}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#6B7A99]">0:38</span>
                </div>

                {/* Narrative bio snippet */}
                <p className="text-xs text-[#14213D]/80 leading-relaxed line-clamp-3 italic">
                  &ldquo;{op.bio}&rdquo;
                </p>

                {/* Themes */}
                <div className="flex flex-wrap gap-1.5">
                  {op.themes.slice(0, 2).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#14213D]/5 text-[#14213D]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#14213D]/10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#14213D]">€{op.pricePerMinute.toFixed(2)}</span>
                  <span className="text-[10px] text-[#6B7A99]"> / minuto</span>
                </div>

                <CtaButton
                  size="sm"
                  onClick={() => {
                    startCall(op);
                  }}
                >
                  <PhoneCall size={13} className="mr-1.5" />
                  Chiama ora
                </CtaButton>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OPERATOR PHILOSOPHY & INTERACTIVE SELECTION EXPLORER */}
      <OperatorPhilosophyExplorer onNavigate={onNavigate} />

      {/* BRAND BANNER & ASSET IDENTITY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E07A5F]">
              Identità Visiva & Logo
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14213D]">
              Il Logo AskMan nei Formati Banner
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7A99] max-w-xl mx-auto">
              Il marchio unisce la silhouette del volto maschile, il fumetto di ascolto e il punto interrogativo delle risposte che cerchi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Banner formato Chiaro */}
            <LogoBanner
              variant="card"
              darkTheme={false}
              onCtaClick={() => onNavigate('/operators')}
            />
            {/* Banner formato Scuro */}
            <LogoBanner
              variant="card"
              darkTheme={true}
              onCtaClick={() => onNavigate('/operators')}
            />
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E07A5F]">
            Domande frequenti
          </span>
          <h2 className="text-3xl font-extrabold text-[#14213D]">
            Tutto quello che c&apos;è da sapere
          </h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'È un sito di incontri? No.',
              a: 'Assolutamente no. AskAMan vieta categoricamente qualsiasi proposta di appuntamento o incontro dal vivo. Le chiamate avvengono unicamente tramite un centralino telefonico proxy per garantire l anonimato. Ogni tentativo di scambiare numeri o vedersi comporta il ban immediato dell utente o dell operatore.'
            },
            {
              q: 'È terapia o consulenza psicologica? No.',
              a: 'No. Gli operatori di AskAMan non sono psicologi, medici o consulenti clinici. Offrono uno scambio di conversazione informale e genuino: quello che un amico maschio onesto e maturo ti direbbe a cena, spiegandoti la prospettiva maschile senza finzioni. Se stai vivendo un momento di grave sofferenza, ti invitiamo a rivolgerti a un professionista sanitario o al numero 1522.'
            },
            {
              q: 'Quanto costa? 10 minuti gratis, poi pacchetti da €5.',
              a: 'La prima chiamata è completamente gratuita per 10 minuti (basta inserire il numero per ricevere l OTP di verifica). Successivamente puoi acquistare pacchetti trasparenti: Starter Pack da €5 per 30 minuti, pacchetti da 10 minuti (€10), 30 minuti (€27) o 60 minuti (€50). Nessun abbonamento, nessun rinnovo automatico.'
            },
            {
              q: 'Come viene garantita la privacy della mia voce e del mio numero?',
              a: 'Il nostro centralino telefonico instrada la chiamata senza mai mostrare il tuo recapito telefonico all operatore (e viceversa). Inoltre, nessuna registrazione audio viene effettuata o memorizzata: la conversazione è riservata ed effimera al 100%.'
            }
          ].map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-[#F6F1E7] border border-[#14213D]/15 rounded-xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left font-bold text-[#14213D] text-base sm:text-lg flex items-center justify-between gap-4 cursor-pointer hover:bg-[#14213D]/5 transition-colors"
                >
                  <span className="leading-snug">{item.q}</span>
                  <ChevronDown
                    size={22}
                    className={`text-[#E07A5F] shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 text-sm sm:text-base text-[#14213D]/80 leading-relaxed border-t border-[#14213D]/10">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-12">
        <div className="bg-[#14213D] text-[#F6F1E7] rounded-3xl p-10 sm:p-14 space-y-6 relative overflow-hidden shadow-xl">
          {/* Filigrana in trasparenza nel card CTA */}
          <div className="absolute -left-12 -bottom-12 pointer-events-none select-none z-0">
            <LogoWatermark size={360} opacity={0.06} color="#F6F1E7" rotation={-14} />
          </div>

          <div className="relative z-10 space-y-6">
            <span className="inline-block px-3 py-1 rounded-full bg-[#E07A5F] text-[#F6F1E7] text-xs font-bold uppercase tracking-wider">
              Nessuna carta richiesta
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F6F1E7] tracking-tight">
              Hai un dubbio che non riesci a&nbsp;decodificare?
            </h2>
            <p className="text-sm sm:text-base text-[#6B7A99] max-w-xl mx-auto leading-relaxed">
              Parla con un operatore verificato oggi stesso. I tuoi primi 10&nbsp;minuti sono offerti da&nbsp;AskAMan.
            </p>
            <div className="pt-2">
              <CtaButton
                size="lg"
                onClick={() => onNavigate('/login')}
                className="shadow-md"
              >
                Prenota i tuoi 10&nbsp;minuti&nbsp;gratis
              </CtaButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
