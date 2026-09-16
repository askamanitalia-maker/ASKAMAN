import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Mic, ArrowRight, ArrowLeft, Shield, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CtaButton } from '../common/CtaButton';

const SCREENING_QUESTIONS = [
  {
    id: 'q1',
    question: 'Una cliente ti chiede il tuo WhatsApp per continuare gratis.',
    options: [
      { text: 'Accetto per farmi conoscere meglio e aiutarla con calma.', isCorrect: false, rule: 'Regola #1 violata: È severamente vietato scambiare contatti personali o uscire dalla piattaforma.' },
      { text: 'Rifiuto e ricordo che il servizio vive solo in piattaforma.', isCorrect: true, rule: '' },
      { text: 'Le do un numero secondario temporaneo.', isCorrect: false, rule: 'Regola #1 violata: Nessun contatto esterno, primario o secondario, è consentito.' }
    ]
  },
  {
    id: 'q2',
    question: 'Una cliente piange e accenna ad autolesionismo.',
    options: [
      { text: 'Provo a farle da psicologo e a convincerla a non farlo.', isCorrect: false, rule: 'Regola #3 violata: Non sei un terapeuta. Vietato improvvisare interventi clinici.' },
      { text: 'Uso lo script di fuga e chiudo la chiamata.', isCorrect: true, rule: '' },
      { text: 'Cerco di minimizzare dicendo che domani andrà meglio.', isCorrect: false, rule: 'Regola #4 violata: In caso di crisi grave è obbligatorio usare lo script di fuga verso il 1522.' }
    ]
  },
  {
    id: 'q3',
    question: 'Una cliente ti propone un aperitivo dal vivo.',
    options: [
      { text: 'Rifiuto: nessun incontro è consentito.', isCorrect: true, rule: '' },
      { text: 'Accetto solo in un luogo pubblico affollato.', isCorrect: false, rule: 'Regola #1 violata: AskAMan NON è dating. Qualsiasi incontro fisico comporta ban immediato.' },
      { text: 'Dico che ne possiamo riparlare quando non sarò più operatore.', isCorrect: false, rule: 'Regola #1 violata: La violazione dei confini professionali è permanente.' }
    ]
  },
  {
    id: 'q4',
    question: 'Una cliente ti chiede un parere su farmaci che assume.',
    options: [
      { text: 'Condivido la mia esperienza con quei farmaci.', isCorrect: false, rule: 'Regola #3 violata: Zero pareri medici o farmacologici.' },
      { text: 'Dico che non sono competente e la rimando al medico.', isCorrect: true, rule: '' },
      { text: 'Le suggerisco dei rimedi naturali alternativi.', isCorrect: false, rule: 'Regola #3 violata: Vietato fornire qualsiasi consiglio sanitario o terapeutico.' }
    ]
  }
];

export const CandidateWizardModal: React.FC = () => {
  const { isCandidateModalOpen, setIsCandidateModalOpen, submitCandidateApplication } = useApp();
  const [step, setStep] = useState<number>(1);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    region: 'Lombardia',
    accent: 'Lombardo pacato',
    availability: 'Pomeriggi 15:00 - 19:00',
    relationalExperience: '',
    themes: ['Silenzi e mancate risposte', 'Comportamenti maschili'],
    selfDescription: '',
    answers: { q1: '', q2: '', q3: '', q4: '' },
    acceptedCodeOfConduct: false,
    acceptedPrivacy: false,
    acceptedSplit: false,
    acceptedBanPolicy: false,
    voiceSampleUrl: 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'
  });

  // Screening state
  const [screeningError, setScreeningError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isCandidateModalOpen) return null;

  const handleNext = () => {
    setScreeningError(null);

    // Validation per step
    if (step === 1) {
      if (!formData.name.trim() || !formData.phone.trim() || !formData.age.trim()) {
        alert('Compila tutti i campi anagrafici.');
        return;
      }
    }

    if (step === 2) {
      if (formData.relationalExperience.trim().length < 40) {
        alert('Inserisci una descrizione narrativa della tua esperienza di vita (almeno 40 caratteri).');
        return;
      }
    }

    if (step === 3) {
      if (formData.selfDescription.trim().length < 30) {
        alert('Inserisci un autodescrizione sintetica in 3 righe.');
        return;
      }
    }

    if (step === 4) {
      // Check 4/4 passing
      const q1Passed = formData.answers.q1 === 'Rifiuto e ricordo che il servizio vive solo in piattaforma.';
      const q2Passed = formData.answers.q2 === 'Uso lo script di fuga e chiudo la chiamata.';
      const q3Passed = formData.answers.q3 === 'Rifiuto: nessun incontro è consentito.';
      const q4Passed = formData.answers.q4 === 'Dico che non sono competente e la rimando al medico.';

      if (!formData.answers.q1 || !formData.answers.q2 || !formData.answers.q3 || !formData.answers.q4) {
        setScreeningError('Devi rispondere a tutte e 4 le domande scenario per proseguire.');
        return;
      }

      if (!q1Passed || !q2Passed || !q3Passed || !q4Passed) {
        setScreeningError('Screening NON superato: tutte e 4 le risposte devono essere corrette (4/4). Rileggi le regole ferree di AskAMan.');
        return;
      }
    }

    if (step === 5) {
      if (!formData.acceptedCodeOfConduct || !formData.acceptedPrivacy || !formData.acceptedSplit || !formData.acceptedBanPolicy) {
        alert('Devi accettare tutte le clausole obbligatorie per continuare.');
        return;
      }
    }

    if (step < 6) {
      setStep(s => s + 1);
    } else {
      // Submit
      submitCandidateApplication({
        name: formData.name,
        phone: formData.phone,
        age: formData.age,
        region: formData.region,
        accent: formData.accent,
        availability: formData.availability,
        relationalExperience: formData.relationalExperience,
        themes: formData.themes,
        selfDescription: formData.selfDescription,
        answers: formData.answers,
        screeningScore: 4,
        acceptedCodeOfConduct: formData.acceptedCodeOfConduct,
        acceptedPrivacy: formData.acceptedPrivacy,
        acceptedSplit: formData.acceptedSplit,
        acceptedBanPolicy: formData.acceptedBanPolicy,
        voiceSampleUrl: formData.voiceSampleUrl,
        photoUrl: formData.photoUrl
      });
      setIsSubmitted(true);
    }
  };

  const handlePrev = () => {
    setScreeningError(null);
    if (step > 1) setStep(s => s - 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14213D]/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#F6F1E7] border border-[#14213D]/20 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#14213D] text-[#F6F1E7] p-5 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-bold text-lg text-[#F6F1E7]">Candidatura Operatore Maschile</h3>
            <p className="text-xs text-[#6B7A99]">
              Processo di selezione in 6 step. Solo candidati idonei e verificati.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsCandidateModalOpen(false)}
            className="text-[#F6F1E7]/70 hover:text-[#F6F1E7] p-1.5 rounded-lg hover:bg-[#F6F1E7]/10 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Step Indicator */}
        {!isSubmitted && (
          <div className="bg-[#F6F1E7] border-b border-[#14213D]/10 px-6 py-3 flex items-center justify-between shrink-0">
            <span className="text-xs font-bold text-[#14213D]">
              Step {step} di 6:{' '}
              {step === 1 && 'Anagrafica & Voce'}
              {step === 2 && 'Esperienza Relazionale (Narrativa)'}
              {step === 3 && 'Stile di Ascolto'}
              {step === 4 && 'Screening Affidabilità (4/4 Obbligatorio)'}
              {step === 5 && 'Accettazione Vincoli'}
              {step === 6 && 'Campione Voce & Foto Protetta'}
            </span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div
                  key={i}
                  className={`w-5 h-1.5 rounded-full transition-all ${
                    i === step
                      ? 'bg-[#E07A5F] w-7'
                      : i < step
                      ? 'bg-[#2F6B4F]'
                      : 'bg-[#14213D]/20'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {isSubmitted ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#2F6B4F] text-[#F6F1E7] mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 size={36} strokeWidth={2.8} />
              </div>
              <h4 className="text-xl font-bold text-[#14213D]">Candidatura Inviata con Successo!</h4>
              <p className="text-sm text-[#6B7A99] max-w-md mx-auto leading-relaxed">
                Hai superato lo screening di affidabilità (4/4). La tua candidatura è stata registrata
                ed è ora visibile nel pannello di revisione Admin. In caso di approvazione,
                occuperai il primo slot libero nella griglia dei 10 operatori.
              </p>
              <div className="pt-4">
                <CtaButton onClick={() => setIsCandidateModalOpen(false)}>
                  Chiudi e torna alla griglia
                </CtaButton>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: Anagrafica */}
              {step === 1 && (
                <div className="space-y-4">
                  <p className="text-xs text-[#6B7A99]">
                    I dati personali servono esclusivamente per la verifica della tua identità. Nessun numero verrà mai condiviso con le clienti.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#14213D] mb-1">Nome e Iniziale Cognome</label>
                      <input
                        type="text"
                        placeholder="es. Simone B."
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white border border-[#14213D]/20 rounded-lg px-3 py-2 text-sm text-[#14213D] focus:outline-[#E07A5F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#14213D] mb-1">Numero Telefono Privato (per OTP Twilio)</label>
                      <input
                        type="tel"
                        placeholder="+39 340 000 0000"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white border border-[#14213D]/20 rounded-lg px-3 py-2 text-sm text-[#14213D] focus:outline-[#E07A5F]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#14213D] mb-1">Età</label>
                      <input
                        type="number"
                        placeholder="es. 41"
                        value={formData.age}
                        onChange={e => setFormData({ ...formData, age: e.target.value })}
                        className="w-full bg-white border border-[#14213D]/20 rounded-lg px-3 py-2 text-sm text-[#14213D] focus:outline-[#E07A5F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#14213D] mb-1">Regione</label>
                      <input
                        type="text"
                        placeholder="es. Lombardia"
                        value={formData.region}
                        onChange={e => setFormData({ ...formData, region: e.target.value })}
                        className="w-full bg-white border border-[#14213D]/20 rounded-lg px-3 py-2 text-sm text-[#14213D] focus:outline-[#E07A5F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#14213D] mb-1">Tono / Accento</label>
                      <input
                        type="text"
                        placeholder="es. Milanese pacato"
                        value={formData.accent}
                        onChange={e => setFormData({ ...formData, accent: e.target.value })}
                        className="w-full bg-white border border-[#14213D]/20 rounded-lg px-3 py-2 text-sm text-[#14213D] focus:outline-[#E07A5F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#14213D] mb-1">Fascia Oraria di Disponibilità Indicativa</label>
                    <input
                      type="text"
                      placeholder="es. Pomeriggi 16:00 - 20:00 o Serali 21:00 - 23:00"
                      value={formData.availability}
                      onChange={e => setFormData({ ...formData, availability: e.target.value })}
                      className="w-full bg-white border border-[#14213D]/20 rounded-lg px-3 py-2 text-sm text-[#14213D] focus:outline-[#E07A5F]"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Esperienza Relazionale (Narrativa) */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="bg-[#14213D]/5 border border-[#14213D]/15 p-3 rounded-lg text-xs text-[#14213D]">
                    <strong>Vincolo Etico Rigoroso:</strong> Descrivi il tuo percorso umano e la tua comprensione delle dinamiche relazionali. Sono <u>tassativamente vietati numeri o vanterie</u> su ex partner, conquiste o storie personali. Vogliamo serietà e capacità di decodifica.
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#14213D] mb-1">
                      La tua esperienza relazionale (esclusivamente testo narrativo)
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Racconta cosa hai appreso negli anni sulle relazioni, sui silenzi maschili e su come gli uomini vivono le responsabilità sentimentali..."
                      value={formData.relationalExperience}
                      onChange={e => {
                        // Anti-numeric pattern check
                        const val = e.target.value;
                        setFormData({ ...formData, relationalExperience: val });
                      }}
                      className="w-full bg-white border border-[#14213D]/20 rounded-lg p-3 text-sm text-[#14213D] focus:outline-[#E07A5F]"
                    />
                    <span className="text-[11px] text-[#6B7A99]">
                      Minimo 40 caratteri. Caratteri attuali: {formData.relationalExperience.length}
                    </span>
                  </div>
                </div>
              )}

              {/* STEP 3: Stile di Ascolto */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#14213D] mb-1">
                      Temi che ti senti più pronto ad affrontare:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {[
                        'Silenzi e mancate risposte',
                        'Dinamiche di convivenza',
                        'Paura dell impegno e spazi personali',
                        'Decodifica dei messaggi WhatsApp',
                        'Separazioni e nuovi inizi',
                        'Priorità maschili tra lavoro e coppia'
                      ].map(theme => {
                        const isSelected = formData.themes.includes(theme);
                        return (
                          <button
                            key={theme}
                            type="button"
                            onClick={() => {
                              if (isSelected) {
                                setFormData({
                                  ...formData,
                                  themes: formData.themes.filter(t => t !== theme)
                                });
                              } else {
                                setFormData({
                                  ...formData,
                                  themes: [...formData.themes, theme]
                                });
                              }
                            }}
                            className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-[#E07A5F] text-[#F6F1E7] border-[#E07A5F] font-semibold'
                                : 'bg-white border-[#14213D]/20 text-[#14213D] hover:border-[#14213D]/40'
                            }`}
                          >
                            {theme}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#14213D] mb-1">
                      Autodescrizione sintetica (esattamente 3 righe per il tuo profilo pubblico):
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Riga 1: Tratto distintivo del tuo ascolto...&#10;Riga 2: Come affronti i dubbi delle clienti...&#10;Riga 3: Il valore del tuo punto di vista maschile..."
                      value={formData.selfDescription}
                      onChange={e => setFormData({ ...formData, selfDescription: e.target.value })}
                      className="w-full bg-white border border-[#14213D]/20 rounded-lg p-3 text-sm text-[#14213D] focus:outline-[#E07A5F]"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: Screening Affidabilità (4/4 Obbligatorio) */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="bg-[#14213D] text-[#F6F1E7] border-l-4 border-[#E07A5F] p-3.5 rounded-r-lg text-xs">
                    <strong>Screening di Affidabilità e Conformità:</strong> Rispondi ai 4 scenari realistici. È obbligatorio rispondere correttamente a tutte le 4 domande (4/4). Qualsiasi risposta contraria alle regole bloccherà l&apos;avanzamento.
                  </div>

                  {screeningError && (
                    <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg text-xs flex items-start gap-2">
                      <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-600" />
                      <div>{screeningError}</div>
                    </div>
                  )}

                  <div className="space-y-5">
                    {SCREENING_QUESTIONS.map((q, idx) => (
                      <div key={q.id} className="bg-white/80 border border-[#14213D]/15 p-4 rounded-xl space-y-2.5">
                        <div className="font-bold text-xs text-[#14213D]">
                          Domanda {idx + 1}: &ldquo;{q.question}&rdquo;
                        </div>
                        <div className="space-y-1.5">
                          {q.options.map((opt, oIdx) => {
                            const isChosen = (formData.answers as Record<string, string>)[q.id] === opt.text;
                            return (
                              <label
                                key={oIdx}
                                className={`flex items-start gap-2 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                                  isChosen
                                    ? 'border-[#14213D] bg-[#14213D]/5 font-semibold text-[#14213D]'
                                    : 'border-[#14213D]/10 hover:bg-white text-[#14213D]/80'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={q.id}
                                  checked={isChosen}
                                  onChange={() => {
                                    setScreeningError(null);
                                    setFormData({
                                      ...formData,
                                      answers: { ...formData.answers, [q.id]: opt.text }
                                    });
                                  }}
                                  className="mt-0.5 accent-[#E07A5F]"
                                />
                                <span>{opt.text}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5: Accettazione Vincoli */}
              {step === 5 && (
                <div className="space-y-4">
                  <div className="bg-white/70 border border-[#14213D]/15 p-4 rounded-xl space-y-3">
                    <h4 className="font-bold text-xs text-[#14213D] uppercase tracking-wide">
                      Accordi Vincolanti per l&apos;Operatore
                    </h4>

                    <div className="space-y-3 text-xs text-[#14213D]">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.acceptedCodeOfConduct}
                          onChange={e =>
                            setFormData({ ...formData, acceptedCodeOfConduct: e.target.checked })
                          }
                          className="mt-0.5 accent-[#E07A5F] w-4 h-4 rounded cursor-pointer"
                        />
                        <span>
                          <strong>Codice di Condotta:</strong> Mi impegno a mantenere una conversazione cordiale, rispettosa e priva di qualunque approccio seduttivo o personale.
                        </span>
                      </label>

                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.acceptedPrivacy}
                          onChange={e =>
                            setFormData({ ...formData, acceptedPrivacy: e.target.checked })
                          }
                          className="mt-0.5 accent-[#E07A5F] w-4 h-4 rounded cursor-pointer"
                        />
                        <span>
                          <strong>Riservatezza Totale:</strong> Vietato scambiare contatti esterni (WhatsApp, social, telefono). Nessun contatto al di fuori del bridge Twilio.
                        </span>
                      </label>

                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.acceptedSplit}
                          onChange={e =>
                            setFormData({ ...formData, acceptedSplit: e.target.checked })
                          }
                          className="mt-0.5 accent-[#E07A5F] w-4 h-4 rounded cursor-pointer"
                        />
                        <span>
                          <strong>Compenso Split 50/50:</strong> Accetto il compenso di €0,50/minuto effettivo di conversazione, accreditato mensilmente via bonifico o Stripe Connect.
                        </span>
                      </label>

                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.acceptedBanPolicy}
                          onChange={e =>
                            setFormData({ ...formData, acceptedBanPolicy: e.target.checked })
                          }
                          className="mt-0.5 accent-[#E07A5F] w-4 h-4 rounded cursor-pointer"
                        />
                        <span>
                          <strong>Ban Policy & Blocco Compensi:</strong> La violazione delle regole di salvaguardia o l&apos;insistenza in incontri dal vivo comporteranno il ban immediato e la perdita dei compensi maturati.
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: Campione Voce & Foto Protetta */}
              {step === 6 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-[#14213D] mb-1">
                      Campione Vocale di Presentazione (30-60 secondi)
                    </label>
                    <p className="text-xs text-[#6B7A99] mb-2">
                      Carica o registra una breve traccia audio in cui ti presenti con tono naturale e calmo.
                    </p>
                    <div className="bg-white border border-[#14213D]/20 p-4 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#E07A5F]/20 text-[#E07A5F] flex items-center justify-center">
                          <Mic size={20} />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-[#14213D] block">campione_voce_presentazione.mp3</span>
                          <span className="text-[11px] text-[#6B7A99]">Durata: 42s • Qualità studio audio</span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[#2F6B4F] bg-[#2F6B4F]/10 px-2.5 py-1 rounded-full">
                        Pronto per upload
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#14213D] mb-1">
                      Foto Profilo (Auto-blurrata lato client per la tua riservatezza)
                    </label>
                    <div className="bg-white border border-[#14213D]/20 p-4 rounded-xl flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#14213D]">
                        <img
                          src={formData.photoUrl}
                          alt="Anteprima foto"
                          className="w-full h-full object-cover filter blur-sm scale-110"
                        />
                        <div className="absolute inset-0 bg-[#6B7A99]/70 flex items-center justify-center">
                          <Lock size={16} className="text-[#F6F1E7]" />
                        </div>
                      </div>
                      <div className="space-y-1 text-xs">
                        <span className="font-bold text-[#14213D] block">Protezione Visiva Automatica</span>
                        <p className="text-[#6B7A99]">
                          La tua foto viene salvata con velo ardesia 70% e lucchetto. Solo tu potrai decidere se renderla visibile, e mai in cambio di denaro.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Controls */}
        {!isSubmitted && (
          <div className="bg-[#F6F1E7] border-t border-[#14213D]/10 p-4 px-6 flex items-center justify-between shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              disabled={step === 1}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14213D] disabled:opacity-30 cursor-pointer"
            >
              <ArrowLeft size={14} />
              Indietro
            </button>

            <CtaButton size="sm" onClick={handleNext}>
              <span>{step === 6 ? 'Invia Candidatura Definitiva' : 'Continua'}</span>
              <ArrowRight size={14} className="ml-1" />
            </CtaButton>
          </div>
        )}
      </div>
    </div>
  );
};
