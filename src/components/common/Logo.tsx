import React, { useState } from 'react';
import { ShieldCheck, PhoneCall, Copy, Check } from 'lucide-react';

interface LogoSymbolProps {
  size?: number | string;
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  useImg?: boolean;
}

/**
 * LogoSymbol: Exact official Ask A Man symbol matching the uploaded logo
 * Features:
 * - Speech bubble with sharp male profile silhouette on right
 * - Bottom pointer tail
 * - Centered question mark with circular dot
 */
export const LogoSymbol: React.FC<LogoSymbolProps> = ({
  size = 42,
  className = '',
  useImg = true
}) => {
  if (useImg) {
    return (
      <img
        src="/logo-askman.svg"
        alt="Ask A Man Logo Simbolo"
        style={{
          width: typeof size === 'number' ? `${size}px` : size,
          height: typeof size === 'number' ? `${size}px` : size
        }}
        className={`shrink-0 object-contain select-none ${className}`}
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-200 ${className}`}
      aria-label="Ask A Man Logo Simbolo Ufficiale"
    >
      {/* Main Speech Bubble with Integrated Profile Silhouette */}
      <path
        d="M 120 50 C 80 50 50 80 50 120 L 50 340 C 50 380 80 410 120 410 L 235 410 L 200 480 L 295 410 L 330 410 C 365 405 380 378 385 348 C 390 338 402 332 418 324 C 432 316 432 305 425 296 C 416 290 410 284 410 277 C 418 271 426 265 426 257 C 420 251 410 247 410 241 C 420 235 440 227 448 217 C 453 211 449 204 440 201 L 408 178 C 403 167 407 151 413 137 C 418 115 398 78 365 60 C 340 48 310 48 280 50 Z"
        fill="#0D131F"
      />
      {/* Inner Speech Bubble White Area */}
      <path
        d="M 120 86 C 96 86 86 96 86 120 L 86 340 C 86 364 96 374 120 374 L 308 374 C 332 374 342 364 342 340 L 342 120 C 342 96 332 86 308 86 Z"
        fill="#FFFFFF"
      />
      {/* Question Mark */}
      <path
        d="M 166 174 C 166 130 194 104 232 104 C 270 104 298 130 298 168 C 298 198 272 220 250 242 L 250 268 L 214 268 L 214 234 C 236 212 262 196 262 168 C 262 146 248 133 232 133 C 216 133 202 146 202 168 Z"
        fill="#0D131F"
      />
      <circle cx="232" cy="316" r="20" fill="#0D131F" />
    </svg>
  );
};

export interface LogoProps {
  layout?: 'inline' | 'stacked';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  darkTheme?: boolean;
  symbolOnly?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = true,
  darkTheme = false,
  symbolOnly = false,
  className = ''
}) => {
  const iconDimensions = {
    sm: { h: 'h-8 sm:h-9', px: 36, text: 'text-lg sm:text-xl', tag: 'text-[9px] sm:text-[10px]' },
    md: { h: 'h-10 sm:h-12', px: 46, text: 'text-xl sm:text-2xl', tag: 'text-[10px] sm:text-[11px]' },
    lg: { h: 'h-13 sm:h-15', px: 58, text: 'text-2xl sm:text-3xl', tag: 'text-[12px] sm:text-[13px]' },
    xl: { h: 'h-18 sm:h-20', px: 76, text: 'text-3xl sm:text-4xl', tag: 'text-[14px] sm:text-[15px]' }
  };

  const current = iconDimensions[size];

  if (symbolOnly) {
    return (
      <LogoSymbol
        size={current.px}
        className={className}
      />
    );
  }

  // Official Brand Lockup with exact attached logo and explicit central 'A'
  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Official Symbol from user attachment */}
      <img
        src="/logo-askman.svg"
        alt="Ask A Man Logo"
        className={`${current.h} w-auto object-contain shrink-0`}
        referrerPolicy="no-referrer"
      />

      {/* Brand Typography: Ask A Man */}
      <div className="flex flex-col justify-center leading-none">
        <div className={`font-black tracking-tight ${current.text} flex items-baseline font-['Plus_Jakarta_Sans',sans-serif]`}>
          <span className={darkTheme ? 'text-[#F6F1E7]' : 'text-[#0D131F]'}>Ask</span>
          <span className={`mx-1 ${darkTheme ? 'text-[#F6F1E7]' : 'text-[#0D131F]'}`}>A</span>
          <span className="text-[#E07A5F]">Man</span>
        </div>
        {showTagline && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-3.5 h-[2px] rounded-full bg-[#E07A5F] shrink-0" />
            <span className={`${current.tag} font-semibold tracking-tight ${darkTheme ? 'text-[#F6F1E7]/70' : 'text-[#0D131F]/70'}`}>
              il punto di vista maschile
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * LogoWatermark: Filigrana per sfondi di sezioni ed hero
 * Non invasiva, geometrica, elegante con opacità regolabile (default 5-8%)
 */
interface LogoWatermarkProps {
  size?: number | string;
  opacity?: number;
  color?: string;
  className?: string;
  rotation?: number;
}

export const LogoWatermark: React.FC<LogoWatermarkProps> = ({
  size = 520,
  opacity = 0.05,
  className = '',
  rotation = 0
}) => {
  return (
    <div
      aria-hidden="true"
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
        opacity,
        transform: `rotate(${rotation}deg)`
      }}
      className={`pointer-events-none select-none overflow-hidden shrink-0 transition-opacity duration-300 ${className}`}
    >
      <img
        src="/logo-askman.svg"
        alt=""
        className="w-full h-full object-contain"
      />
    </div>
  );
};

/**
 * LogoBanner: Banner ufficiale del Brand Ask A Man
 * Progettato per banner promozionali, testate, e card social/stampa
 */
interface LogoBannerProps {
  variant?: 'hero' | 'bar' | 'card' | 'compact';
  darkTheme?: boolean;
  className?: string;
  onCtaClick?: () => void;
}

export const LogoBanner: React.FC<LogoBannerProps> = ({
  variant = 'hero',
  darkTheme = false,
  className = '',
  onCtaClick
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopySvg = async () => {
    try {
      const response = await fetch('/logo-askman.svg');
      const svgText = await response.text();
      await navigator.clipboard.writeText(svgText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  if (variant === 'bar') {
    return (
      <div
        className={`w-full py-2 px-4 bg-[#0D131F] text-[#F6F1E7] border-b border-[#E07A5F]/30 flex flex-wrap items-center justify-between gap-3 text-xs ${className}`}
      >
        <div className="flex items-center gap-3">
          <Logo size="sm" darkTheme showTagline={false} />
          <span className="hidden sm:inline text-[#6B7A99]">|</span>
          <span className="hidden sm:inline text-[#F6F1E7] font-semibold">
            Prova a chiederlo a un altro
          </span>
          <span className="hidden md:inline text-[#6B7A99] font-medium">
            — Conversazioni riservate, autentiche e senza giudizi
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-bold text-[#E07A5F] bg-[#E07A5F]/15 px-2 py-0.5 rounded-full">
            Primi 10 min gratis
          </span>
          {onCtaClick && (
            <button
              type="button"
              onClick={onCtaClick}
              className="text-[#F6F1E7] hover:text-[#E07A5F] font-semibold text-xs cursor-pointer transition-colors"
            >
              Scopri gli operatori →
            </button>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl border p-6 sm:p-8 transition-all ${
          darkTheme
            ? 'bg-[#0D131F] text-[#F6F1E7] border-[#F6F1E7]/15'
            : 'bg-[#FAF9F6] text-[#0D131F] border-[#0D131F]/15 shadow-xs'
        } ${className}`}
      >
        {/* Subtle background watermark inside banner card */}
        <div className="absolute -right-8 -bottom-12 pointer-events-none select-none opacity-[0.05]">
          <LogoSymbol size={220} />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Logo size="lg" darkTheme={darkTheme} />

          {/* Quick actions & specs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleCopySvg}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                darkTheme
                  ? 'border-[#F6F1E7]/20 text-[#F6F1E7] hover:bg-[#F6F1E7]/10'
                  : 'border-[#0D131F]/20 text-[#0D131F] hover:bg-[#0D131F]/5'
              }`}
            >
              {copied ? <Check size={14} className="text-[#2F6B4F]" /> : <Copy size={14} />}
              <span>{copied ? 'SVG Copiato!' : 'Copia SVG Logo'}</span>
            </button>

            {onCtaClick && (
              <button
                type="button"
                onClick={onCtaClick}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-[#E07A5F] text-[#F6F1E7] hover:bg-[#b04726] transition-all cursor-pointer shadow-xs"
              >
                Esplora Operatori
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT HERO BANNER
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-[#0D131F]/15 bg-[#FAF9F6] p-6 sm:p-8 shadow-xs ${className}`}
    >
      {/* Background Watermark */}
      <div className="absolute -right-10 -top-10 pointer-events-none select-none opacity-[0.05]">
        <LogoSymbol size={280} />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="p-2.5 bg-white rounded-2xl border border-[#0D131F]/10 shadow-xs">
            <Logo size="md" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E07A5F]/10 text-[#E07A5F] border border-[#E07A5F]/20">
                Prova a chiederlo a un altro
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#6B7A99] font-medium mt-1">
              Conversazioni telefoniche informali con operatori verificati. Senza filtri.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-[#0D131F] flex items-center gap-1.5">
            <ShieldCheck size={16} className="text-[#2F6B4F]" />
            VoIP Anonimo
          </span>
          <span className="text-xs font-semibold text-[#0D131F] flex items-center gap-1.5">
            <PhoneCall size={16} className="text-[#E07A5F]" />
            Primi 10 min gratis
          </span>
        </div>
      </div>
    </div>
  );
};
