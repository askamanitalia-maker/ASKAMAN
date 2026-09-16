import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CtaButton } from '../components/common/CtaButton';
import { Logo } from '../components/common/Logo';
import { Phone, ShieldAlert, CheckCircle2, Lock } from 'lucide-react';

interface OperatorLoginPageProps {
  onNavigate: (path: string) => void;
}

export const OperatorLoginPage: React.FC<OperatorLoginPageProps> = ({ onNavigate }) => {
  const { loginUser } = useApp();
  const [phone, setPhone] = useState('+39 340 558 9123');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      setOtpCode('940128');
    }, 800);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length < 4) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginUser(phone, true); // login as operator
      onNavigate('/operator-dashboard');
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-[#14213D] text-[#F6F1E7] border border-[#14213D] rounded-3xl p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4 bg-[#F6F1E7] p-2.5 rounded-xl w-fit mx-auto">
            <Logo size="md" showTagline={false} />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#E07A5F] px-2.5 py-0.5 rounded bg-[#E07A5F]/15">
            Portale Operatori Maschili
          </span>
          <h2 className="text-2xl font-extrabold text-[#F6F1E7]">
            Accesso Operatore Verificato
          </h2>
          <p className="text-xs text-[#6B7A99] leading-relaxed">
            Accesso riservato agli operatori certificati che hanno superato lo screening di 6 step.
          </p>
        </div>

        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#F6F1E7] mb-1.5">
                Telefono Operatore (per Twilio Caller ID)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+39 340 000 0000"
                  required
                  className="w-full bg-[#F6F1E7]/10 border border-[#F6F1E7]/20 rounded-xl px-4 py-3 text-sm font-mono text-[#F6F1E7] focus:outline-[#E07A5F]"
                />
                <Phone size={18} className="absolute right-3.5 top-3.5 text-[#6B7A99]" />
              </div>
            </div>

            <div className="p-3 bg-[#F6F1E7]/5 border border-[#F6F1E7]/10 rounded-xl text-[11px] text-[#6B7A99] flex items-start gap-2">
              <ShieldAlert size={16} className="text-[#E07A5F] shrink-0 mt-0.5" />
              <span>
                All&apos;accesso ti verrà richiesto di ri-confermare il protocollo compliance non dismissabile.
              </span>
            </div>

            <CtaButton type="submit" size="md" fullWidth disabled={isLoading}>
              {isLoading ? 'Invio codice...' : 'Invia OTP Operatore'}
            </CtaButton>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="bg-[#2F6B4F]/20 border border-[#2F6B4F]/40 p-3 rounded-xl text-xs text-[#2F6B4F] flex items-center gap-2">
              <CheckCircle2 size={16} />
              <span className="text-[#F6F1E7]">SMS OTP inviato al {phone}</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#F6F1E7] mb-1.5">
                Codice OTP Ricevuto
              </label>
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={e => setOtpCode(e.target.value)}
                placeholder="123456"
                required
                className="w-full bg-[#F6F1E7]/10 border border-[#F6F1E7]/20 rounded-xl px-4 py-3 text-lg font-mono tracking-widest text-center text-[#F6F1E7] focus:outline-[#E07A5F]"
              />
            </div>

            <CtaButton type="submit" size="md" fullWidth disabled={isLoading}>
              {isLoading ? 'Verifica credenziali...' : 'Accedi alla Dashboard Operatore'}
            </CtaButton>
          </form>
        )}

        <div className="pt-4 border-t border-[#F6F1E7]/10 text-center">
          <p className="text-[11px] text-[#6B7A99]">
            Vuoi candidarti per diventare un operatore?{' '}
            <button
              type="button"
              onClick={() => onNavigate('/operators')}
              className="text-[#E07A5F] font-bold hover:underline cursor-pointer"
            >
              Candidati via griglia
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
