import React from 'react';
import { Logo } from './Logo';
import { CtaButton } from './CtaButton';
import { useApp } from '../../context/AppContext';
import { Phone, Clock, UserCheck, Shield, ChevronDown, Award } from 'lucide-react';
import { UserRole } from '../../types';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const { currentUser, currentRole, setCurrentRole, setIsStripeModalOpen } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-[#F6F1E7]/95 backdrop-blur-md border-b border-[#14213D]/10">
      {/* Top micro-bar: Safe role selector for demo & compliance reminder */}
      <div className="bg-[#14213D] text-[#F6F1E7] text-[11px] py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-[#F6F1E7]/80">
            <Shield size={12} className="text-[#E07A5F]" />
            <span>Nessun numero scambiato. Chiamate vocali riservate con numeri mascherati e zero registrazioni.</span>
          </div>

          {/* Quick interactive role switch for the app reviewer/tester */}
          <div className="flex items-center gap-2">
            <span className="text-[#6B7A99] hidden sm:inline">Visualizza come:</span>
            <div className="inline-flex rounded-md bg-[#F6F1E7]/10 p-0.5">
              {(
                [
                  { role: 'user', label: 'Cliente Donna' },
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
                  className={`px-2 py-0.5 text-[10px] font-medium rounded transition-all cursor-pointer ${
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => onNavigate('/')}
          className="cursor-pointer transition-opacity hover:opacity-95"
        >
          <Logo size="md" showTagline={true} />
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center space-x-6">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className={`text-sm font-semibold transition-colors cursor-pointer ${
              currentPath === '/' ? 'text-[#E07A5F]' : 'text-[#14213D] hover:text-[#E07A5F]'
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/operators')}
            className={`text-sm font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              currentPath === '/operators' ? 'text-[#E07A5F]' : 'text-[#14213D] hover:text-[#E07A5F]'
            }`}
          >
            <span>Operatori</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-[#14213D] text-[#F6F1E7] rounded font-bold">
              10 slot
            </span>
          </button>
          {currentRole === 'user' && (
            <button
              type="button"
              onClick={() => onNavigate('/dashboard')}
              className={`text-sm font-semibold transition-colors cursor-pointer ${
                currentPath === '/dashboard' ? 'text-[#E07A5F]' : 'text-[#14213D] hover:text-[#E07A5F]'
              }`}
            >
              Mia Area & Crediti
            </button>
          )}
          {currentRole === 'operator' && (
            <button
              type="button"
              onClick={() => onNavigate('/operator-dashboard')}
              className={`text-sm font-semibold transition-colors cursor-pointer ${
                currentPath === '/operator-dashboard' ? 'text-[#E07A5F]' : 'text-[#14213D] hover:text-[#E07A5F]'
              }`}
            >
              Dashboard Operatore
            </button>
          )}
          {currentRole === 'admin' && (
            <button
              type="button"
              onClick={() => onNavigate('/admin')}
              className={`text-sm font-semibold transition-colors cursor-pointer ${
                currentPath === '/admin' ? 'text-[#E07A5F]' : 'text-[#14213D] hover:text-[#E07A5F]'
              }`}
            >
              Pannello Admin
            </button>
          )}
        </nav>

        {/* Right side controls: Credits indicator + CTA */}
        <div className="flex items-center space-x-3">
          {currentRole === 'user' && (
            <div className="flex items-center gap-2">
              {/* Credits badge */}
              <div
                onClick={() => setIsStripeModalOpen(true)}
                className="cursor-pointer bg-[#14213D]/5 hover:bg-[#14213D]/10 border border-[#14213D]/15 rounded-lg px-3 py-1.5 flex items-center gap-2 transition-all"
                title="Clicca per acquistare o gestire minuti"
              >
                <Clock size={15} className="text-[#E07A5F]" />
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[10px] font-semibold text-[#6B7A99] uppercase">
                    Saldo Chiamate
                  </span>
                  <span className="text-xs font-bold text-[#14213D]">
                    {currentUser.creditsMinutes} min{' '}
                    {!currentUser.hasUsedFreeTrial && (
                      <span className="text-[#2F6B4F] font-bold text-[10px] ml-0.5">(Gratis)</span>
                    )}
                  </span>
                </div>
              </div>

              {/* Founder badge chip */}
              {currentUser.isFounder && (
                <div className="hidden lg:flex items-center gap-1 bg-[#2F6B4F]/10 text-[#2F6B4F] border border-[#2F6B4F]/30 px-2 py-1 rounded text-[11px] font-semibold">
                  <Award size={13} />
                  <span>Founder €1/min</span>
                </div>
              )}

              <CtaButton
                size="sm"
                onClick={() => setIsStripeModalOpen(true)}
                className="hidden sm:inline-flex"
              >
                Ricarica Minuti
              </CtaButton>
            </div>
          )}

          {currentRole === 'operator' && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[#6B7A99] hidden sm:inline">
                {currentUser?.name ? currentUser.name.replace(' (Operatore)', '') : 'Op. Stefano M.'}
              </span>
              <CtaButton
                size="sm"
                variant="outline"
                onClick={() => onNavigate('/operator-dashboard')}
              >
                Dashboard
              </CtaButton>
            </div>
          )}

          {currentRole === 'admin' && (
            <CtaButton
              size="sm"
              variant="secondary"
              onClick={() => onNavigate('/admin')}
            >
              Gestione Admin
            </CtaButton>
          )}

          {/* Quick Login / Change role button */}
          <button
            type="button"
            onClick={() => onNavigate('/login')}
            className="text-xs font-semibold text-[#14213D] hover:text-[#E07A5F] p-2 rounded-md hover:bg-[#14213D]/5 transition-colors cursor-pointer"
            title="Accedi con OTP"
          >
            <UserCheck size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
