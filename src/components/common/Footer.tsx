import React from 'react';
import { Logo } from './Logo';
import { ShieldCheck, PhoneCall, HeartHandshake, AlertCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const LEGAL_DISCLAIMER = "AskAMan offre un servizio di conversazione e intrattenimento informale. Gli operatori non sono psicologi, terapeuti o medici. Le opinioni espresse sono personali e non costituiscono parere professionale. È vietato lo scambio di contatti personali e ogni incontro fisico. In caso di crisi o violenza contatta il 1522 o il tuo medico.";

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#14213D] text-[#F6F1E7] pt-16 pb-12 mt-20 border-t border-[#14213D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-[#F6F1E7] p-3 rounded-xl inline-block">
              <Logo size="md" showTagline={true} />
            </div>
            <p className="text-[#6B7A99] text-sm max-w-md leading-relaxed">
              Il marketplace italiano di conversazioni telefoniche informali per ottenere
              un punto di vista maschile autentico, lucido e privo di giudizi.
              Privacy totale con numeri mascherati, nessun incontro e nessuna registrazione audio.
            </p>
            <div className="flex items-center gap-4 text-xs text-[#F6F1E7]/80 pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#2F6B4F]" />
                Operatori 100% Verificati
              </span>
              <span className="flex items-center gap-1.5">
                <PhoneCall size={14} className="text-[#E07A5F]" />
                Numeri Mascherati & Anonimi
              </span>
            </div>
          </div>

          {/* Col 2: Navigazione */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#F6F1E7] uppercase tracking-wider">
              Piattaforma
            </h4>
            <ul className="space-y-2 text-sm text-[#6B7A99]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/')}
                  className="hover:text-[#E07A5F] transition-colors cursor-pointer"
                >
                  Home & Come Funziona
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/operators')}
                  className="hover:text-[#E07A5F] transition-colors cursor-pointer"
                >
                  Griglia Operatori (10 slot)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/login')}
                  className="hover:text-[#E07A5F] transition-colors cursor-pointer"
                >
                  Accesso Cliente (Phone OTP)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/dashboard')}
                  className="hover:text-[#E07A5F] transition-colors cursor-pointer"
                >
                  Gestione Minuti & Storico
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Sezione Operatori & Supporto */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#F6F1E7] uppercase tracking-wider">
              Operatori & Emergenze
            </h4>
            <ul className="space-y-2 text-sm text-[#6B7A99]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/operator-login')}
                  className="hover:text-[#E07A5F] transition-colors cursor-pointer"
                >
                  Area Riservata Operatori
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/admin')}
                  className="hover:text-[#E07A5F] transition-colors cursor-pointer"
                >
                  Verifica Candidature (Admin)
                </button>
              </li>
              <li className="pt-2">
                <div className="bg-[#F6F1E7]/5 border border-[#F6F1E7]/10 p-2.5 rounded-lg text-xs space-y-1">
                  <span className="font-semibold text-[#E07A5F] flex items-center gap-1">
                    <HeartHandshake size={13} />
                    Supporto Nazionale Antiviolenza:
                  </span>
                  <p className="text-[#F6F1E7]/90 font-mono font-bold text-sm">
                    Chiama il 1522 (Gratuito 24/7)
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box - OBLIGATORY EXACT TEXT */}
        <div className="bg-[#14213D]/90 border border-[#F6F1E7]/15 rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-start gap-3">
            <AlertCircle size={18} className="text-[#E07A5F] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wide text-[#E07A5F]">
                Avvertenza Legale e Limiti del Servizio
              </span>
              <p className="text-xs leading-relaxed text-[#F6F1E7]/90 font-normal">
                {LEGAL_DISCLAIMER}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#F6F1E7]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B7A99] gap-4">
          <p>© {new Date().getFullYear()} AskAMan Italia. Tutti i diritti riservati. P.IVA IT09182370129.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-[#E07A5F] cursor-pointer">Termini di Servizio</span>
            <span className="hover:text-[#E07A5F] cursor-pointer">Privacy & Cookie Policy</span>
            <span className="hover:text-[#E07A5F] cursor-pointer">Codice Etico Operatori</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
