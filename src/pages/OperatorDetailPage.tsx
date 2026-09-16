import React, { useState } from 'react';
import { Operator } from '../types';
import { OperatorPhoto } from '../components/common/OperatorPhoto';
import { VerificationBadge } from '../components/common/VerificationBadge';
import { CtaButton } from '../components/common/CtaButton';
import { useApp } from '../context/AppContext';
import {
  PhoneCall,
  Play,
  Volume2,
  Calendar,
  Clock,
  MessageSquare,
  ShieldCheck,
  Award,
  ArrowLeft,
  Lock,
  Sparkles
} from 'lucide-react';

interface OperatorDetailPageProps {
  operatorId: string;
  onNavigate: (path: string) => void;
}

export const OperatorDetailPage: React.FC<OperatorDetailPageProps> = ({
  operatorId,
  onNavigate
}) => {
  const { operators, startCall, currentUser, toggleOperatorConsent, currentRole } = useApp();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const operator = operators.find(o => o.uid === operatorId) || operators[0];

  if (!operator) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <p className="text-sm text-[#6B7A99]">Operatore non trovato.</p>
        <CtaButton onClick={() => onNavigate('/operators')}>Torna agli operatori</CtaButton>
      </div>
    );
  }

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
    if (!isPlayingAudio) {
      setTimeout(() => setIsPlayingAudio(false), 8000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <button
        type="button"
        onClick={() => onNavigate('/operators')}
        className="inline-flex items-center gap-2 text-xs font-bold text-[#14213D] hover:text-[#E07A5F] transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} />
        <span>Torna alla griglia dei 10 operatori</span>
      </button>

      {/* Main Profile Header Card */}
      <div className="bg-[#F6F1E7] border border-[#14213D]/15 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#14213D]/10 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="relative shrink-0">
              <OperatorPhoto
                photoUrl={operator.photoUrl}
                name={operator.name}
                unlockedByConsent={operator.photoUnlockedByConsent}
                onToggleConsent={() => toggleOperatorConsent(operator.uid)}
                canToggleConsent={currentRole === 'operator' || currentRole === 'admin'}
                size="xl"
              />
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <VerificationBadge size="sm" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-3xl font-extrabold text-[#14213D] tracking-tight">
                  {operator.name}
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#14213D]/10 text-[#14213D] font-mono">
                  Slot #{operator.slotIndex + 1}
                </span>
              </div>

              <p className="text-sm text-[#6B7A99]">
                {operator.ageRange} • {operator.region} ({operator.accent})
              </p>

              {/* Badges list */}
              <div className="flex flex-wrap gap-2 pt-2">
                {operator.badges.map((badge, bIdx) => (
                  <span
                    key={bIdx}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-[#14213D] text-[#F6F1E7]"
                  >
                    <Award size={12} className="text-[#E07A5F]" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Call CTA Box */}
          <div className="bg-white/80 border border-[#14213D]/15 rounded-2xl p-5 flex flex-col items-center sm:items-end justify-center gap-3 shrink-0 shadow-xs">
            <div className="text-center sm:text-right">
              <span className="text-2xl font-extrabold text-[#14213D]">
                €{operator.pricePerMinute.toFixed(2)}
              </span>
              <span className="text-xs text-[#6B7A99]"> / minuto effettivo</span>
            </div>

            {operator.status === 'offline' ? (
              <button
                type="button"
                disabled
                className="w-full sm:w-auto px-6 py-3.5 rounded-[8px] bg-[#14213D]/10 text-[#6B7A99] font-bold text-sm cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Clock size={16} />
                <span>Operatore in attivazione — A breve attivo</span>
              </button>
            ) : (
              <CtaButton
                size="lg"
                onClick={() => {
                  const res = startCall(operator);
                  if (!res.success && res.message) {
                    alert(res.message);
                  }
                }}
                className="w-full sm:w-auto shadow-md"
              >
                <PhoneCall size={16} className="mr-2" />
                Chiama ora
              </CtaButton>
            )}

            <span className="text-[11px] text-[#2F6B4F] font-semibold flex items-center gap-1">
              <ShieldCheck size={13} />
              {!currentUser.hasUsedFreeTrial ? '10 min gratis disponibili' : 'Nessun numero scambiato'}
            </span>
          </div>
        </div>

        {/* Audio Presentation Section */}
        <div className="bg-white border border-[#14213D]/15 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleAudio}
              className="w-12 h-12 rounded-full bg-[#E07A5F] text-[#F6F1E7] flex items-center justify-center hover:bg-[#cf6d52] transition-colors cursor-pointer shadow-sm"
              title="Ascolta la voce di presentazione"
            >
              {isPlayingAudio ? <Volume2 size={22} /> : <Play size={22} className="ml-1" />}
            </button>
            <div>
              <h3 className="font-bold text-sm text-[#14213D]">
                Ascolta la presentazione vocale ({operator.accent})
              </h3>
              <p className="text-xs text-[#6B7A99]">
                Durata: {operator.audioDurationSeconds || 40} secondi • Traccia registrata in ambiente calmo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#6B7A99]">
            <span className="w-2 h-2 rounded-full bg-[#2F6B4F]"></span>
            <span>Audio Verificato</span>
          </div>
        </div>

        {/* Narrative Bio */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#E07A5F]">
            Biografia Narrativa & Filosofia di Ascolto
          </h3>
          <p className="text-sm leading-relaxed text-[#14213D] bg-white/50 border border-[#14213D]/10 rounded-2xl p-6 italic">
            &ldquo;{operator.bio}&rdquo;
          </p>
        </div>

        {/* Tematiche di Competenza */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#14213D]">
            Temi che affronta con maggiore frequenza
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {operator.themes.map((theme, idx) => (
              <div
                key={idx}
                className="bg-white/70 border border-[#14213D]/10 rounded-xl p-3 text-xs font-semibold text-[#14213D] flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#E07A5F]" />
                <span>{theme}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2-3 Righe di Testimonianze Reali */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#14213D] flex items-center gap-2">
            <MessageSquare size={16} className="text-[#E07A5F]" />
            Testimonianze di chi ha parlato con {operator.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {operator.testimonials?.map((t, idx) => (
              <div
                key={idx}
                className="bg-white/60 border border-[#14213D]/10 rounded-xl p-4 space-y-2 text-xs"
              >
                <p className="text-[#14213D] italic leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <span className="text-[11px] font-bold text-[#6B7A99] block text-right">
                  — {t.author}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Calendario e Slot di Disponibilità */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#14213D] flex items-center gap-2">
            <Calendar size={16} className="text-[#E07A5F]" />
            Fasce orarie e disponibilità telefonica
          </h3>
          <div className="bg-white/70 border border-[#14213D]/10 rounded-xl p-4 space-y-2">
            <div className="flex flex-wrap gap-3">
              {operator.availableSlots.map((slot, sIdx) => (
                <span
                  key={sIdx}
                  className="px-3 py-1.5 rounded-lg bg-[#14213D]/5 border border-[#14213D]/10 text-xs font-semibold text-[#14213D]"
                >
                  {slot}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-[#6B7A99] pt-1">
              Nota: Se l&apos;operatore risulta in linea, la chiamata si avvia all&apos;istante premendo &ldquo;Chiama ora&rdquo;.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
