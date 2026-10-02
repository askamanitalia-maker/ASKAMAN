import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Sparkles, ShieldCheck, ArrowRight, Phone, MessageSquare } from 'lucide-react';
import { FaqSection } from '../components/faq/FaqSection';
import { CtaButton } from '../components/common/CtaButton';

interface FaqPageProps {
  onNavigate: (path: string) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header & Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E07A5F]/15 text-[#E07A5F] border border-[#E07A5F]/30 text-xs font-bold uppercase tracking-wider"
        >
          <Sparkles size={14} />
          <span>Trasparenza &amp; Risposte Chiare</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black text-[#14213D] tracking-tight leading-tight"
        >
          Tutto quello che desideri sapere <br />
          <span className="text-[#E07A5F]">su Ask A Man.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="text-sm sm:text-base text-[#6B7A99] leading-relaxed max-w-2xl mx-auto"
        >
          Abbiamo raccolto qui le risposte più frequenti su privacy, funzionamento della linea vocale,
          profilo degli operatori e differenze rispetto a podcast o percorsi di terapia.
        </motion.p>
      </div>

      {/* Accordion FAQ Component */}
      <FaqSection
        onCtaClick={() => onNavigate('/operators')}
        showTabs={true}
      />

      {/* Need more info block */}
      <div className="text-center max-w-xl mx-auto pt-6 border-t border-[#14213D]/10 space-y-3">
        <h4 className="text-sm font-bold text-[#14213D]">
          Hai un&apos;altra domanda o desideri contattare il supporto?
        </h4>
        <p className="text-xs text-[#6B7A99]">
          Scrivici liberamente all&apos;indirizzo{' '}
          <a
            href="mailto:askaman.italia@gmail.com"
            className="text-[#E07A5F] font-semibold underline underline-offset-2 hover:text-[#C8532F]"
          >
            askaman.italia@gmail.com
          </a>
          . Rispondiamo entro poche ore.
        </p>
      </div>
    </div>
  );
};

export default FaqPage;
