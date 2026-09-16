import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CtaButton } from '../components/common/CtaButton';
import { Logo } from '../components/common/Logo';
import { Phone, ShieldCheck, CheckCircle2, ArrowRight, Lock } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { loginUser } = useApp();
  const [phone, setPhone] = useState('+39 347 882 1920');
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
      setOtpCode('829104'); // pre-fill or simulated demo OTP
    }, 800);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length < 4) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginUser(phone, false);
      onNavigate('/dashboard');
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-[#F6F1E7] border border-[#14213D]/15 rounded-3xl p-8 shadow-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <Logo size="md" showTagline={false} />
          </div>
          <h2 className="text-2xl font-extrabold text-[#14213D]">
            Accesso Cliente Riservato
          </h2>
          <p className="text-xs text-[#6B7A99] leading-relaxed">
            Verifica istantanea via SMS OTP. <strong className="text-[#14213D]">Nessuna carta di credito richiesta</strong> e nessun dato sensibile.
          </p>
        </div>

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
                  placeholder="+39 347 000 0000"
                  required
                  className="w-full bg-white border border-[#14213D]/20 rounded-xl px-4 py-3 text-sm font-mono text-[#14213D] focus:outline-[#E07A5F]"
                />
                <Phone size={18} className="absolute right-3.5 top-3.5 text-[#6B7A99]" />
              </div>
            </div>

            <div className="p-3 bg-[#14213D]/5 rounded-xl text-[11px] text-[#6B7A99] flex items-start gap-2">
              <ShieldCheck size={16} className="text-[#2F6B4F] shrink-0 mt-0.5" />
              <span>
                Il tuo numero viene usato solo per l&apos;autenticazione Firebase Auth e non sarà visibile ad alcun operatore.
              </span>
            </div>

            <CtaButton type="submit" size="md" fullWidth disabled={isLoading}>
              {isLoading ? 'Invio SMS OTP in corso...' : 'Ricevi Codice via SMS'}
            </CtaButton>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="bg-[#2F6B4F]/10 border border-[#2F6B4F]/20 p-3 rounded-xl text-xs text-[#2F6B4F] flex items-center gap-2">
              <CheckCircle2 size={16} />
              <span>SMS inviato con successo al {phone}</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#14213D] mb-1.5">
                Codice OTP di 6 Cifre
              </label>
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={e => setOtpCode(e.target.value)}
                placeholder="123456"
                required
                className="w-full bg-white border border-[#14213D]/20 rounded-xl px-4 py-3 text-lg font-mono tracking-widest text-center text-[#14213D] focus:outline-[#E07A5F]"
              />
            </div>

            <CtaButton type="submit" size="md" fullWidth disabled={isLoading}>
              {isLoading ? 'Verifica del codice...' : 'Conferma ed Entra'}
            </CtaButton>

            <button
              type="button"
              onClick={() => setOtpSent(false)}
              className="w-full text-xs text-[#6B7A99] hover:text-[#14213D] underline cursor-pointer"
            >
              Modifica numero di telefono
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-[#14213D]/10 text-center">
          <p className="text-[11px] text-[#6B7A99]">
            Sei un operatore registrato?{' '}
            <button
              type="button"
              onClick={() => onNavigate('/operator-login')}
              className="text-[#E07A5F] font-bold hover:underline cursor-pointer"
            >
              Accedi all&apos;Area Operatori
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
