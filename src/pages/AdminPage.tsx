import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CtaButton } from '../components/common/CtaButton';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  PhoneCall,
  CreditCard,
  UserCheck,
  Eye,
  AlertCircle
} from 'lucide-react';
import { OperatorApplication } from '../types';

interface AdminPageProps {
  onNavigate: (path: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const { calls, transactions, applications, approveCandidate, rejectCandidate, operators } = useApp();
  const [activeTab, setActiveTab] = useState<'applications' | 'calls' | 'transactions'>('applications');
  const [selectedApp, setSelectedApp] = useState<OperatorApplication | null>(null);

  const pendingApps = applications.filter(a => a.status === 'pending');
  const occupiedSlotsCount = operators.length;
  const freeSlotsCount = Math.max(0, 10 - occupiedSlotsCount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Admin Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#14213D]/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E07A5F]">
            <ShieldCheck size={16} />
            <span>Pannello di Controllo & Amministrazione</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#14213D] tracking-tight">
            Gestione Marketplace AskAMan
          </h1>
          <p className="text-xs text-[#6B7A99] mt-1">
            Slot occupati: <strong className="text-[#14213D]">{occupiedSlotsCount}/10</strong> • Slot liberi:{' '}
            <strong className="text-[#2F6B4F]">{freeSlotsCount}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('/operators')}
            className="text-xs font-semibold text-[#14213D] hover:underline px-3 py-2 cursor-pointer"
          >
            Visualizza Griglia
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-[#14213D]/15 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('applications')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'applications'
              ? 'bg-[#14213D] text-[#F6F1E7]'
              : 'text-[#14213D] hover:bg-[#14213D]/5'
          }`}
        >
          <span>Candidature Operatori</span>
          <span className="px-1.5 py-0.2 rounded-full bg-[#E07A5F] text-[#F6F1E7] text-[10px]">
            {pendingApps.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('calls')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'calls'
              ? 'bg-[#14213D] text-[#F6F1E7]'
              : 'text-[#14213D] hover:bg-[#14213D]/5'
          }`}
        >
          <span>Log Chiamate (calls)</span>
          <span className="px-1.5 py-0.2 rounded-full bg-[#14213D]/15 text-[#14213D] text-[10px]">
            {calls.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('transactions')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'transactions'
              ? 'bg-[#14213D] text-[#F6F1E7]'
              : 'text-[#14213D] hover:bg-[#14213D]/5'
          }`}
        >
          <span>Transazioni Stripe (transactions)</span>
          <span className="px-1.5 py-0.2 rounded-full bg-[#14213D]/15 text-[#14213D] text-[10px]">
            {transactions.length}
          </span>
        </button>
      </div>

      {/* TAB 1: Operator Applications */}
      {activeTab === 'applications' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#14213D]">
              Candidature in Attesa di Revisione
            </h3>
            <span className="text-xs text-[#6B7A99]">
              L&apos;approvazione occupa automaticamente il primo slot disponibile della griglia
            </span>
          </div>

          {applications.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#6B7A99] bg-white/40 rounded-xl">
              Nessuna candidatura presente nel database.
            </div>
          ) : (
            <div className="overflow-x-auto bg-[#F6F1E7] border border-[#14213D]/15 rounded-2xl shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#14213D]/5 text-[#14213D] font-bold uppercase tracking-wider border-b border-[#14213D]/10">
                  <tr>
                    <th className="py-3 px-4">Candidato</th>
                    <th className="py-3 px-4">Regione & Accento</th>
                    <th className="py-3 px-4">Screening 4/4</th>
                    <th className="py-3 px-4">Data Invio</th>
                    <th className="py-3 px-4">Stato</th>
                    <th className="py-3 px-4 text-right">Azioni</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#14213D]/10">
                  {applications.map(app => (
                    <tr key={app.uid} className="hover:bg-white/50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-[#14213D]">
                        <div>{app.name}</div>
                        <div className="text-[11px] text-[#6B7A99] font-mono">{app.phone}</div>
                      </td>
                      <td className="py-3.5 px-4 text-[#6B7A99]">
                        {app.region} ({app.accent})
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 font-bold text-[#2F6B4F]">
                          <CheckCircle2 size={13} />
                          Superato (4/4)
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#6B7A99]">
                        {new Date(app.createdAt).toLocaleDateString('it-IT', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            app.status === 'approved'
                              ? 'bg-[#2F6B4F]/20 text-[#2F6B4F]'
                              : app.status === 'rejected'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {app.status === 'approved'
                            ? 'Approvato'
                            : app.status === 'rejected'
                            ? 'Rifiutato'
                            : 'In Attesa'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedApp(app)}
                            className="p-1.5 text-xs rounded hover:bg-[#14213D]/10 text-[#14213D] cursor-pointer"
                            title="Visualizza dettagli questionario"
                          >
                            <Eye size={15} />
                          </button>

                          {app.status === 'pending' && (
                            <>
                              <button
                                type="button"
                                onClick={() => approveCandidate(app.uid)}
                                className="px-3 py-1 rounded bg-[#2F6B4F] text-[#F6F1E7] font-bold text-xs hover:bg-[#255740] cursor-pointer shadow-xs"
                              >
                                APPROVA
                              </button>
                              <button
                                type="button"
                                onClick={() => rejectCandidate(app.uid)}
                                className="px-2.5 py-1 rounded border border-red-300 text-red-700 text-xs hover:bg-red-50 cursor-pointer"
                              >
                                RIFIUTA
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Modal for Application Details */}
          {selectedApp && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14213D]/70 backdrop-blur-sm animate-fadeIn">
              <div className="bg-[#F6F1E7] border border-[#14213D]/20 rounded-2xl w-full max-w-xl p-6 space-y-4 shadow-2xl relative max-h-[85vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-[#14213D]/10 pb-3">
                  <h4 className="font-bold text-base text-[#14213D]">
                    Dettaglio Candidatura — {selectedApp.name}
                  </h4>
                  <button
                    type="button"
                    onClick={() => setSelectedApp(null)}
                    className="text-[#6B7A99] hover:text-[#14213D] text-xs font-bold cursor-pointer"
                  >
                    Chiudi
                  </button>
                </div>

                <div className="space-y-3 text-xs text-[#14213D]">
                  <div>
                    <span className="font-bold text-[#6B7A99] block uppercase text-[10px]">
                      Esperienza Relazionale Narrativa:
                    </span>
                    <p className="bg-white/80 p-3 rounded-lg border border-[#14213D]/10 italic mt-1 leading-relaxed">
                      &ldquo;{selectedApp.relationalExperience}&rdquo;
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-[#6B7A99] block uppercase text-[10px]">
                      Autodescrizione in 3 righe:
                    </span>
                    <p className="bg-white/80 p-3 rounded-lg border border-[#14213D]/10 mt-1 whitespace-pre-line">
                      {selectedApp.selfDescription}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-[#6B7A99] block uppercase text-[10px]">
                      Temi di Competenze:
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedApp.themes?.map((th, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-[#14213D]/5 text-[#14213D] font-medium"
                        >
                          {th}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-[#6B7A99] block uppercase text-[10px]">
                      Risposte allo Screening di Affidabilità:
                    </span>
                    <ul className="list-disc pl-4 space-y-1 mt-1 text-[#2F6B4F] font-medium">
                      <li>Q1 WhatsApp: Rifiuto e ricordo che il servizio vive solo in piattaforma.</li>
                      <li>Q2 Autolesionismo: Uso lo script di fuga e chiudo la chiamata.</li>
                      <li>Q3 Aperitivo: Rifiuto: nessun incontro è consentito.</li>
                      <li>Q4 Farmaci: Dico che non sono competente e la rimando al medico.</li>
                    </ul>
                  </div>
                </div>

                {selectedApp.status === 'pending' && (
                  <div className="flex justify-end gap-2 pt-3 border-t border-[#14213D]/10">
                    <button
                      type="button"
                      onClick={() => {
                        approveCandidate(selectedApp.uid);
                        setSelectedApp(null);
                      }}
                      className="px-4 py-2 rounded-lg bg-[#2F6B4F] text-[#F6F1E7] font-bold text-xs hover:bg-[#255740] cursor-pointer"
                    >
                      APPROVA CANDIDATO E OCCUPA SLOT
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Calls Table */}
      {activeTab === 'calls' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#14213D]">
              Tabella Chiamate Globali (calls)
            </h3>
            <span className="text-xs text-[#6B7A99]">
              Split etico automatico: 50% all&apos;operatore (€0,50/min), 50% alla piattaforma
            </span>
          </div>

          <div className="overflow-x-auto bg-[#F6F1E7] border border-[#14213D]/15 rounded-2xl shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#14213D]/5 text-[#14213D] font-bold uppercase tracking-wider border-b border-[#14213D]/10">
                <tr>
                  <th className="py-3 px-4">Call SID</th>
                  <th className="py-3 px-4">Cliente</th>
                  <th className="py-3 px-4">Operatore</th>
                  <th className="py-3 px-4">Durata</th>
                  <th className="py-3 px-4">Costo Totale</th>
                  <th className="py-3 px-4">Payout Op. (50%)</th>
                  <th className="py-3 px-4">Platform Fee (50%)</th>
                  <th className="py-3 px-4">Free Trial</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#14213D]/10">
                {calls.map(call => (
                  <tr key={call.callSid} className="hover:bg-white/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-[#14213D]">{call.callSid}</td>
                    <td className="py-3.5 px-4 text-[#6B7A99]">{call.userName || call.userId}</td>
                    <td className="py-3.5 px-4 font-bold text-[#14213D]">
                      {call.operatorName || call.operatorId}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#14213D]">
                      {call.durationMinutes} min
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#14213D]">
                      €{call.totalCost.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#2F6B4F]">
                      €{call.operatorPayout.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#6B7A99]">
                      €{call.platformFee.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4">
                      {call.isFreeTrial ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#2F6B4F]/10 text-[#2F6B4F]">
                          SÌ (10 min)
                        </span>
                      ) : (
                        <span className="text-[#6B7A99]">NO</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Transactions Table */}
      {activeTab === 'transactions' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#14213D]">
              Tabella Transazioni Stripe (transactions)
            </h3>
            <span className="text-xs text-[#6B7A99]">
              Crediti acquistati in pacchetti senza abbonamento ricorrente
            </span>
          </div>

          <div className="overflow-x-auto bg-[#F6F1E7] border border-[#14213D]/15 rounded-2xl shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#14213D]/5 text-[#14213D] font-bold uppercase tracking-wider border-b border-[#14213D]/10">
                <tr>
                  <th className="py-3 px-4">ID Transazione</th>
                  <th className="py-3 px-4">User ID</th>
                  <th className="py-3 px-4">Pacchetto</th>
                  <th className="py-3 px-4">Importo EUR</th>
                  <th className="py-3 px-4">Minuti Aggiunti</th>
                  <th className="py-3 px-4">Stripe Session ID</th>
                  <th className="py-3 px-4">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#14213D]/10">
                {transactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-white/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-[#14213D]">{tx.id}</td>
                    <td className="py-3.5 px-4 text-[#6B7A99] font-mono">{tx.userId}</td>
                    <td className="py-3.5 px-4 font-bold text-[#14213D] capitalize">
                      {tx.packId}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#14213D]">
                      €{tx.amountEUR.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#2F6B4F]">
                      +{tx.minutesAdded} min
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[10px] text-[#6B7A99]">
                      {tx.stripeSessionId}
                    </td>
                    <td className="py-3.5 px-4 text-[#6B7A99]">
                      {new Date(tx.createdAt).toLocaleDateString('it-IT', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
