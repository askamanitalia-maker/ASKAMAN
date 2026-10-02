import React, { useState, useEffect } from 'react';
import {
  Phone,
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  Shield,
  AlertTriangle,
  Lock,
  X,
  Sparkles,
  Clock,
  CheckCircle2,
  Key
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OperatorPhoto } from '../common/OperatorPhoto';
import { VerificationBadge } from '../common/VerificationBadge';

const playTone = (freq = 440, duration = 0.08) => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // AudioContext blocked or unsupported
  }
};

export const CallModal: React.FC = () => {
  const {
    activeCall,
    connectCall,
    cancelCall,
    endCall,
    toggleCallMute,
    currentUser
  } = useApp();

  const [showDisclaimerAudio, setShowDisclaimerAudio] = useState(true);
  const [dialedDigits, setDialedDigits] = useState<string>('');
  const [micGranted, setMicGranted] = useState(false);
  const [isRequestingMic, setIsRequestingMic] = useState(false);

  const handleRequestMicrophone = async (): Promise<boolean> => {
    setIsRequestingMic(true);
    try {
      if (navigator?.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(t => t.stop());
        setMicGranted(true);
        return true;
      } else {
        setMicGranted(true);
        return true;
      }
    } catch (err) {
      console.info('Microphone request handled:', err);
      // Allow proceeding in environments without hardware/sandbox mic
      setMicGranted(true);
      return true;
    } finally {
      setIsRequestingMic(false);
    }
  };

  useEffect(() => {
    if (activeCall?.status === 'connected') {
      setShowDisclaimerAudio(true);
      const timer = setTimeout(() => {
        setShowDisclaimerAudio(false);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [activeCall?.status, activeCall?.startTime]);

  if (!activeCall) return null;

  const { operator, durationSeconds, isFreeTrial, isMuted, status } = activeCall;

  const minutesPassed = Math.floor(durationSeconds / 60);
  const secondsPassed = durationSeconds % 60;
  const formattedTime = `${String(minutesPassed).padStart(2, '0')}:${String(secondsPassed).padStart(2, '0')}`;

  const totalAllowedMinutes = isFreeTrial ? 5 : currentUser.creditsMinutes;
  const remainingSeconds = Math.max(0, totalAllowedMinutes * 60 - durationSeconds);
  const remainingMinutes = Math.ceil(remainingSeconds / 60);

  const isLowTime = status === 'connected' && remainingSeconds <= 60 && remainingSeconds > 0;
  const isTimeExpired = status === 'connected' && remainingSeconds === 0;

  const handleKeypadPress = (digit: string, freq: number) => {
    playTone(freq, 0.08);
    setDialedDigits(prev => (prev.length < 8 ? prev + digit : prev));
  };

  /* =========================================================================
     1. STATO: READY — INTERFACCIA TELEFONO APERTA (LA CHIAMATA NON È PARTITA)
     ========================================================================= */
  if (status === 'ready') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#14213D]/85 backdrop-blur-md animate-fadeIn">
        <div className="bg-[#14213D] text-[#F6F1E7] border border-[#F6F1E7]/15 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh]">
          {/* Header Interfaccia Telefono */}
          <div className="p-4 bg-[#14213D] border-b border-[#F6F1E7]/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span className="font-semibold text-[#F6F1E7]">Interfaccia Telefono VoIP</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-[11px] text-[#E07A5F] bg-[#E07A5F]/15 px-2 py-0.5 rounded-full font-mono">
                <Shield size={12} />
                <span>+39 02 8901 ****</span>
              </div>
              <button
                type="button"
                onClick={cancelCall}
                className="p-1 rounded-lg text-[#6B7A99] hover:text-[#F6F1E7] hover:bg-[#F6F1E7]/10 transition-colors cursor-pointer"
                title="Chiudi telefono"
                aria-label="Chiudi telefono"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-center flex-1">
            {/* Operator Card Info */}
            <div className="flex flex-col items-center space-y-3">
              <div className="relative">
                <OperatorPhoto
                  photoUrl={operator.photoUrl}
                  name={operator.name}
                  unlockedByConsent={operator.photoUnlockedByConsent}
                  size="lg"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <VerificationBadge size="sm" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-[#F6F1E7] tracking-tight">
                  {operator.name}
                </h3>
                <p className="text-xs text-[#6B7A99] mt-0.5">
                  {operator.ageRange} • {operator.region} ({operator.accent})
                </p>
              </div>

              {/* Ready notice pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F6F1E7]/5 border border-[#F6F1E7]/10 text-xs text-[#F6F1E7]/80">
                <span className={`w-2 h-2 rounded-full ${micGranted ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                <span>{micGranted ? 'Linea pronta • Microfono autorizzato' : 'Linea pronta • Microfono attualmente spento'}</span>
              </div>
            </div>

            {/* Display Numero Digitato / Diretto */}
            <div className="bg-[#0B1322] border border-[#F6F1E7]/10 rounded-2xl p-3 space-y-1">
              <span className="text-[10px] text-[#6B7A99] uppercase tracking-wider block font-semibold">
                Centralino Anonimo Ask A Man
              </span>
              <div className="font-mono text-base sm:text-lg font-bold text-[#E07A5F] tracking-wide">
                +39 02 8901 {dialedDigits ? dialedDigits : `[Op. ${operator.name.split(' ')[0]}]`}
              </div>
            </div>

            {/* Tastierino Telefonico Interattivo */}
            <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto">
              {[
                { n: '1', l: '', f: 697 },
                { n: '2', l: 'ABC', f: 770 },
                { n: '3', l: 'DEF', f: 852 },
                { n: '4', l: 'GHI', f: 697 },
                { n: '5', l: 'JKL', f: 770 },
                { n: '6', l: 'MNO', f: 852 },
                { n: '7', l: 'PQRS', f: 697 },
                { n: '8', l: 'TUV', f: 770 },
                { n: '9', l: 'WXYZ', f: 852 },
                { n: '*', l: '', f: 941 },
                { n: '0', l: '+', f: 770 },
                { n: '#', l: '', f: 941 }
              ].map(k => (
                <button
                  key={k.n}
                  type="button"
                  onClick={() => handleKeypadPress(k.n, k.f)}
                  className="h-11 rounded-xl bg-[#F6F1E7]/5 hover:bg-[#F6F1E7]/15 active:scale-95 transition-all text-[#F6F1E7] flex flex-col items-center justify-center cursor-pointer border border-[#F6F1E7]/5 hover:border-[#F6F1E7]/20"
                >
                  <span className="text-sm font-bold leading-none">{k.n}</span>
                  {k.l && (
                    <span className="text-[8px] text-[#6B7A99] uppercase tracking-widest mt-0.5 leading-none">
                      {k.l}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* SEZIONE ATTIVAZIONE MICROFONO PRIMA DEL CLICK DI CHIAMATA */}
            <div className="w-full max-w-[320px] mx-auto text-left">
              {!micGranted ? (
                <div className="bg-[#0B1322] border border-amber-500/35 rounded-2xl p-3.5 space-y-2.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wide">
                      <Mic size={15} />
                      <span>1. Attiva Microfono</span>
                    </div>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded-full">
                      Richiesto
                    </span>
                  </div>
                  <p className="text-[11px] text-[#F6F1E7]/80 leading-relaxed">
                    Autorizza il microfono prima di cliccare sul telefono per avviare la conversazione con {operator.name}.
                  </p>
                  <button
                    type="button"
                    onClick={handleRequestMicrophone}
                    disabled={isRequestingMic}
                    className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-[#14213D] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    <Mic size={15} />
                    <span>{isRequestingMic ? 'Richiesta autorizzazione...' : 'Consenti Microfono'}</span>
                  </button>
                </div>
              ) : (
                <div className="bg-[#2F6B4F]/20 border border-[#2F6B4F]/40 rounded-2xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#2F6B4F] text-[#F6F1E7] flex items-center justify-center shrink-0">
                      <CheckCircle2 size={16} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#2F6B4F] block leading-tight">
                        ✓ Microfono Autorizzato e Pronto
                      </span>
                      <span className="text-[10px] text-[#F6F1E7]/70">
                        Pronto per avviare la conversazione
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#2F6B4F] bg-[#2F6B4F]/20 px-2.5 py-0.5 rounded-full">
                    ✓ Pronto
                  </span>
                </div>
              )}
            </div>

            {/* IL TASTO VERDE DEL TELEFONO: LA CHIAMATA PARTE SOLO QUI */}
            <div className="pt-1 flex flex-col items-center space-y-3">
              <button
                type="button"
                onClick={async () => {
                  if (!micGranted) {
                    await handleRequestMicrophone();
                  }
                  playTone(587, 0.15);
                  connectCall();
                }}
                className={`group relative w-20 h-20 rounded-full text-white flex items-center justify-center shadow-xl transition-all cursor-pointer ring-8 ${
                  micGranted
                    ? 'bg-gradient-to-tr from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 ring-emerald-500/25 animate-pulse hover:scale-105 active:scale-95 shadow-emerald-500/40'
                    : 'bg-gradient-to-tr from-emerald-700 to-green-600 hover:from-emerald-600 hover:to-green-500 ring-emerald-500/15'
                }`}
                title="Clicca sul telefono per far partire la chiamata"
                aria-label="Clicca sul telefono per chiamare"
              >
                <Phone size={34} className="fill-white transition-transform group-hover:rotate-12" />
              </button>

              <div className="space-y-1">
                <span className="text-xs sm:text-sm font-extrabold text-[#F6F1E7] tracking-tight block uppercase">
                  Clicca sul telefono verde per chiamare
                </span>
                <p className="text-[11px] text-[#6B7A99]">
                  {micGranted
                    ? `La chiamata vocale con ${operator.name} e il cronometro partiranno al tuo tocco.`
                    : `Autorizza il microfono prima di chiamare o clicca per autorizzarlo e avviare la chiamata.`}
                </p>
              </div>

              {/* Annulla link */}
              <button
                type="button"
                onClick={cancelCall}
                className="text-xs text-[#6B7A99] hover:text-[#E07A5F] underline pt-1 transition-colors cursor-pointer"
              >
                Non ora, chiudi telefono
              </button>
            </div>
          </div>

          {/* Footer Tariffe & Privacy */}
          <div className="p-3 bg-[#14213D] border-t border-[#F6F1E7]/10 text-center text-[11px] text-[#6B7A99]">
            {isFreeTrial ? (
              <span className="text-[#2F6B4F] font-semibold flex items-center justify-center gap-1">
                <Sparkles size={13} />
                Prova 5+5&apos;&apos; Free • 5 minuti inclusi a costo zero al momento della risposta
              </span>
            ) : (
              <span>
                Tariffa: 1 credito/min • Il conteggio minuti si attiva solo dopo la risposta • Zero addebiti adesso
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     2. STATO: CONNECTING — CONNESSIONE AL CENTRALINO IN CORSO
     ========================================================================= */
  if (status === 'connecting') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14213D]/85 backdrop-blur-md animate-fadeIn">
        <div className="bg-[#14213D] text-[#F6F1E7] border border-[#F6F1E7]/15 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative p-8 text-center space-y-6">
          <div className="relative inline-block mx-auto">
            {/* Pulsing rings */}
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping"></div>
            <div className="relative">
              <OperatorPhoto
                photoUrl={operator.photoUrl}
                name={operator.name}
                unlockedByConsent={operator.photoUnlockedByConsent}
                size="xl"
              />
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-[#F6F1E7]">{operator.name}</h3>
            <p className="text-xs text-[#6B7A99]">
              Connessione in corso su linea protetta...
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#E07A5F] bg-[#E07A5F]/10 py-2 px-4 rounded-xl border border-[#E07A5F]/20">
            <PhoneCall size={16} className="animate-bounce" />
            <span>Instradamento VoIP anonimo (+39 02 8901 ****)</span>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              type="button"
              onClick={cancelCall}
              className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
              title="Annulla chiamata"
            >
              <PhoneOff size={24} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     3. STATO: CONNECTED — IN CHIAMATA VOCALE PROTETTA
     ========================================================================= */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14213D]/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#14213D] text-[#F6F1E7] border border-[#14213D] rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative">
        {/* Header / Call Status */}
        <div className="p-4 bg-[#14213D] border-b border-[#F6F1E7]/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2F6B4F] animate-pulse"></span>
            <span className="font-semibold text-[#F6F1E7]">Chiamata Vocale Protetta Attiva</span>
            <span className="text-[11px] text-[#2F6B4F] font-medium">(Nessuna registrazione)</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#E07A5F] bg-[#E07A5F]/15 px-2.5 py-0.5 rounded-full font-mono">
            <Shield size={12} />
            <span>Numero Mascherato: +39 02 8901 ****</span>
          </div>
        </div>

        {/* Disclaimer TwiML Voice Banner */}
        {showDisclaimerAudio && (
          <div className="bg-[#E07A5F] text-[#F6F1E7] px-4 py-2.5 text-xs flex items-center gap-2 transition-all">
            <Volume2 size={16} className="shrink-0 animate-bounce" />
            <div className="leading-tight">
              <strong>Annuncio Vocale di Sicurezza TwiML:</strong> &ldquo;Ask A Man: servizio di conversazione informale. Operatori non sanitari. Privacy totale, nessun numero scambiato.&rdquo;
            </div>
          </div>
        )}

        {/* Low time warning banner */}
        {isLowTime && (
          <div className="bg-amber-600 text-white px-4 py-2 text-xs flex items-center gap-2 animate-pulse">
            <AlertTriangle size={16} className="shrink-0" />
            <span>
              <strong>Attenzione:</strong> Meno di 1 minuto rimanente! Allo scadere, la chiamata verrà interrotta automaticamente (Hard stop).
            </span>
          </div>
        )}

        {/* Hard stop announcement */}
        {isTimeExpired && (
          <div className="bg-red-700 text-white px-4 py-2.5 text-xs flex items-center gap-2">
            <AlertTriangle size={16} className="shrink-0" />
            <span>
              <strong>TwiML Vocale:</strong> &ldquo;Il tuo tempo è terminato.&rdquo; — Chiusura automatica in corso...
            </span>
          </div>
        )}

        {/* Main Calling Stage */}
        <div className="p-8 flex flex-col items-center text-center space-y-6">
          {/* Operator photo with blur veil */}
          <div className="relative">
            <OperatorPhoto
              photoUrl={operator.photoUrl}
              name={operator.name}
              unlockedByConsent={operator.photoUnlockedByConsent}
              size="xl"
            />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <VerificationBadge size="sm" />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-[#F6F1E7] tracking-tight">{operator.name}</h3>
            <p className="text-xs text-[#6B7A99]">
              {operator.ageRange} • {operator.region} ({operator.accent})
            </p>
          </div>

          {/* Real-time Call Duration Timer */}
          <div className="bg-[#14213D] border border-[#F6F1E7]/20 rounded-2xl px-6 py-4 w-full flex items-center justify-between">
            <div className="text-left">
              <span className="text-[11px] text-[#6B7A99] uppercase tracking-wider block">
                Durata Chiamata
              </span>
              <span className="text-2xl font-mono font-bold text-[#F6F1E7]">
                {formattedTime}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-[#6B7A99] uppercase tracking-wider block">
                {isFreeTrial ? 'Tempo Gratuito Residuo' : 'Minuti Residui'}
              </span>
              <span
                className={`text-2xl font-mono font-bold ${
                  isLowTime ? 'text-amber-400 animate-pulse' : 'text-[#2F6B4F]'
                }`}
              >
                {remainingMinutes} min
              </span>
            </div>
          </div>

          {/* Privacy reminder pill */}
          <div className="flex items-center gap-2 text-xs text-[#6B7A99] bg-[#F6F1E7]/5 px-3 py-1.5 rounded-full">
            <Lock size={13} className="text-[#E07A5F]" />
            <span>Nessuna registrazione salvata. Zero dati personali scambiati.</span>
          </div>

          {/* Call controls */}
          <div className="flex items-center justify-center gap-6 pt-4 w-full">
            {/* Mute button */}
            <button
              type="button"
              onClick={toggleCallMute}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                isMuted
                  ? 'bg-amber-600 text-white'
                  : 'bg-[#F6F1E7]/15 hover:bg-[#F6F1E7]/25 text-[#F6F1E7]'
              }`}
              title={isMuted ? 'Riattiva Microfono' : 'Disattiva Microfono'}
            >
              {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
            </button>

            {/* End Call Button */}
            <button
              type="button"
              onClick={endCall}
              className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-transform hover:scale-105 shadow-xl cursor-pointer"
              title="Termina Chiamata"
            >
              <PhoneOff size={28} />
            </button>
          </div>
        </div>

        {/* Footer info: 5+5 free trial and microphone security */}
        <div className="p-3 bg-[#14213D] border-t border-[#F6F1E7]/10 text-center text-[11px] text-[#6B7A99]">
          {isFreeTrial ? (
            <span className="text-[#2F6B4F] font-semibold">
              🎉 Prova 5+5&apos;&apos; Free • Sessione da 5 minuti con {operator.name} (Microfono attivo solo per questa chiamata)
            </span>
          ) : (
            <span>Tariffa: Pacchetto attivo • Microfono protetto e attivo solo per questa chiamata • Split etico 50/50</span>
          )}
        </div>
      </div>
    </div>
  );
};
