import React, { useState, useEffect } from 'react';
import { PhoneOff, Mic, MicOff, Volume2, Shield, AlertTriangle, UserCheck, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OperatorPhoto } from '../common/OperatorPhoto';
import { VerificationBadge } from '../common/VerificationBadge';

export const CallModal: React.FC = () => {
  const { activeCall, endCall, toggleCallMute, currentUser } = useApp();
  const [showDisclaimerAudio, setShowDisclaimerAudio] = useState(true);

  useEffect(() => {
    if (activeCall) {
      setShowDisclaimerAudio(true);
      const timer = setTimeout(() => {
        setShowDisclaimerAudio(false);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [activeCall?.startTime]);

  if (!activeCall) return null;

  const { operator, durationSeconds, isFreeTrial, isMuted } = activeCall;

  const minutesPassed = Math.floor(durationSeconds / 60);
  const secondsPassed = durationSeconds % 60;
  const formattedTime = `${String(minutesPassed).padStart(2, '0')}:${String(secondsPassed).padStart(2, '0')}`;

  const totalAllowedMinutes = isFreeTrial ? 10 : currentUser.creditsMinutes;
  const remainingSeconds = Math.max(0, totalAllowedMinutes * 60 - durationSeconds);
  const remainingMinutes = Math.ceil(remainingSeconds / 60);

  const isLowTime = remainingSeconds <= 60 && remainingSeconds > 0;
  const isTimeExpired = remainingSeconds === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14213D]/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#14213D] text-[#F6F1E7] border border-[#14213D] rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative">
        {/* Header / Call Status */}
        <div className="p-4 bg-[#14213D] border-b border-[#F6F1E7]/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2F6B4F] animate-pulse"></span>
            <span className="font-semibold text-[#F6F1E7]">Chiamata Vocale Protetta</span>
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
              <strong>Annuncio Vocale di Sicurezza TwiML:</strong> &ldquo;AskAMan: servizio di conversazione informale. Operatori non sanitari. Privacy totale, nessun numero scambiato.&rdquo;
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

        {/* Footer info: 50/50 split reminder */}
        <div className="p-3 bg-[#14213D] border-t border-[#F6F1E7]/10 text-center text-[11px] text-[#6B7A99]">
          {isFreeTrial ? (
            <span className="text-[#2F6B4F]">
              🎉 Prima Chiamata Gratuita (10 minuti offerti da AskAMan)
            </span>
          ) : (
            <span>Tariffa: €1,00/min • Split etico 50/50: €0,50 operatore / €0,50 piattaforma</span>
          )}
        </div>
      </div>
    </div>
  );
};
