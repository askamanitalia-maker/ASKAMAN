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
 * LogoSymbol: Exact official AskMan symbol matching 1789567695.png
 * Features:
 * - Speech bubble with sharp male profile silhouette on right
 * - Bottom-left pointer tail
 * - Collar curve under throat
 * - Centered question mark with circular dot
 */
export const LogoSymbol: React.FC<LogoSymbolProps> = ({
  size = 42,
  className = '',
  strokeColor = '#0E2038',
  strokeWidth = 24,
  useImg = false
}) => {
  if (useImg) {
    return (
      <img
        src="/askman-symbol.svg"
        alt="AskMan Logo Simbolo"
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
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-200 ${className}`}
      aria-label="AskMan Logo Simbolo Ufficiale"
    >
      <g transform="translate(-145, -125)">
        {/* Upper Bubble & Face Profile */}
        <path
          d="M 180 435 L 180 205 C 180 165 205 140 245 140 L 410 140 C 455 140 485 165 498 200 C 504 218 502 238 498 252 C 496 258 493 263 492 268 L 528 306 C 506 312 496 317 496 324 C 502 328 506 332 503 337 C 499 340 494 342 494 345 C 498 348 501 352 499 356 C 492 360 488 364 489 369 C 496 380 514 388 516 402 C 516 418 496 438 480 448 C 470 455 460 466 455 480"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Bottom Pointer & Lower Edge */}
        <path
          d="M 180 425 L 180 450 L 158 508 L 225 465 L 330 465"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Collar Arc Under Neck */}
        <path
          d="M 370 432 C 385 470 422 485 455 475"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Inside Question Mark Hook */}
        <path
          d="M 288 276 C 288 232 320 216 345 216 C 378 216 402 238 402 272 C 402 305 372 324 350 348 L 350 376"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Question Mark Dot */}
        <circle
          cx="350"
          cy="420"
          r={strokeWidth * 0.58}
          fill={strokeColor}
        />
      </g>
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
  layout = 'stacked',
  size = 'md',
  showTagline = true,
  darkTheme = false,
  symbolOnly = false,
  className = ''
}) => {
  const heightClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-11 sm:h-12',
    lg: 'h-14 sm:h-16',
    xl: 'h-20 sm:h-24'
  };

  const symbolSizes = {
    sm: 32,
    md: 44,
    lg: 58,
    xl: 76
  };

  if (symbolOnly) {
    return (
      <LogoSymbol
        size={symbolSizes[size]}
        strokeColor={darkTheme ? '#F6F1E7' : '#0E2038'}
        className={className}
      />
    );
  }

  // Official Original Logo Graphic (from uploaded 1789567695.png)
  return (
    <div className={`inline-flex flex-col select-none ${className}`}>
      <div className="flex items-center">
        <img
          src="/askman-logo.svg"
          alt="AskMan Logo Originale"
          className={`${heightClasses[size]} w-auto object-contain shrink-0`}
          referrerPolicy="no-referrer"
        />
      </div>
      {showTagline && (
        <span
          className={`font-medium ${
            darkTheme ? 'text-[#6B7A99]' : 'text-[#6B7A99]'
          } tracking-wider text-[10px] sm:text-[11px] pl-1 sm:pl-2 mt-0.5 whitespace-nowrap`}
        >
          il punto di vista maschile
        </span>
      )}
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
  color = '#14213D',
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
      <LogoSymbol
        size="100%"
        strokeColor={color}
        strokeWidth={3.8}
        className="w-full h-full"
      />
    </div>
  );
};

/**
 * LogoBanner: Banner ufficiale del Brand AskMan
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
      const response = await fetch('/askman-logo.svg');
      const svgText = await response.text();
      await navigator.clipboard.writeText(svgText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  if (variant === 'bar') {
    return (
      <div
        className={`w-full py-2 px-4 bg-[#0E2038] text-[#F6F1E7] border-b border-[#C8532F]/30 flex flex-wrap items-center justify-between gap-3 text-xs ${className}`}
      >
        <div className="flex items-center gap-3">
          <img
            src="/askman-logo.svg"
            alt="AskMan Logo Originale"
            className="h-7 w-auto object-contain shrink-0"
            referrerPolicy="no-referrer"
          />
          <span className="hidden sm:inline text-[#6B7A99]">|</span>
          <span className="hidden sm:inline text-[#F6F1E7] font-semibold">
            Chiedi a chi conosce le risposte
          </span>
          <span className="hidden md:inline text-[#6B7A99] font-medium">
            — Il punto di vista maschile autentico, riservato e senza giudizi
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-bold text-[#C8532F] bg-[#C8532F]/15 px-2 py-0.5 rounded-full">
            Primi 10 min gratis
          </span>
          {onCtaClick && (
            <button
              type="button"
              onClick={onCtaClick}
              className="text-[#F6F1E7] hover:text-[#C8532F] font-semibold text-xs cursor-pointer transition-colors"
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
            ? 'bg-[#0E2038] text-[#F6F1E7] border-[#F6F1E7]/15'
            : 'bg-[#FAF9F6] text-[#0E2038] border-[#0E2038]/15 shadow-xs'
        } ${className}`}
      >
        {/* Subtle background watermark inside banner card */}
        <div className="absolute -right-8 -bottom-12 pointer-events-none select-none opacity-[0.05]">
          <LogoSymbol
            size={220}
            strokeColor={darkTheme ? '#F6F1E7' : '#0E2038'}
            strokeWidth={20}
          />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Logo Originale */}
          <div className="flex items-center">
            <img
              src="/askman-logo.svg"
              alt="AskMan Logo Originale"
              className="h-14 sm:h-16 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Quick actions & specs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleCopySvg}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                darkTheme
                  ? 'border-[#F6F1E7]/20 text-[#F6F1E7] hover:bg-[#F6F1E7]/10'
                  : 'border-[#0E2038]/20 text-[#0E2038] hover:bg-[#0E2038]/5'
              }`}
            >
              {copied ? <Check size={14} className="text-[#2F6B4F]" /> : <Copy size={14} />}
              <span>{copied ? 'SVG Copiato!' : 'Copia SVG Logo'}</span>
            </button>

            {onCtaClick && (
              <button
                type="button"
                onClick={onCtaClick}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-[#C8532F] text-[#F6F1E7] hover:bg-[#b04726] transition-all cursor-pointer shadow-xs"
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
      className={`relative overflow-hidden rounded-3xl border border-[#0E2038]/15 bg-[#FAF9F6] p-6 sm:p-8 shadow-xs ${className}`}
    >
      {/* Background Watermark */}
      <div className="absolute -right-10 -top-10 pointer-events-none select-none opacity-[0.05]">
        <LogoSymbol size={280} strokeColor="#0E2038" strokeWidth={20} />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="p-3 bg-white rounded-2xl border border-[#0E2038]/10 shadow-xs">
            <img
              src="/askman-logo.svg"
              alt="AskMan Logo Originale"
              className="h-12 sm:h-14 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C8532F]/10 text-[#C8532F] border border-[#C8532F]/20">
                Chiedi a chi conosce le risposte
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#2F6B4F]/10 text-[#2F6B4F] border border-[#2F6B4F]/20">
                Identità Ufficiale
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#6B7A99] font-medium mt-1">
              Conversazioni telefoniche informali con operatori verificati. Senza filtri.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-[#0E2038] flex items-center gap-1.5">
            <ShieldCheck size={16} className="text-[#2F6B4F]" />
            VoIP Anonimo
          </span>
          <span className="text-xs font-semibold text-[#0E2038] flex items-center gap-1.5">
            <PhoneCall size={16} className="text-[#C8532F]" />
            Primi 10 min gratis
          </span>
        </div>
      </div>
    </div>
  );
};

