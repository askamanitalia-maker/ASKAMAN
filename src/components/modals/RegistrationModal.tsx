import React, { useState } from 'react';
import { X, Phone, ShieldCheck, CheckCircle2, ArrowRight, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CtaButton } from '../common/CtaButton';

export const RegistrationModal: React.FC = () => {
  const {
    isRegistrationModalOpen,
    setIsRegistrationModalOpen,
    loginUser,
    selectedOperatorForCall,
    startCall
  } = useApp();

  const [phone, setPhone] = useState('+39 347 882 1920');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isRegistrationModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      setOtpCode('749201'); // Codice simulato per test istantaneo
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length < 4) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginUser(phone, false);
      setIsRegistrationModalOpen(false);

      // Se era già stato selezionato un operatore per la chiamata, avvia la sessione
      if (selectedOperatorForCall) {
        setTimeout(() => {
          startCall(selectedOperatorForCall);
        }, 150);
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14213D]/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#F6F1E7] border border-[#14213D]/20 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="p-5 bg-[#14213D] text-[#F6F1E7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E07A5F]/20 flex items-center justify-center text-[#E07A5F]">
              <Phone size={16} />
            </div>
            <div>
              <h3 className="text-sm font-extrabold tracking-tight">
                Registrazione Rapida Cliente
              </h3>
              <p className="text-[11px] text-[#F6F1E7]/70">
                {selectedOperatorForCall
                  ? `Accesso per ${selectedOperatorForCall.name}`
                  : 'Sblocca 5+5\'\' Free per 2 operatori live'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsRegistrationModalOpen(false)}
            className="w-8 h-8 rounded-full bg-[#F6F1E7]/10 hover:bg-[#F6F1E7]/20 flex items-center justify-center text-[#F6F1E7] text-sm cursor-pointer transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Informative Security Banner */}
        <div className="bg-[#2F6B4F]/10 border-b border-[#2F6B4F]/20 px-5 py-3 flex items-start gap-2.5 text-xs text-[#2F6B4F]">
          <ShieldCheck size={15} className="shrink-0 mt-0.5 text-[#2F6B4F]" />
          <div className="leading-snug">
            <strong>Accesso Riservato:</strong> Verifica rapida via SMS per accedere alla piattaforma e iniziare la prova gratuita.
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#14213D] mb-1.5">
                  Numero di Telefono Cellulare
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+39 347 123 4567"
                    required
                    className="w-full pl-4 pr-10 py-3 rounded-xl bg-white border border-[#14213D]/20 text-[#14213D] text-sm font-semibold focus:outline-hidden focus:border-[#E07A5F] shadow-xs"
                  />
                  <div className="absolute right-3 top-3 text-[#6B7A99]">
                    <Lock size={16} />
                  </div>
                </div>
                <p className="text-[11px] text-[#6B7A99] mt-1.5 flex items-center gap-1">
                  <ShieldCheck size={12} className="text-[#2F6B4F]" />
                  <span>Numero mascherato: l&apos;operatore non vedrà mai il tuo recapito reale.</span>
                </p>
              </div>

              {/* Free Trial Pill */}
              <div className="bg-[#E07A5F]/10 border border-[#E07A5F]/30 p-3 rounded-xl flex items-center gap-2.5 text-xs text-[#14213D]">
                <CheckCircle2 size={16} className="text-[#E07A5F] shrink-0" />
                <span>
                  <strong>Include 5+5&apos;&apos; Free:</strong> 5 min con un primo operatore + 5 min con un secondo operatore live. Nessuna carta di credito.
                </span>
              </div>

              <CtaButton
                type="submit"
                size="md"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2"
              >
                <span>{isLoading ? 'Invio SMS...' : 'Invia Codice SMS Gratuito'}</span>
                <ArrowRight size={15} />
              </CtaButton>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-[#2F6B4F]">SMS inviato a {phone}</span>
                <p className="text-xs text-[#6B7A99]">
                  Inserisci il codice monouso ricevuto per confermare l&apos;identità e avviare la sessione.
                </p>
              </div>

              <div>
                <input
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={e => setOtpCode(e.target.value)}
                  placeholder="749201"
                  required
                  className="w-full text-center tracking-widest text-2xl font-mono py-3 rounded-xl bg-white border border-[#14213D]/20 text-[#14213D] font-bold focus:outline-hidden focus:border-[#E07A5F] shadow-xs"
                />
              </div>

              <CtaButton
                type="submit"
                size="md"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2"
              >
                <span>{isLoading ? 'Verifica in corso...' : 'Conferma Codice SMS'}</span>
                <CheckCircle2 size={16} />
              </CtaButton>

              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="w-full text-center text-xs text-[#6B7A99] hover:text-[#14213D] cursor-pointer"
              >
                Cambia numero di telefono
              </button>
            </form>
          )}

          <div className="pt-2 border-t border-[#14213D]/10 text-center text-[11px] text-[#6B7A99]">
            Zero abbonamenti • Nessuna registrazione audio • Chiamate 100% anonime
          </div>
        </div>
      </div>
    </div>
  );
};
