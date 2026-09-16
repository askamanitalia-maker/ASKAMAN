import React from 'react';
import { Lock, Eye } from 'lucide-react';

interface OperatorPhotoProps {
  photoUrl: string;
  name: string;
  unlockedByConsent?: boolean;
  onToggleConsent?: () => void;
  canToggleConsent?: boolean; // Solo operatore stesso o admin può concedere consenso
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const OperatorPhoto: React.FC<OperatorPhotoProps> = ({
  photoUrl,
  name,
  unlockedByConsent = false,
  onToggleConsent,
  canToggleConsent = false,
  size = 'md',
  className = ''
}) => {
  const sizeMap = {
    sm: 'w-12 h-12 rounded-xl',
    md: 'w-24 h-24 rounded-2xl',
    lg: 'w-36 h-36 rounded-2xl',
    xl: 'w-48 h-48 rounded-2xl'
  };

  const lockSizes = {
    sm: 14,
    md: 20,
    lg: 28,
    xl: 36
  };

  return (
    <div className="relative group inline-block">
      <div className={`relative overflow-hidden bg-[#14213D] shadow-inner ${sizeMap[size]} ${className}`}>
        {/* Base image */}
        <img
          src={photoUrl}
          alt={`Operatore ${name}`}
          className={`w-full h-full object-cover transition-all duration-300 ${
            unlockedByConsent ? 'filter-none' : 'filter blur-md scale-110'
          }`}
          loading="lazy"
        />

        {/* Velo blur ardesia 70% + icona lucchetto carta (quando non c'è consenso operatore) */}
        {!unlockedByConsent && (
          <div
            className="absolute inset-0 bg-[#6B7A99]/70 backdrop-blur-sm flex flex-col items-center justify-center p-2 text-center select-none"
            title="Foto offuscata per tutela della riservatezza dell'operatore. Lo sblocco avviene solo previo suo esplicito consenso, mai tramite pagamento."
          >
            <div className="w-8 h-8 rounded-full bg-[#14213D]/60 flex items-center justify-center border border-[#F6F1E7]/30 shadow-xs">
              <Lock size={lockSizes[size]} className="text-[#F6F1E7]" strokeWidth={2.2} />
            </div>
            {size === 'xl' || size === 'lg' ? (
              <span className="text-[11px] text-[#F6F1E7] font-medium mt-2 leading-tight px-2 drop-shadow-sm">
                Riservatezza operatore
              </span>
            ) : null}
          </div>
        )}
      </div>

      {/* Controllo opzionale per l'operatore per concedere il consenso */}
      {canToggleConsent && onToggleConsent && (
        <button
          type="button"
          onClick={onToggleConsent}
          className="mt-2 text-xs flex items-center gap-1.5 text-[#14213D] hover:text-[#E07A5F] underline font-medium cursor-pointer"
        >
          <Eye size={13} />
          {unlockedByConsent ? 'Ripristina velo protettivo' : 'Concedi consenso visivo'}
        </button>
      )}
    </div>
  );
};
