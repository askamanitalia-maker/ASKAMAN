import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ComplianceBanner } from '../components/common/ComplianceBanner';
import { OperatorPhoto } from '../components/common/OperatorPhoto';
import { VerificationBadge } from '../components/common/VerificationBadge';
import {
  Euro,
  Clock,
  PhoneCall,
  CheckCircle2,
  Calendar,
  Eye,
  Sliders,
  AlertTriangle,
  History,
  FileCheck
} from 'lucide-react';

interface OperatorDashboardPageProps {
  onNavigate: (path: string) => void;
}

export const OperatorDashboardPage: React.FC<OperatorDashboardPageProps> = ({ onNavigate }) => {
  const {
    currentUser,
    operators,
    calls,
    toggleOperatorStatus,
    toggleOperatorConsent,
    recordComplianceAcknowledgment,
    complianceLogs
  } = useApp();

  // Find operator profile for current user
  const operator =
    operators.find(o => o.uid === currentUser?.uid || o.uid === 'op_1') || operators[0];

  const operatorCalls = calls.filter(
    c => c.operatorId === operator.uid || c.operatorId === 'op_1'
  );

  // Total earnings with 50% split (€0.50/minuto)
  const totalMinutes = operatorCalls.reduce((acc, c) => acc + c.durationMinutes, 0);
  const totalPayoutEUR = operatorCalls.reduce((acc, c) => acc + c.operatorPayout, 0);

  const [hasAcknowledgedBanner, setHasAcknowledgedBanner] = useState(false);

  const handleAcknowledge = () => {
    setHasAcknowledgedBanner(true);
    recordComplianceAcknowledgment(operator.uid);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Identity Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#14213D]/10 pb-6">
        <div className="flex items-center gap-5">
          <OperatorPhoto
            photoUrl={operator.photoUrl}
            name={operator.name}
            unlockedByConsent={operator.photoUnlockedByConsent}
            onToggleConsent={() => toggleOperatorConsent(operator.uid)}
            canToggleConsent={true}
            size="lg"
          />

          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14213D]">
                Dashboard Operatore — {operator.name}
              </h1>
              <VerificationBadge size="sm" />
            </div>
            <p className="text-xs text-[#6B7A99]">
              Slot #{operator.slotIndex + 1} Assegnato • {operator.region} ({operator.accent})
            </p>
            <div className="pt-1 flex items-center gap-2">
              <span className="text-xs font-semibold text-[#14213D]">
                Foto protetta da velo ardesia 70%:
              </span>
              <span className="text-xs text-[#2F6B4F] font-bold">
                {operator.photoUnlockedByConsent ? 'Consenso concesso' : 'Protetto (Default)'}
              </span>
            </div>
          </div>
        </div>

        {/* Live Status Toggle */}
        <div className="bg-white/80 border border-[#14213D]/15 rounded-2xl p-4 space-y-2 shrink-0 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7A99] block">
            Stato Telefonico Disponibilità
          </span>
          <div className="inline-flex rounded-xl bg-[#14213D]/5 p-1 gap-1">
            {(
              [
                { id: 'online', label: 'Online (Ricevi chiamate)' },
                { id: 'busy', label: 'In Chiamata' },
                { id: 'offline', label: 'Offline' }
              ] as const
            ).map(st => (
              <button
                key={st.id}
                type="button"
                onClick={() => toggleOperatorStatus(st.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  operator.status === st.id
                    ? st.id === 'online'
                      ? 'bg-[#2F6B4F] text-[#F6F1E7] shadow-xs'
                      : st.id === 'busy'
                      ? 'bg-amber-600 text-[#F6F1E7]'
                      : 'bg-[#14213D] text-[#F6F1E7]'
                    : 'text-[#14213D]/70 hover:text-[#14213D]'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PERMANENT COMPLIANCE BANNER (NON DISMISSABILE) */}
      <div className="space-y-2">
        <ComplianceBanner
          operatorUid={operator.uid}
          isAcknowledged={hasAcknowledgedBanner}
          onAcknowledge={handleAcknowledge}
          showCheckbox={true}
        />
        <div className="flex items-center justify-between text-[11px] text-[#6B7A99] px-2">
          <span>Log verifiche di compliance registrati: {complianceLogs.length}</span>
          <span>Versione Protocollo: v2.4 (Obbligatorio per tutti gli operatori)</span>
        </div>
      </div>

      {/* Stats Cards: Earnings & Payout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Accrued Earnings 50% split */}
        <div className="bg-[#14213D] text-[#F6F1E7] rounded-2xl p-6 space-y-4 shadow-md flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#6B7A99] uppercase tracking-wider font-semibold">
                Compensi Maturati (Split 50%)
              </span>
              <div className="w-8 h-8 rounded-full bg-[#2F6B4F]/20 text-[#2F6B4F] flex items-center justify-center">
                <Euro size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-[#F6F1E7]">
                €{totalPayoutEUR.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#F6F1E7]/10 text-xs text-[#6B7A99] flex items-center justify-between">
            <span>Quota oraria fissa: €0,50/min</span>
            <span className="text-[#2F6B4F] font-bold">Liquidabile a fine mese</span>
          </div>
        </div>

        {/* Minutes of conversation */}
        <div className="bg-[#F6F1E7] border border-[#14213D]/15 rounded-2xl p-6 space-y-4 shadow-xs flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#6B7A99] uppercase tracking-wider font-semibold">
                Tempo Totale di Ascolto
              </span>
              <div className="w-8 h-8 rounded-full bg-[#E07A5F]/15 text-[#E07A5F] flex items-center justify-center">
                <Clock size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-[#14213D]">
                {totalMinutes}
              </span>
              <span className="text-sm text-[#6B7A99]">minuti effettivi</span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#14213D]/10 text-xs text-[#6B7A99]">
            Chiamate complessive registrate: <strong className="text-[#14213D]">{operatorCalls.length}</strong>
          </div>
        </div>

        {/* Escape script reference card */}
        <div className="bg-[#F6F1E7] border border-[#14213D]/15 rounded-2xl p-6 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E07A5F]">
            <AlertTriangle size={15} />
            <span>Script di Fuga Ufficiale</span>
          </div>
          <p className="text-xs leading-relaxed text-[#14213D] italic bg-white/70 p-3 rounded-xl border border-[#14213D]/10">
            &ldquo;Sento che stai soffrendo molto e va oltre le mie competenze. Ti invito a contattare un professionista o il 1522. Devo chiudere qui.&rdquo;
          </p>
          <span className="text-[11px] text-[#6B7A99] block">
            Da recitare senza esitazione in caso di emergenza clinica o traumi.
          </span>
        </div>
      </div>

      {/* Call History Table with Durations & Payout */}
      <div className="bg-[#F6F1E7] border border-[#14213D]/15 rounded-2xl p-6 space-y-6 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#14213D]">Storico Chiamate Ricevute</h3>
            <p className="text-xs text-[#6B7A99]">
              Durata, calcolo compensi con split 50/50 e log Twilio anonimi
            </p>
          </div>
        </div>

        {operatorCalls.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#6B7A99] bg-white/40 rounded-xl">
            Nessuna chiamata registrata finora. Mantieni lo stato Online per ricevere le prime telefonate.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#14213D]/5 text-[#14213D] font-bold uppercase tracking-wider border-b border-[#14213D]/10">
                <tr>
                  <th className="py-3 px-4">Twilio Call SID</th>
                  <th className="py-3 px-4">Cliente (Mascherato)</th>
                  <th className="py-3 px-4">Data & Ora</th>
                  <th className="py-3 px-4">Durata</th>
                  <th className="py-3 px-4">Compenso Operatore (50%)</th>
                  <th className="py-3 px-4">Quota Piattaforma (50%)</th>
                  <th className="py-3 px-4">Stato</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#14213D]/10">
                {operatorCalls.map(call => (
                  <tr key={call.callSid} className="hover:bg-white/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-[#14213D]">{call.callSid}</td>
                    <td className="py-3.5 px-4 text-[#6B7A99]">
                      {call.userName || 'Cliente Protetta'}
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
                    <td className="py-3.5 px-4 font-mono font-bold text-[#2F6B4F]">
                      €{call.operatorPayout.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#6B7A99]">
                      €{call.platformFee.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 text-[#2F6B4F] font-medium text-[11px]">
                        <CheckCircle2 size={12} />
                        Liquidabile
                      </span>
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
