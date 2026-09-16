import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';

interface ComplianceBannerProps {
  operatorUid?: string;
  isAcknowledged?: boolean;
  onAcknowledge?: () => void;
  showCheckbox?: boolean;
  className?: string;
}

export const EXACT_COMPLIANCE_TEXT = "REGOLE FERREE: 1) Mai chiedere o fornire numeri, social, email. 2) Zero flirt o seduzione: sei pagato per ascoltare. 3) Zero consigli medici o psicologici. 4) Se emergono traumi, violenza o autolesionismo usa lo SCRIPT DI FUGA: 'Sento che stai soffrendo molto e va oltre le mie competenze. Ti invito a contattare un professionista o il 1522. Devo chiudere qui.' e termina la chiamata. La violazione comporta ban immediato e trattenuta dei compensi.";

export const ComplianceBanner: React.FC<ComplianceBannerProps> = ({
  isAcknowledged = false,
  onAcknowledge,
  showCheckbox = true,
  className = ''
}) => {
  const [checked, setChecked] = useState(isAcknowledged);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    if (isChecked && onAcknowledge) {
      onAcknowledge();
    }
  };

  return (
    <div
      className={`bg-[#14213D] text-[#F6F1E7] border-l-4 border-[#E07A5F] rounded-r-lg p-5 shadow-md ${className}`}
      role="alert"
    >
      <div className="flex items-start gap-3.5">
        <div className="p-2 rounded-full bg-[#E07A5F]/20 text-[#E07A5F] shrink-0 mt-0.5">
          <ShieldAlert size={22} strokeWidth={2.4} />
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="font-bold text-sm tracking-wide text-[#E07A5F] uppercase flex items-center gap-2">
              Protocollo di Sicurezza & Compliance Operatore (v2.4)
            </h4>
            <span className="text-[11px] px-2 py-0.5 bg-[#F6F1E7]/10 text-[#F6F1E7]/90 rounded font-mono">
              Non dismissabile
            </span>
          </div>

          <p className="text-xs leading-relaxed text-[#F6F1E7] font-normal">
            {EXACT_COMPLIANCE_TEXT}
          </p>

          {showCheckbox && (
            <div className="pt-2 border-t border-[#F6F1E7]/15">
              <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs text-[#F6F1E7] hover:text-[#E07A5F] transition-colors">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={handleCheck}
                  className="w-4 h-4 rounded border-[#E07A5F] text-[#E07A5F] focus:ring-[#E07A5F] accent-[#E07A5F] cursor-pointer"
                />
                <span className="font-medium">
                  Ho letto, comprendo e ri-confermo l&apos;adesione vincolante a queste regole ferree per la sessione attuale.
                </span>
              </label>

              {checked && (
                <div className="flex items-center gap-1.5 text-[11px] text-[#2F6B4F] mt-1.5 font-medium pl-6">
                  <CheckCircle2 size={13} className="text-[#2F6B4F]" />
                  <span>Presa d&apos;atto registrata in complianceLogs</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
