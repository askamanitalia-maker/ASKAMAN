import React from 'react';

interface CtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const CtaButton: React.FC<CtaButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-[8px] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-center whitespace-nowrap active:scale-[0.98] shadow-sm';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base font-bold'
  };

  // Rule: Primary CTA terracotta pieno, testo carta, radius 8px
  const variantStyles = {
    primary: 'bg-[#E07A5F] text-[#F6F1E7] hover:bg-[#cf6d52] shadow-[#E07A5F]/20',
    secondary: 'bg-[#14213D] text-[#F6F1E7] hover:bg-[#1e2f52] shadow-[#14213D]/20',
    outline: 'bg-transparent border border-[#14213D] text-[#14213D] hover:bg-[#14213D] hover:text-[#F6F1E7]'
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
