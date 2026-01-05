import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, Scale, Shield, Heart, Sparkles, Users, BookOpen, Atom,
  Dna, Cpu, Sword, Flag, Brain, Pill, Lightbulb, Rainbow
} from 'lucide-react';

const sectionIcons = {
  'meta': Compass,
  'human-nature': Users,
  'power-state': Shield,
  'equality-hierarchy': Scale,
  'social-issues': Rainbow,
  'responsibility': Heart,
  'culture-morality': BookOpen,
  'religion-meaning': Sparkles,
  'knowledge-science': Atom,
  'philosophy': Lightbulb,
  'drugs': Pill,
  'genetics': Dna,
  'ai-tech': Cpu,
  'force-legitimacy': Sword,
  'identity': Flag,
  'personality': Brain
};

const SectionTransition = ({ section, onContinue }) => {
  const IconComponent = sectionIcons[section.id] || Brain;

  // Auto-continue after 800ms - much faster
  useEffect(() => {
    const timer = setTimeout(() => {
      onContinue();
    }, 800);
    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.1, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-slate-900/90 backdrop-blur-xl"
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ type: 'spring', stiffness: 200, duration: 0.5 }}
          className="w-32 h-32 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-2 shadow-2xl"
        >
          <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center">
            <IconComponent className="w-16 h-16 text-indigo-400" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-black text-white mb-3"
        >
          {section.title}
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: 'linear' }}
          className="w-64 h-1 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
        />
      </motion.div>
    </motion.div>
  );
};

export default SectionTransition;
