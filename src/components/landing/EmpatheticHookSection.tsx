import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircleQuestion, Users, BrainCircuit, ArrowRight, Sparkles } from 'lucide-react';

interface EmpatheticHookSectionProps {
  onCtaClick?: () => void;
  className?: string;
}

export const EmpatheticHookSection: React.FC<EmpatheticHookSectionProps> = ({
  onCtaClick,
  className = ''
}) => {
  const cards = [
    {
      id: 'direct-ask',
      icon: MessageCircleQuestion,
      accentColor: '#E07A5F',
      accentBg: 'bg-[#E07A5F]/10',
      borderColor: 'hover:border-[#E07A5F]/50',
      number: '01',
      question: 'Hai già provato a chiederlo direttamente a un uomo?',
      subtext:
        'A volte la risposta più semplice è quella che non abbiamo ancora osato formulare.'
    },
    {
      id: 'friends-bias',
      icon: Users,
      accentColor: '#14213D',
      accentBg: 'bg-[#14213D]/10',
      borderColor: 'hover:border-[#14213D]/40',
      number: '02',
      question: 'Le tue confidenti ti danno risposte troppo di parte o protettive?',
      subtext:
        'Le amiche vogliono difenderti. Noi vogliamo aiutarti a decodificare la realtà, senza filtri.'
    },
    {
      id: 'no-academic-jargon',
      icon: BrainCircuit,
      accentColor: '#2F6B4F',
      accentBg: 'bg-[#2F6B4F]/10',
      borderColor: 'hover:border-[#2F6B4F]/40',
      number: '03',
      question:
        'La terapia o i consigli degli esperti ti offrono spiegazioni che senti distanti dalla tua realtà?',
      subtext:
        'Nessun linguaggio accademico. Solo logica pratica e bagaglio di vita reale.'
    }
  ];

  return (
    <section
      aria-label="Il Gancio Empatico - AskAMan"
      className={`relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden ${className}`}
    >
      {/* Subtle Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#E07A5F]/5 blur-3xl pointer-events-none rounded-full -z-10"
        aria-hidden="true"
      />

      {/* Header Pre-Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14213D]/5 text-[#14213D] border border-[#14213D]/10 text-xs font-bold uppercase tracking-wider"
        >
          <Sparkles size={13} className="text-[#E07A5F]" />
          <span>I dubbi che non confessi a nessuno</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
          className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#14213D] tracking-tight leading-tight"
        >
          Quante volte ti sei sentita dire la cosa sbagliata?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15, ease: 'easeOut' }}
          className="text-sm sm:text-base text-[#6B7A99] max-w-xl mx-auto leading-relaxed"
        >
          Quando cerchi chiarezza, il rumore di fondo rischia di confonderti ancora di più.
          È tempo di un punto di vista diretto, autentico e senza maschere.
        </motion.p>
      </div>

      {/* 3 Vertical / Column Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {cards.map((card, index) => {
          const IconComponent = card.icon;

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.21, 0.47, 0.32, 0.98]
              }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className={`group relative flex flex-col justify-between p-7 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xs border border-[#14213D]/10 shadow-xs hover:shadow-lg transition-all duration-300 ${card.borderColor}`}
            >
              {/* Card Header: Icon on the left + Card Number */}
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  {/* Minimalist icon container on the left */}
                  <div
                    className={`w-12 h-12 rounded-2xl ${card.accentBg} flex items-center justify-center transition-transform group-hover:scale-110 duration-300 shrink-0`}
                  >
                    <IconComponent
                      size={24}
                      style={{ color: card.accentColor }}
                      className="transition-colors"
                      strokeWidth={2}
                    />
                  </div>

                  {/* Discrete elegant step index */}
                  <span className="font-mono text-xs font-extrabold text-[#14213D]/30 tracking-widest uppercase">
                    {card.number}
                  </span>
                </div>

                {/* Question highlighted in Serif / Italic "Inner Voice" */}
                <h3
                  className="font-['Cormorant_Garamond',serif] italic font-semibold text-2xl sm:text-[26px] text-[#14213D] leading-snug tracking-tight mb-4 group-hover:text-[#E07A5F] transition-colors duration-200"
                >
                  &ldquo;{card.question}&rdquo;
                </h3>

                {/* Subtext explanation */}
                <p className="text-sm text-[#6B7A99] font-normal leading-relaxed">
                  {card.subtext}
                </p>
              </div>

              {/* Bottom decorative subtle indicator */}
              <div className="mt-8 pt-5 border-t border-[#14213D]/5 flex items-center justify-between text-xs text-[#14213D]/40">
                <span className="text-[11px] font-semibold uppercase tracking-wider">
                  Prospettiva autentica
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: card.accentColor }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Central Visible CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="mt-12 sm:mt-16 text-center"
      >
        <button
          type="button"
          onClick={onCtaClick}
          className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#14213D] hover:bg-[#E07A5F] text-[#F6F1E7] font-bold text-sm sm:text-base tracking-tight shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
        >
          <span>Smetti di tirare a indovinare. Ascolta la sua prospettiva.</span>
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1 duration-200 shrink-0"
          />
        </button>

        <p className="text-xs text-[#6B7A99] mt-3.5 flex items-center justify-center gap-1.5">
          <span>100% anonimo</span>
          <span className="text-[#14213D]/20">•</span>
          <span>Zero terapia</span>
          <span className="text-[#14213D]/20">•</span>
          <span>Senza giudizi</span>
        </p>
      </motion.div>
    </section>
  );
};

export default EmpatheticHookSection;
