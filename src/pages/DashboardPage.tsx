import React from 'react';
import { useApp } from '../context/AppContext';
import { CtaButton } from '../components/common/CtaButton';
import {
  Clock,
  Award,
  PhoneCall,
  CreditCard,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  ArrowUpRight,
  User
} from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (path: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { currentUser, calls, transactions, setIsStripeModalOpen } = useApp();

  const userCalls = calls.filter(c => c.userId === currentUser?.uid || c.userId === 'user_current');
  const userTransactions = transactions.filter(
    t => t.userId === currentUser?.uid || t.userId === 'user_current'
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#14213D]/10 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#E07A5F]">
            Area Personale Riservata
          </span>
          <h1 className="text-3xl font-extrabold text-[#14213D] tracking-tight">
            La tua dashboard AskAMan
          </h1>
          <p className="text-xs text-[#6B7A99] mt-1">
            Numero verificato: <span className="font-mono text-[#14213D]">{currentUser?.phone}</span>
          </p>
        </div>

        <CtaButton size="md" onClick={() => onNavigate('/operators')}>
          <PhoneCall size={15} className="mr-2" />
          Scegli un operatore e chiama
        </CtaButton>
      </div>

      {/* Stats Cards: Credits & Founder Badge */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Credits Card */}
        <div className="bg-[#14213D] text-[#F6F1E7] rounded-2xl p-6 space-y-4 shadow-md flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#6B7A99] uppercase tracking-wider font-semibold">
                Saldo Minuti Disponibili
              </span>
              <div className="w-8 h-8 rounded-full bg-[#E07A5F]/20 text-[#E07A5F] flex items-center justify-center">
                <Clock size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-[#F6F1E7]">
                {currentUser?.creditsMinutes || 0}
              </span>
              <span className="text-sm text-[#6B7A99]">minuti</span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#F6F1E7]/10 flex items-center justify-between">
            <span className="text-xs text-[#6B7A99]">
              {!currentUser?.hasUsedFreeTrial ? 'Include 10 min prova gratuita' : 'Crediti prepagati'}
            </span>
            <button
              type="button"
              onClick={() => setIsStripeModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-[#E07A5F] text-[#F6F1E7] text-xs font-bold hover:bg-[#cf6d52] transition-colors cursor-pointer"
            >
              Acquista crediti
            </button>
          </div>
        </div>

        {/* Founder Status Card */}
        <div className="bg-[#F6F1E7] border border-[#14213D]/15 rounded-2xl p-6 space-y-4 shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#6B7A99] uppercase tracking-wider font-semibold">
                Privilegio Registrazione
              </span>
              <div className="w-8 h-8 rounded-full bg-[#2F6B4F]/15 text-[#2F6B4F] flex items-center justify-center">
                <Award size={18} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2F6B4F] text-[#F6F1E7] text-xs font-bold">
                <CheckCircle2 size={13} />
                <span>Founder Member</span>
              </div>
              <p className="text-xs text-[#14213D] leading-relaxed pt-1 font-medium">
                Iscrizione avvenuta nei primi 6 mesi di lancio. Prezzo bloccato a €1,00/min per 12 mesi interi.
              </p>
            </div>
          </div>

          <div className="text-[11px] text-[#6B7A99] pt-2 border-t border-[#14213D]/10">
            Scadenza garanzia tariffa: <strong>Settembre 2027</strong>
          </div>
        </div>

        {/* Privacy & Masking Card */}
        <div className="bg-[#F6F1E7] border border-[#14213D]/15 rounded-2xl p-6 space-y-4 shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#6B7A99] uppercase tracking-wider font-semibold">
                Sicurezza & Protezione
              </span>
              <div className="w-8 h-8 rounded-full bg-[#14213D]/10 text-[#14213D] flex items-center justify-center">
                <ShieldCheck size={18} className="text-[#2F6B4F]" />
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold text-[#14213D]">Anonimato Totale & Numeri Protetti</h4>
              <p className="text-xs text-[#6B7A99] leading-relaxed">
                Nessun recapito telefonico né audio registrato. Sei protetta dalla cifratura di rete del nostro proxy telefonico.
              </p>
            </div>
          </div>

          <div className="text-[11px] text-[#2F6B4F] font-semibold flex items-center gap-1">
            <CheckCircle2 size={13} />
            <span>Bridge Attivo & Verificato</span>
          </div>
        </div>
      </div>

      {/* Call History Table */}
      <div className="bg-[#F6F1E7] border border-[#14213D]/15 rounded-2xl p-6 space-y-6 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#14213D]">Storico Chiamate Effettuate</h3>
            <p className="text-xs text-[#6B7A99]">
              Dettaglio delle conversazioni con durata e ripartizione etica dei costi
            </p>
          </div>
        </div>

        {userCalls.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#6B7A99] bg-white/40 rounded-xl">
            Non hai ancora effettuato chiamate. Scegli un operatore per utilizzare i tuoi 10 minuti gratuiti!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#14213D]/5 text-[#14213D] font-bold uppercase tracking-wider border-b border-[#14213D]/10">
                <tr>
                  <th className="py-3 px-4">Operatore</th>
                  <th className="py-3 px-4">Data & Ora</th>
                  <th className="py-3 px-4">Durata</th>
                  <th className="py-3 px-4">Tipologia</th>
                  <th className="py-3 px-4">Importo</th>
                  <th className="py-3 px-4">Stato</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#14213D]/10">
                {userCalls.map(call => (
                  <tr key={call.callSid} className="hover:bg-white/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#14213D]">
                      {call.operatorName || 'Operatore Maschile'}
                    </td>
                    <td className="py-3.5 px-4 text-[#6B7A99]">
                      {new Date(call.startTime).toLocaleDateString('it-IT', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#14213D]">
                      {call.durationMinutes} min
                    </td>
                    <td className="py-3.5 px-4">
                      {call.isFreeTrial ? (
                        <span className="inline-block px-2 py-0.5 rounded-full bg-[#2F6B4F]/10 text-[#2F6B4F] font-bold text-[10px]">
                          Free Trial 10 min
                        </span>
                      ) : (
                        <span className="text-[#6B7A99]">Standard €1/min</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#14213D]">
                      €{call.totalCost.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 text-[#2F6B4F] font-medium text-[11px]">
                        <CheckCircle2 size={12} />
                        Completata
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Transactions History Table */}
      <div className="bg-[#F6F1E7] border border-[#14213D]/15 rounded-2xl p-6 space-y-6 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#14213D]">Transazioni Stripe & Ricariche Minuti</h3>
            <p className="text-xs text-[#6B7A99]">
              Ricevute e storico ricariche senza abbonamento ricorrente
            </p>
          </div>
          <CtaButton size="sm" onClick={() => setIsStripeModalOpen(true)}>
            Acquista Altri Minuti
          </CtaButton>
        </div>

        {userTransactions.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#6B7A99] bg-white/40 rounded-xl">
            Nessuna transazione registrata finora.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#14213D]/5 text-[#14213D] font-bold uppercase tracking-wider border-b border-[#14213D]/10">
                <tr>
                  <th className="py-3 px-4">ID Transazione</th>
                  <th className="py-3 px-4">Data</th>
                  <th className="py-3 px-4">Pacchetto</th>
                  <th className="py-3 px-4">Minuti Aggiunti</th>
                  <th className="py-3 px-4">Totale Pagato</th>
                  <th className="py-3 px-4">Stripe Session ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#14213D]/10">
                {userTransactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-white/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-[#14213D]">{tx.id}</td>
                    <td className="py-3.5 px-4 text-[#6B7A99]">
                      {new Date(tx.createdAt).toLocaleDateString('it-IT', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#14213D] capitalize">
                      {tx.packId.replace('_', ' ')}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#2F6B4F]">
                      +{tx.minutesAdded} min
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#14213D]">
                      €{tx.amountEUR.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[10px] text-[#6B7A99]">
                      {tx.stripeSessionId}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
