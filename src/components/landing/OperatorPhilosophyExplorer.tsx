import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  UserCheck,
  Headphones,
  FileCheck2,
  HeartOff,
  Briefcase,
  Award,
  PhoneCall
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface OperatorPhilosophyExplorerProps {
  onNavigate: (path: string) => void;
}

export const OperatorPhilosophyExplorer: React.FC<OperatorPhilosophyExplorerProps> = ({ onNavigate }) => {
  const [showGuidelinesModal, setShowGuidelinesModal] = useState<boolean>(false);
  const { setIsCandidateModalOpen } = useApp();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* SECTION HEADER & FOUNDATIONAL RULE BANNER */}
      <div className="space-y-6">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C8532F] bg-[#C8532F]/10 px-3 py-1 rounded-full border border-[#C8532F]/20">
            <Sparkles size={14} />
            <span>Trasparenza &amp; Garanzia di Qualità</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14213D] tracking-tight max-w-3xl mx-auto">
            Come selezioniamo gli operatori di&nbsp;AskAMan
          </h2>
          <p className="text-base sm:text-lg text-[#6B7A99] max-w-2xl mx-auto">
            Nessun profilo improvvisato: solo uomini adulti con percorsi di vita documentabili, sottoposti a rigorose simulazioni vocali prima di essere attivati sulla piattaforma.
          </p>
        </div>

        {/* The Foundational Rule Callout */}
        <div className="bg-[#14213D] text-[#F6F1E7] rounded-2xl p-6 sm:p-8 border border-[#14213D] shadow-sm relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#E07A5F] font-bold">
              La Regola Fondamentale di AskAMan
            </span>
            <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F6F1E7]">
              &ldquo;Non offriamo consulenti professionisti, ma&nbsp;uomini&nbsp;veri.&rdquo;
            </p>
            <p className="text-sm sm:text-base text-[#F6F1E7]/80 leading-relaxed pt-1">
              Nessun manuale teorico, nessun linguaggio accademico e nessuna formula preconfezionata. 
              Mettiamo a tua disposizione uomini con bagaglio reale di vita, relazioni vissute, bivi professionali affrontati e la totale libertà di dirti con sincerità cosa pensa davvero un uomo nella tua situazione.
            </p>
          </div>
        </div>
      </div>

      {/* 5 KEY HIGHLIGHTS GRID */}
      <div className="space-y-6">
        <div className="text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#14213D]">
            I 5 Pilastri di Selezione degli Operatori
          </h3>
          <p className="text-xs sm:text-sm text-[#6B7A99]">
            I requisiti inderogabili verificati su ciascun candidato prima dell&apos;abilitazione.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Highlight 1 */}
          <div className="bg-[#F6F1E7] border border-[#14213D]/15 rounded-2xl p-6 space-y-3 hover:border-[#14213D]/40 transition-all shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#14213D] text-[#E07A5F] flex items-center justify-center">
              <UserCheck size={20} />
            </div>
            <h3 className="text-lg font-bold text-[#14213D]">
              Uomini veri, non&nbsp;coach
            </h3>
            <p className="text-xs font-semibold text-[#E07A5F]">
              Esperienza di vita reale, non teorie da&nbsp;manuale.
            </p>
            <p className="text-xs text-[#6B7A99] leading-relaxed">
              Nessun copione standardizzato: gli operatori attingono al proprio percorso autentico fatto di matrimoni, convivenze, separazioni, errori, ripartenze e decisioni quotidiane.
            </p>
          </div>

          {/* Highlight 2 */}
          <div className="bg-[#F6F1E7] border border-[#14213D]/15 rounded-2xl p-6 space-y-3 hover:border-[#14213D]/40 transition-all shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#14213D] text-[#2F6B4F] flex items-center justify-center">
              <Headphones size={20} />
            </div>
            <h3 className="text-lg font-bold text-[#14213D]">
              Ascolto senza&nbsp;filtri
            </h3>
            <p className="text-xs font-semibold text-[#2F6B4F]">
              Empatia, lucidità e zero&nbsp;giudizi.
            </p>
            <p className="text-xs text-[#6B7A99] leading-relaxed">
              Uno spazio sicuro dove puoi porre qualsiasi domanda, anche la più delicata o imbarazzante, con la certezza di ricevere una risposta disarmante, leale e imparziale.
            </p>
          </div>

          {/* Highlight 3 */}
          <div className="bg-[#F6F1E7] border border-[#14213D]/15 rounded-2xl p-6 space-y-3 hover:border-[#14213D]/40 transition-all shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#14213D] text-[#E07A5F] flex items-center justify-center">
              <FileCheck2 size={20} />
            </div>
            <h3 className="text-lg font-bold text-[#14213D]">
              Testati sul&nbsp;campo
            </h3>
            <p className="text-xs font-semibold text-[#E07A5F]">
              Due simulazioni di chiamata registrate prima di&nbsp;attivarsi.
            </p>
            <p className="text-xs text-[#6B7A99] leading-relaxed">
              Ogni candidato sostiene due colloqui orali completi con valutatrici indipendenti: valutiamo presenza vocale, rispetto deontologico, capacità d’ascolto ed equilibrio emotivo.
            </p>
          </div>

          {/* Highlight 4 */}
          <div className="bg-[#F6F1E7] border border-[#14213D]/15 rounded-2xl p-6 space-y-3 hover:border-[#14213D]/40 transition-all shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#14213D] text-[#2F6B4F] flex items-center justify-center">
              <HeartOff size={20} />
            </div>
            <h3 className="text-lg font-bold text-[#14213D]">
              Etica e sicurezza&nbsp;ferree
            </h3>
            <p className="text-xs font-semibold text-[#2F6B4F]">
              Zero flirt e totale protezione della&nbsp;privacy.
            </p>
            <p className="text-xs text-[#6B7A99] leading-relaxed">
              Tolleranza zero per atteggiamenti allusivi, inviti ad uscire o scambi di recapiti personali. La piattaforma scherma automaticamente i numeri telefonici e tutela al 100% l’anonimato.
            </p>
          </div>

          {/* Highlight 5 */}
          <div className="bg-[#F6F1E7] border border-[#14213D]/15 rounded-2xl p-6 space-y-3 hover:border-[#14213D]/40 transition-all shadow-xs md:col-span-2 lg:col-span-2">
            <div className="w-10 h-10 rounded-xl bg-[#14213D] text-[#E07A5F] flex items-center justify-center">
              <Briefcase size={20} />
            </div>
            <h3 className="text-lg font-bold text-[#14213D]">
              Competenze&nbsp;trasversali
            </h3>
            <p className="text-xs font-semibold text-[#E07A5F]">
              Dalla coppia ai bivi professionali e&nbsp;familiari.
            </p>
            <p className="text-xs text-[#6B7A99] leading-relaxed">
              Il ventaglio delle tematiche affrontate rispecchia la vita reale: non solo dubbi d&apos;amore o silenzi, ma la gestione di licenziamenti, cambi di residenza o città, accordi genitoriali ed equilibri complessi.
            </p>
          </div>
        </div>
      </div>

      {/* THE 4 PHASES OF THE SELECTION PROCESS */}
      <div className="bg-white/80 border border-[#14213D]/15 rounded-3xl p-6 sm:p-10 space-y-8 shadow-xs">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C8532F]">
            Il Percorso di Ammissione
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14213D] tracking-tight">
            I 4 Step di Screening per Diventare Operatore
          </h3>
          <p className="text-xs sm:text-sm text-[#6B7A99] max-w-2xl">
            Solo 1 candidato su 5 supera l&apos;intero iter di accreditamento. Ecco come garantiamo l&apos;autenticità di ogni voce.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="bg-[#F6F1E7] border border-[#14213D]/10 rounded-2xl p-5 space-y-3">
            <div className="w-8 h-8 rounded-full bg-[#14213D] text-[#F6F1E7] font-mono text-xs font-bold flex items-center justify-center">
              01
            </div>
            <h4 className="text-sm font-extrabold text-[#14213D]">
              Screening Anagrafico &amp; Vissuto
            </h4>
            <p className="text-xs text-[#6B7A99] leading-relaxed">
              Verifica dell&apos;età (minimo 30 anni compiuti) e del percorso personale e lavorativo per garantire maturità, equilibrio e solidità esperienziale.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#F6F1E7] border border-[#14213D]/10 rounded-2xl p-5 space-y-3">
            <div className="w-8 h-8 rounded-full bg-[#14213D] text-[#F6F1E7] font-mono text-xs font-bold flex items-center justify-center">
              02
            </div>
            <h4 className="text-sm font-extrabold text-[#14213D]">
              Colloquio &amp; Presenza Vocale
            </h4>
            <p className="text-xs text-[#6B7A99] leading-relaxed">
              Intervista individuale per valutare dizione, tono empatico, chiarezza nell&apos;esposizione e totale assenza di toni giudicanti o dogmatici.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#F6F1E7] border border-[#14213D]/10 rounded-2xl p-5 space-y-3">
            <div className="w-8 h-8 rounded-full bg-[#14213D] text-[#E07A5F] font-mono text-xs font-bold flex items-center justify-center">
              03
            </div>
            <h4 className="text-sm font-extrabold text-[#14213D]">
              Due Chiamate Simulate al Buio
            </h4>
            <p className="text-xs text-[#6B7A99] leading-relaxed">
              Test pratico con valutatrici su casi reali di crisi di coppia, silenzi maschili e bivi lavorativi. Superamento vincolato a giudizio positivo unanime.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-[#F6F1E7] border border-[#14213D]/10 rounded-2xl p-5 space-y-3">
            <div className="w-8 h-8 rounded-full bg-[#14213D] text-[#2F6B4F] font-mono text-xs font-bold flex items-center justify-center">
              04
            </div>
            <h4 className="text-sm font-extrabold text-[#14213D]">
              Patto Deontologico &amp; Monitoraggio
            </h4>
            <p className="text-xs text-[#6B7A99] leading-relaxed">
              Firma del vincolo di segretezza e divieto di contatto esterno. Monitoraggio continuo delle recensioni: esclusione automatica in caso di calo del gradimento.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[#14213D]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#14213D] font-bold">
            <CheckCircle2 size={16} className="text-[#2F6B4F]" />
            <span>Processo certificato AskAMan • Zero algoritmi AI, 100% interazione umana autentica</span>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/operators')}
            className="text-xs font-bold text-[#E07A5F] hover:text-[#14213D] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Ascolta le voci degli operatori ammessi</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* TRUST BADGE & EXPANDED SELECTION GUIDELINES CTA */}
      <div className="bg-[#14213D] text-[#F6F1E7] rounded-3xl p-6 sm:p-8 border border-[#14213D] flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        {/* Trust badge */}
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-[#2F6B4F]/20 text-[#2F6B4F] flex items-center justify-center shrink-0 border border-[#2F6B4F]/30">
            <ShieldCheck size={26} />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2F6B4F]">
              Garanzia Ufficiale di Riservatezza
            </span>
            <h4 className="text-base sm:text-lg font-extrabold text-[#F6F1E7]">
              Zero dating, zero therapy, 100% anonymous proxy&nbsp;calls
            </h4>
            <p className="text-xs text-[#6B7A99]">
              Connessioni vocali dirette con numeri mascherati. Nessuna traccia o registrazione&nbsp;audio.
            </p>
          </div>
        </div>

        {/* CTA Link pointing to expanded selection guidelines */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
          <button
            type="button"
            onClick={() => setShowGuidelinesModal(true)}
            className="w-full sm:w-auto px-5 py-3 rounded-[8px] bg-[#F6F1E7] text-[#14213D] hover:bg-[#F6F1E7]/90 text-xs sm:text-sm font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-2 shadow-xs"
          >
            <span>Scopri di più sui nostri rigorosi criteri di&nbsp;selezione</span>
            <ArrowRight size={14} />
          </button>

          <button
            type="button"
            onClick={() => setIsCandidateModalOpen(true)}
            className="w-full sm:w-auto px-4 py-3 rounded-[8px] border border-[#F6F1E7]/25 text-[#F6F1E7] hover:bg-[#F6F1E7]/10 text-xs font-semibold transition-all text-center cursor-pointer"
          >
            Vuoi candidarti come&nbsp;operatore?
          </button>
        </div>
      </div>

      {/* SELECTION GUIDELINES MODAL */}
      {showGuidelinesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14213D]/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#F6F1E7] border border-[#14213D]/20 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-start justify-between gap-4 border-b border-[#14213D]/10 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C8532F]">
                  Documento di Trasparenza
                </span>
                <h3 className="text-2xl font-extrabold text-[#14213D] tracking-tight">
                  I Rigorosi Criteri di Selezione di AskAMan
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowGuidelinesModal(false)}
                className="w-8 h-8 rounded-full bg-[#14213D]/10 hover:bg-[#14213D]/20 flex items-center justify-center text-[#14213D] text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#14213D]/85 leading-relaxed">
              <div className="p-4 rounded-xl bg-[#14213D]/5 border border-[#14213D]/10 space-y-1">
                <h4 className="font-extrabold text-[#14213D]">1. Screening Anagrafico ed Esperienziale</h4>
                <p className="text-xs text-[#6B7A99]">
                  Accettiamo solo candidature di uomini con almeno 30 anni d&apos;età compiuti e percorsi di vita, personali e professionali, documentabili e stabili.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#14213D]/5 border border-[#14213D]/10 space-y-1">
                <h4 className="font-extrabold text-[#14213D]">2. Due Simulazioni di Chiamata con Valutatrici Indipendenti</h4>
                <p className="text-xs text-[#6B7A99]">
                  Ogni candidato affronta due sessioni vocali simulate: una su un caso di crisi di coppia (es. silenzi improvvisi o dubbi) e una su una scelta lavorativa o familiare. Valutiamo compostezza, assenza di giudizio morale e capacità di spiegare il ragionamento maschile.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#14213D]/5 border border-[#14213D]/10 space-y-1">
                <h4 className="font-extrabold text-[#14213D]">3. Patto Etico: Zero Flirt e Zero Incontri</h4>
                <p className="text-xs text-[#6B7A99]">
                  L&apos;operatore firma un accordo vincolante con penali: è fatto espresso divieto di chiedere contatti esterni, social network, appuntamenti o fare avance. Il rispetto del confine è la garanzia di sicurezza del servizio.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#14213D]/5 border border-[#14213D]/10 space-y-1">
                <h4 className="font-extrabold text-[#14213D]">4. Monitoraggio Anonimo del Feedback</h4>
                <p className="text-xs text-[#6B7A99]">
                  Dopo ogni chiamata le utenti lasciano una valutazione. Gli operatori che non mantengono una media di recensioni elevata o che ricevono segnalazioni di violazione vengono disattivati all&apos;istante.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#14213D]/10 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowGuidelinesModal(false)}
                className="px-5 py-2.5 rounded-[8px] bg-[#14213D] text-[#F6F1E7] text-xs font-bold hover:bg-[#14213D]/90 cursor-pointer"
              >
                Ho compreso
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
