import React from 'react';
import { Check } from 'lucide-react';

interface VerificationBadgeProps {
  label?: string;
  className?: string;
  size?: 'sm' | 'md';
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  label = 'Verificato',
  className = '',
  size = 'md'
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';
  const iconSize = size === 'sm' ? 11 : 13;

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold rounded-full bg-[#2F6B4F] text-[#F6F1E7] select-none shadow-xs ${sizeClasses} ${className}`}
      title="Identità e idoneità verificate da AskAMan"
    >
      <Check size={iconSize} strokeWidth={2.8} className="text-[#F6F1E7]" />
      <span>{label}</span>
    </span>
  );
};
