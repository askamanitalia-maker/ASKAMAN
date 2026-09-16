import React, { useState } from 'react';
import { X, Check, ShieldCheck, CreditCard, Lock, Sparkles, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CREDIT_PACKS } from '../../data/initialData';
import { CreditPack } from '../../types';
import { CtaButton } from '../common/CtaButton';

export const StripeCheckoutModal: React.FC = () => {
  const { isStripeModalOpen, setIsStripeModalOpen, buyCreditPack, currentUser } = useApp();
  const [selectedPack, setSelectedPack] = useState<CreditPack>(CREDIT_PACKS[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isStripeModalOpen) return null;

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate real Stripe Checkout flow
    setTimeout(() => {
      buyCreditPack(selectedPack);
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsStripeModalOpen(false);
      }, 1400);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14213D]/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#F6F1E7] border border-[#14213D]/20 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="bg-[#14213D] text-[#F6F1E7] p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E07A5F] flex items-center justify-center text-[#F6F1E7]">
              <Clock size={22} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#F6F1E7]">Acquista Minuti di Conversazione</h3>
              <p className="text-xs text-[#6B7A99]">
                Nessun abbonamento ricorrente. Crediti a scalare su chiamate reali.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsStripeModalOpen(false)}
            className="text-[#F6F1E7]/70 hover:text-[#F6F1E7] p-1.5 rounded-lg hover:bg-[#F6F1E7]/10 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#2F6B4F] text-[#F6F1E7] mx-auto flex items-center justify-center shadow-lg animate-bounce">
              <Check size={36} strokeWidth={3} />
            </div>
            <h4 className="text-xl font-bold text-[#14213D]">Pagamento Confermato!</h4>
            <p className="text-sm text-[#6B7A99]">
              Sono stati aggiunti <strong className="text-[#14213D] font-bold">{selectedPack.minutes} minuti</strong> al tuo conto.
              La transazione è stata registrata con successo su Stripe.
            </p>
          </div>
        ) : (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Founder badge notice */}
            {currentUser?.isFounder && (
              <div className="bg-[#2F6B4F]/10 border border-[#2F6B4F]/30 p-3 rounded-xl flex items-center gap-3 text-xs text-[#2F6B4F]">
                <Sparkles size={16} className="shrink-0 text-[#2F6B4F]" />
                <span>
                  <strong>Stato Founder Attivo:</strong> Ti sei registrata nei primi 6 mesi. La tariffa piena è bloccata a €1,00/minuto per 12 mesi.
                </span>
              </div>
            )}

            {/* Pack choices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CREDIT_PACKS.map(pack => {
                const isSelected = selectedPack.id === pack.id;
                const pricePerMin = (pack.priceEUR / pack.minutes).toFixed(2);

                return (
                  <div
                    key={pack.id}
                    onClick={() => setSelectedPack(pack)}
                    className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#E07A5F] bg-[#E07A5F]/5 shadow-md'
                        : 'border-[#14213D]/15 hover:border-[#14213D]/40 bg-white/60'
                    }`}
                  >
                    {pack.badge && (
                      <span className="absolute -top-2.5 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E07A5F] text-[#F6F1E7] shadow-xs uppercase tracking-wider">
                        {pack.badge}
                      </span>
                    )}

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#14213D]">{pack.name}</span>
                        <span className="text-lg font-extrabold text-[#14213D]">
                          €{pack.priceEUR}
                        </span>
                      </div>
                      <p className="text-xs text-[#6B7A99] leading-relaxed">
                        {pack.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#14213D]/10 flex items-center justify-between text-xs">
                      <span className="font-bold text-[#14213D]">{pack.minutes} minuti</span>
                      <span className="text-[11px] text-[#6B7A99] font-medium">
                        €{pricePerMin} / min
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stripe Card Mock details */}
            <div className="bg-[#14213D]/5 border border-[#14213D]/10 p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-between text-xs text-[#14213D] font-semibold">
                <span className="flex items-center gap-1.5">
                  <CreditCard size={15} className="text-[#6B7A99]" />
                  Metodo di pagamento sicuro
                </span>
                <span className="flex items-center gap-1 text-[11px] text-[#6B7A99]">
                  <Lock size={12} />
                  Stripe Checkout SSL 256-bit
                </span>
              </div>
              <div className="text-xs text-[#6B7A99]">
                Importo totale addebitato:{' '}
                <strong className="text-base text-[#14213D]">€{selectedPack.priceEUR},00</strong>.
                Nessun costo nascosto.
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-xs text-[#6B7A99]">
                <ShieldCheck size={16} className="text-[#2F6B4F]" />
                <span>Ricarica immediata sul tuo account</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsStripeModalOpen(false)}
                  className="text-xs font-semibold text-[#14213D] hover:underline px-3 py-2 cursor-pointer"
                >
                  Annulla
                </button>
                <CtaButton
                  size="md"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="min-w-[170px]"
                >
                  {isProcessing ? 'Connessione a Stripe...' : `Paga €${selectedPack.priceEUR},00`}
                </CtaButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
