import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OperatorPhoto } from '../components/common/OperatorPhoto';
import { VerificationBadge } from '../components/common/VerificationBadge';
import { CtaButton } from '../components/common/CtaButton';
import {
  PhoneCall,
  Play,
  Volume2,
  Calendar,
  Sparkles,
  Info,
  Clock,
  UserPlus,
  HelpCircle
} from 'lucide-react';
import { Operator } from '../types';

interface OperatorsPageProps {
  onNavigate: (path: string) => void;
  onSelectOperatorForDetail?: (operator: Operator) => void;
}

export const OperatorsPage: React.FC<OperatorsPageProps> = ({
  onNavigate,
  onSelectOperatorForDetail
}) => {
  const {
    operators,
    startCall,
    setIsCandidateModalOpen,
    currentUser,
    setIsStripeModalOpen
  } = useApp();

  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [activePromptSlot, setActivePromptSlot] = useState<number | null>(null);

  // FIXED GRID of 10 SLOTS (index 0 to 9)
  const TOTAL_SLOTS = 10;
  const gridSlots: (Operator | null)[] = Array.from({ length: TOTAL_SLOTS }, (_, index) => {
    return operators.find(op => op.slotIndex === index) || null;
  });

  const toggleAudio = (uid: string) => {
    if (playingAudioId === uid) {
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(uid);
      setTimeout(() => {
        setPlayingAudioId(null);
      }, 6000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Title & Context banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#14213D]/10 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C8532F]">
            <span>Chiedi a chi conosce le risposte</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8532F]"></span>
            <span>10 Slot Esclusivi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14213D] tracking-tight">
            Gli Operatori di AskAMan
          </h1>
          <p className="text-sm text-[#6B7A99] max-w-2xl">
            Chiedi a chi conosce le risposte: operatori selezionati per offrirti il punto di vista maschile autentico,
            senza filtri e senza giudizi. Chiamate dirette, riservate e protette dal nostro centralino vocale anonimo.
          </p>
        </div>

        {/* User trial/balance pill */}
        <div className="bg-white/80 border border-[#14213D]/15 rounded-2xl p-4 flex items-center gap-4 shrink-0 shadow-xs">
          <div className="w-10 h-10 rounded-full bg-[#E07A5F]/15 flex items-center justify-center text-[#E07A5F]">
            <Clock size={20} />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-[#6B7A99] uppercase block">
              Il tuo saldo disponibile
            </span>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-[#14213D]">
                {currentUser.creditsMinutes} minuti
              </span>
              {!currentUser.hasUsedFreeTrial && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#2F6B4F]/10 text-[#2F6B4F] border border-[#2F6B4F]/20">
                  10 min Gratis
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 10 SLOTS FIXED GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gridSlots.map((operator, slotIndex) => {
          if (operator) {
            // OCCUPIED SLOT CARD
            return (
              <div
                key={operator.uid}
                className="bg-[#F6F1E7] border border-[#14213D]/15 rounded-2xl p-6 flex flex-col justify-between hover:border-[#14213D]/40 transition-all shadow-xs space-y-5 group"
              >
                <div className="space-y-4">
                  {/* Top bar with slot index + status badge */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] font-semibold text-[#6B7A99]">
                      Slot #{slotIndex + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          operator.status === 'online'
                            ? 'bg-[#2F6B4F]'
                            : operator.status === 'busy'
                            ? 'bg-amber-500'
                            : 'bg-[#6B7A99]'
                        }`}
                      />
                      <span className="text-[11px] font-medium text-[#14213D] capitalize">
                        {operator.status === 'online'
                          ? 'Disponibile'
                          : operator.status === 'busy'
                          ? 'In Chiamata'
                          : operator.badges.includes('In Attivazione')
                          ? 'In Attivazione'
                          : 'Non in linea'}
                      </span>
                    </div>
                  </div>

                  {/* Operator Header: Photo, Name, Verification badge */}
                  <div className="flex items-start gap-4">
                    <OperatorPhoto
                      photoUrl={operator.photoUrl}
                      name={operator.name}
                      unlockedByConsent={operator.photoUnlockedByConsent}
                      size="md"
                    />

                    <div className="space-y-1">
                      <h3
                        onClick={() => {
                          if (onSelectOperatorForDetail) onSelectOperatorForDetail(operator);
                          onNavigate(`/operators/${operator.uid}`);
                        }}
                        className="font-bold text-lg text-[#14213D] hover:text-[#E07A5F] cursor-pointer transition-colors"
                      >
                        {operator.name}
                      </h3>
                      <p className="text-xs text-[#6B7A99]">
                        {operator.ageRange} • {operator.region}
                      </p>
                      <div className="pt-0.5">
                        <VerificationBadge size="sm" />
                      </div>
                    </div>
                  </div>

                  {/* Audio player intro */}
                  <div className="bg-white/80 border border-[#14213D]/10 rounded-xl p-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => toggleAudio(operator.uid)}
                        className="w-8 h-8 rounded-full bg-[#14213D] text-[#F6F1E7] flex items-center justify-center hover:bg-[#E07A5F] transition-colors cursor-pointer"
                        title="Ascolta estratto vocale"
                      >
                        {playingAudioId === operator.uid ? (
                          <Volume2 size={15} className="text-[#E07A5F]" />
                        ) : (
                          <Play size={14} className="ml-0.5 text-[#F6F1E7]" />
                        )}
                      </button>
                      <div>
                        <span className="text-xs font-bold text-[#14213D] block">
                          Voce & Accento
                        </span>
                        <span className="text-[11px] text-[#6B7A99]">{operator.accent}</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-[#6B7A99]">
                      {operator.audioDurationSeconds || 38}s
                    </span>
                  </div>

                  {/* Narrative Bio */}
                  <p className="text-xs text-[#14213D]/90 leading-relaxed italic line-clamp-3">
                    &ldquo;{operator.bio}&rdquo;
                  </p>

                  {/* Themes */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {operator.themes.map((theme, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#14213D]/5 text-[#14213D]"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>

                  {/* Available slots */}
                  <div className="text-[11px] text-[#6B7A99] flex flex-wrap items-center gap-1.5 pt-1">
                    <Calendar size={13} className="text-[#E07A5F] shrink-0" />
                    <span className="font-medium text-[#14213D]">{operator.availableSlots.join(' • ')}</span>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-[#14213D]/10 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-sm font-bold text-[#14213D]">
                      €{operator.pricePerMinute.toFixed(2)}
                    </span>
                    <span className="text-[11px] text-[#6B7A99]"> / min</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (onSelectOperatorForDetail) onSelectOperatorForDetail(operator);
                        onNavigate(`/operators/${operator.uid}`);
                      }}
                      className="text-xs font-semibold text-[#14213D] hover:underline px-2 py-1.5 cursor-pointer"
                    >
                      Profilo
                    </button>

                    {operator.status === 'offline' ? (
                      <button
                        type="button"
                        disabled
                        className="px-3.5 py-2 rounded-[8px] bg-[#14213D]/10 text-[#6B7A99] text-xs font-semibold cursor-not-allowed flex items-center"
                      >
                        <Clock size={13} className="mr-1.5" />
                        A breve attivo
                      </button>
                    ) : (
                      <CtaButton
                        size="sm"
                        onClick={() => {
                          const res = startCall(operator);
                          if (!res.success && res.message) {
                            alert(res.message);
                          }
                        }}
                      >
                        <PhoneCall size={13} className="mr-1.5" />
                        Chiama ora
                      </CtaButton>
                    )}
                  </div>
                </div>
              </div>
            );
          } else {
            // EMPTY SLOT CARD (Placeholder Grigio "Posizione aperta — Operatore in arrivo")
            const isPromptActive = activePromptSlot === slotIndex;

            return (
              <div
                key={`empty-slot-${slotIndex}`}
                className="border-2 border-dashed border-[#6B7A99]/30 rounded-2xl p-6 flex flex-col justify-between items-center text-center space-y-6 bg-white/40 hover:bg-white/70 transition-all min-h-[380px]"
              >
                {/* Slot index indicator */}
                <div className="w-full flex justify-between items-center text-xs text-[#6B7A99]">
                  <span className="font-mono text-[11px]">Slot #{slotIndex + 1}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#6B7A99]/10 text-[#6B7A99] font-medium">
                    Vacante
                  </span>
                </div>

                {/* Center visual */}
                <div className="space-y-3 my-auto">
                  <div className="w-16 h-16 rounded-2xl bg-[#6B7A99]/10 border border-[#6B7A99]/20 flex items-center justify-center mx-auto text-[#6B7A99]">
                    <UserPlus size={28} strokeWidth={1.7} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-[#14213D]">
                      Posizione aperta — Operatore in arrivo
                    </h3>
                    <p className="text-xs text-[#6B7A99] max-w-xs mx-auto">
                      Selezioniamo solo 10 voci per garantire la massima conformità, ascolto autentico e rispetto delle regole.
                    </p>
                  </div>
                </div>

                {/* Question Prompt: "Vuoi essere un nostro operatore?" con bottoni [SÌ] [NO] */}
                <div className="w-full pt-4 border-t border-[#6B7A99]/20 space-y-3">
                  <p className="text-xs font-bold text-[#14213D]">
                    Vuoi essere un nostro operatore?
                  </p>

                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setActivePromptSlot(slotIndex);
                        setIsCandidateModalOpen(true);
                      }}
                      className="px-4 py-1.5 rounded-lg bg-[#E07A5F] text-[#F6F1E7] text-xs font-bold hover:bg-[#cf6d52] transition-colors cursor-pointer shadow-xs"
                    >
                      SÌ
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActivePromptSlot(null);
                      }}
                      className="px-4 py-1.5 rounded-lg bg-[#14213D]/10 text-[#14213D] text-xs font-semibold hover:bg-[#14213D]/20 transition-colors cursor-pointer"
                    >
                      NO
                    </button>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>

      {/* Compliance & Help notice below grid */}
      <div className="bg-[#14213D]/5 border border-[#14213D]/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-xs text-[#14213D]">
          <Info size={18} className="text-[#E07A5F] shrink-0" />
          <p>
            Tutte le conversazioni sono strettamente private e anonime. Nessun dato telefonico o profilo social viene mai condiviso tra utente e operatore.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="text-xs font-semibold text-[#14213D] hover:text-[#E07A5F] whitespace-nowrap cursor-pointer"
        >
          Rivedi come funziona →
        </button>
      </div>
    </div>
  );
};
