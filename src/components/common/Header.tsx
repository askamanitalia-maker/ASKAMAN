import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { CtaButton } from './CtaButton';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  UserCheck,
  Shield,
  Award,
  Menu,
  X,
  Users,
  CreditCard,
  HelpCircle,
  LayoutDashboard,
  ShieldAlert,
  Sparkles,
  PhoneCall,
  HeartHandshake
} from 'lucide-react';
import { UserRole } from '../../types';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const { currentUser, currentRole, setCurrentRole, setIsStripeModalOpen } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile drawer when pressing ESC or on route navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when mobile drawer is open to prevent awkward background shifts
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNav = (path: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F6F1E7]/95 backdrop-blur-md border-b border-[#14213D]/10">
        {/* Top micro-bar: Compliance reminder and test role switch */}
        <div className="bg-[#14213D] text-[#F6F1E7] text-[11px] py-1.5 px-3 sm:px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[#F6F1E7]/80 min-w-0">
              <Shield size={12} className="text-[#E07A5F] shrink-0" />
              <span className="hidden md:inline truncate">
                Nessun numero scambiato. Chiamate vocali riservate con numeri mascherati e zero registrazioni.
              </span>
              <span className="md:hidden truncate text-[10px]">
                Numeri mascherati e zero registrazioni
              </span>
            </div>

            {/* Quick interactive role switch for reviewers */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[#6B7A99] hidden lg:inline text-[10px]">Visualizza:</span>
              <div className="inline-flex rounded-md bg-[#F6F1E7]/10 p-0.5">
                {(
                  [
                    { role: 'user', label: 'Cliente' },
                    { role: 'operator', label: 'Operatore' },
                    { role: 'admin', label: 'Admin' }
                  ] as { role: UserRole; label: string }[]
                ).map(item => (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => {
                      setCurrentRole(item.role);
                      if (item.role === 'operator') onNavigate('/operator-dashboard');
                      else if (item.role === 'admin') onNavigate('/admin');
                      else onNavigate('/dashboard');
                    }}
                    className={`px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-medium rounded transition-all cursor-pointer whitespace-nowrap ${
                      currentRole === item.role
                        ? 'bg-[#E07A5F] text-[#F6F1E7] font-bold shadow-xs'
                        : 'text-[#F6F1E7]/70 hover:text-[#F6F1E7]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main navigation header */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo (Shrink resistant and responsive size) */}
          <div
            onClick={() => handleNav('/')}
            className="cursor-pointer transition-opacity hover:opacity-95 shrink-0"
          >
            <Logo size="md" className="hidden sm:inline-flex" />
            <Logo size="sm" className="sm:hidden" />
          </div>

          {/* Center Nav Links - Visible on Desktop (lg and up) to guarantee zero overlapping on tablets/desktops */}
          <nav className="hidden lg:flex items-center space-x-5 xl:space-x-8 shrink-0">
            <button
              type="button"
              onClick={() => handleNav('/operators')}
              className={`text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                currentPath === '/operators' ? 'text-[#E07A5F] font-bold' : 'text-[#14213D] hover:text-[#E07A5F]'
              }`}
            >
              Operatori
            </button>
            <button
              type="button"
              onClick={() => handleNav('/pricing')}
              className={`text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                currentPath === '/pricing' ? 'text-[#E07A5F] font-bold' : 'text-[#14213D] hover:text-[#E07A5F]'
              }`}
            >
              Tariffe
            </button>
            <button
              type="button"
              onClick={() => handleNav('/faq')}
              className={`text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                currentPath === '/faq' ? 'text-[#E07A5F] font-bold' : 'text-[#14213D] hover:text-[#E07A5F]'
              }`}
            >
              FAQ
            </button>
            {currentRole === 'operator' && (
              <button
                type="button"
                onClick={() => handleNav('/operator-dashboard')}
                className={`text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  currentPath === '/operator-dashboard' ? 'text-[#E07A5F] font-bold' : 'text-[#14213D] hover:text-[#E07A5F]'
                }`}
              >
                Dashboard Operatore
              </button>
            )}
            {currentRole === 'admin' && (
              <button
                type="button"
                onClick={() => handleNav('/admin')}
                className={`text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  currentPath === '/admin' ? 'text-[#E07A5F] font-bold' : 'text-[#14213D] hover:text-[#E07A5F]'
                }`}
              >
                Pannello Admin
              </button>
            )}
          </nav>

          {/* Right side controls: 5+5" button + Credits + Quick Profile + Mobile Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 lg:gap-3 shrink-0">
            {/* Tasto 5+5'' free per testare live due operatori */}
            <button
              type="button"
              onClick={() => handleNav('/pricing')}
              className="group relative inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-gradient-to-r from-[#E07A5F] via-[#C8532F] to-[#E07A5F] bg-[length:200%_auto] hover:bg-right transition-all duration-300 text-[#F6F1E7] text-[11px] sm:text-xs font-extrabold shadow-xs hover:shadow-md cursor-pointer shrink-0 whitespace-nowrap"
              title="5+5'' free per testare live due operatori"
            >
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F6F1E7] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F6F1E7]"></span>
              </span>
              <span className="tracking-tight">5+5&apos;&apos; Free</span>
              <span className="hidden xl:inline text-[10px] font-semibold bg-[#14213D]/25 px-1.5 py-0.5 rounded-full">
                Testa 2 operatori
              </span>
            </button>

            {/* Saldo Chiamate badge for user role */}
            {currentRole === 'user' && currentUser && (
              <div
                onClick={() => setIsStripeModalOpen(true)}
                className="cursor-pointer bg-[#14213D]/5 hover:bg-[#14213D]/10 border border-[#14213D]/15 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 flex items-center gap-1.5 sm:gap-2 transition-all shrink-0"
                title="Clicca per acquistare o gestire minuti"
              >
                <Clock size={15} className="text-[#E07A5F] shrink-0" />
                <div className="flex flex-col text-left leading-tight">
                  <span className="hidden md:inline text-[9px] font-semibold text-[#6B7A99] uppercase">
                    Saldo
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold text-[#14213D] whitespace-nowrap">
                    {currentUser.creditsMinutes} min{' '}
                    {!currentUser.hasUsedFreeTrial && (
                      <span className="text-[#2F6B4F] font-bold text-[9px] sm:text-[10px] hidden sm:inline">(Gratis)</span>
                    )}
                  </span>
                </div>
              </div>
            )}

            {/* Founder badge chip: only visible on very wide displays to protect tablet & standard desktop spacing */}
            {currentRole === 'user' && currentUser?.isFounder && (
              <div className="hidden 2xl:flex items-center gap-1 bg-[#2F6B4F]/10 text-[#2F6B4F] border border-[#2F6B4F]/30 px-2 py-1 rounded text-[11px] font-semibold shrink-0 whitespace-nowrap">
                <Award size={13} />
                <span>Founder €1/min</span>
              </div>
            )}

            {/* Ricarica Minuti primary button: visible on large desktop (xl+) */}
            {currentRole === 'user' && (
              <CtaButton
                size="sm"
                onClick={() => setIsStripeModalOpen(true)}
                className="hidden xl:inline-flex shrink-0 whitespace-nowrap text-xs"
              >
                Ricarica Minuti
              </CtaButton>
            )}

            {/* Operator dashboard button shortcut on tablet/desktop */}
            {currentRole === 'operator' && (
              <div className="hidden sm:flex items-center shrink-0">
                <CtaButton
                  size="sm"
                  variant="outline"
                  onClick={() => handleNav('/operator-dashboard')}
                  className="text-xs whitespace-nowrap"
                >
                  Dashboard Op.
                </CtaButton>
              </div>
            )}

            {/* Admin shortcut button on tablet/desktop */}
            {currentRole === 'admin' && (
              <div className="hidden sm:flex items-center shrink-0">
                <CtaButton
                  size="sm"
                  variant="secondary"
                  onClick={() => handleNav('/admin')}
                  className="text-xs whitespace-nowrap"
                >
                  Admin
                </CtaButton>
              </div>
            )}

            {/* Quick Profile / Dashboard icon */}
            <button
              type="button"
              onClick={() => handleNav('/dashboard')}
              className="text-xs font-semibold text-[#14213D] hover:text-[#E07A5F] p-1.5 sm:p-2 rounded-md hover:bg-[#14213D]/5 transition-colors cursor-pointer shrink-0"
              title="Area Personale e Profilo"
              aria-label="Area Personale"
            >
              <UserCheck size={18} />
            </button>

            {/* Hamburger button for Mobile & Tablet (< lg) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#14213D] hover:text-[#E07A5F] hover:bg-[#14213D]/5 transition-colors cursor-pointer shrink-0"
              aria-label={isMobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE & TABLET SLIDE-OUT DRAWER (< lg) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Dimmed backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="relative ml-auto w-[85%] max-w-sm bg-[#F6F1E7] h-full shadow-2xl flex flex-col justify-between p-6 z-10 overflow-y-auto">
            <div className="space-y-6">
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between border-b border-[#14213D]/10 pb-4">
                <div onClick={() => handleNav('/')} className="cursor-pointer">
                  <Logo size="sm" />
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-[#14213D] hover:bg-[#14213D]/5 transition-colors cursor-pointer"
                  aria-label="Chiudi menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Promo Banner in Drawer */}
              <div
                onClick={() => handleNav('/pricing')}
                className="bg-gradient-to-br from-[#14213D] to-[#1F2E4D] text-[#F6F1E7] p-3.5 rounded-xl cursor-pointer shadow-xs hover:border-[#E07A5F] transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E07A5F] flex items-center gap-1">
                    <Sparkles size={11} /> Prova Senza Impegno
                  </span>
                  <span className="text-[10px] bg-[#E07A5F] text-[#F6F1E7] px-1.5 py-0.5 rounded font-bold">
                    Gratis
                  </span>
                </div>
                <p className="text-xs font-bold">5+5&apos;&apos; Free per testare due operatori</p>
                <p className="text-[11px] text-[#F6F1E7]/70 mt-0.5">
                  Chiama live 2 diversi operatori per 5 minuti ciascuno a costo zero.
                </p>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7A99] px-3 block mb-2">
                  Navigazione Principale
                </span>

                <button
                  type="button"
                  onClick={() => handleNav('/operators')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    currentPath === '/operators'
                      ? 'bg-[#E07A5F] text-[#F6F1E7]'
                      : 'text-[#14213D] hover:bg-[#14213D]/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users size={18} className={currentPath === '/operators' ? 'text-[#F6F1E7]' : 'text-[#E07A5F]'} />
                    <span>Operatori</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    currentPath === '/operators' ? 'bg-[#F6F1E7]/20 text-[#F6F1E7]' : 'bg-[#14213D]/10 text-[#14213D]'
                  }`}>
                    10 Slot
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNav('/pricing')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    currentPath === '/pricing'
                      ? 'bg-[#E07A5F] text-[#F6F1E7]'
                      : 'text-[#14213D] hover:bg-[#14213D]/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <CreditCard size={18} className={currentPath === '/pricing' ? 'text-[#F6F1E7]' : 'text-[#E07A5F]'} />
                    <span>Tariffe & Minuti</span>
                  </div>
                  <span className="text-[10px] text-[#2F6B4F] font-bold">
                    Trasparenza etica
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNav('/faq')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    currentPath === '/faq'
                      ? 'bg-[#E07A5F] text-[#F6F1E7]'
                      : 'text-[#14213D] hover:bg-[#14213D]/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <HelpCircle size={18} className={currentPath === '/faq' ? 'text-[#F6F1E7]' : 'text-[#E07A5F]'} />
                    <span>Domande Frequenti (FAQ)</span>
                  </div>
                </button>

                {currentRole === 'operator' && (
                  <button
                    type="button"
                    onClick={() => handleNav('/operator-dashboard')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      currentPath === '/operator-dashboard'
                        ? 'bg-[#E07A5F] text-[#F6F1E7]'
                        : 'text-[#14213D] hover:bg-[#14213D]/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <LayoutDashboard size={18} className={currentPath === '/operator-dashboard' ? 'text-[#F6F1E7]' : 'text-[#E07A5F]'} />
                      <span>Dashboard Operatore</span>
                    </div>
                  </button>
                )}

                {currentRole === 'admin' && (
                  <button
                    type="button"
                    onClick={() => handleNav('/admin')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      currentPath === '/admin'
                        ? 'bg-[#E07A5F] text-[#F6F1E7]'
                        : 'text-[#14213D] hover:bg-[#14213D]/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldAlert size={18} className={currentPath === '/admin' ? 'text-[#F6F1E7]' : 'text-[#E07A5F]'} />
                      <span>Pannello Admin</span>
                    </div>
                  </button>
                )}
              </div>

              {/* User Area & Credits Section */}
              <div className="pt-2 border-t border-[#14213D]/10 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7A99] px-3 block">
                  Area Utente & Saldo
                </span>

                <div className="bg-white/90 border border-[#14213D]/10 rounded-xl p-3.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#6B7A99] uppercase font-semibold block">
                        Saldo Chiamate
                      </span>
                      <span className="text-base font-extrabold text-[#14213D]">
                        {currentUser?.creditsMinutes || 0} minuti
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsStripeModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#E07A5F] text-[#F6F1E7] text-xs font-bold hover:bg-[#cf6d52] transition-colors cursor-pointer shadow-xs"
                    >
                      Ricarica
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleNav('/dashboard')}
                    className="w-full text-center text-xs font-semibold text-[#14213D] hover:text-[#E07A5F] py-1 border-t border-[#14213D]/10 flex items-center justify-center gap-1 cursor-pointer pt-2"
                  >
                    <UserCheck size={14} />
                    <span>Vai al tuo profilo e storico chiamate</span>
                  </button>
                </div>
              </div>

              {/* Switch Role Previewer in Drawer for easy testing on tablet/phone */}
              <div className="space-y-2 pt-2 border-t border-[#14213D]/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7A99] px-3 block">
                  Modalità Demo Ruolo
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {(
                    [
                      { role: 'user', label: 'Cliente' },
                      { role: 'operator', label: 'Operatore' },
                      { role: 'admin', label: 'Admin' }
                    ] as { role: UserRole; label: string }[]
                  ).map(item => (
                    <button
                      key={item.role}
                      type="button"
                      onClick={() => {
                        setCurrentRole(item.role);
                        if (item.role === 'operator') handleNav('/operator-dashboard');
                        else if (item.role === 'admin') handleNav('/admin');
                        else handleNav('/dashboard');
                      }}
                      className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer text-center ${
                        currentRole === item.role
                          ? 'bg-[#14213D] text-[#F6F1E7]'
                          : 'bg-[#14213D]/5 text-[#14213D] hover:bg-[#14213D]/10'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Bottom Support Info */}
            <div className="pt-6 border-t border-[#14213D]/10 space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#6B7A99]">
                <HeartHandshake size={14} className="text-[#E07A5F] shrink-0" />
                <span>Supporto Nazionale Antiviolenza:</span>
              </div>
              <p className="text-xs font-mono font-bold text-[#14213D]">
                Chiama il 1522 (Gratuito 24/7)
              </p>
              <p className="text-[10px] text-[#6B7A99] pt-1">
                Ask A Man • Centralino vocale VoIP anonimo
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
