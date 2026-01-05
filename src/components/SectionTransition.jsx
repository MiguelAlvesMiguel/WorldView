import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, Scale, Shield, Heart, Sparkles, Users, BookOpen, Atom,
  Dna, Cpu, Sword, Flag, Brain, Pill, Lightbulb, Rainbow, Globe
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
  'globalism': Globe,
  'personality': Brain
};

const SectionTransition = ({ section, onContinue }) => {
  const IconComponent = sectionIcons[section.id] || Brain;

  // Auto-continue after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      onContinue();
    }, 1000);
    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <div className="mb-6 px-6 py-4 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-xl border border-indigo-500/20 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-1 flex-shrink-0">
        <div className="w-full h-full rounded-lg bg-slate-900 flex items-center justify-center">
          <IconComponent className="w-6 h-6 text-indigo-400" />
        </div>
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-bold text-white">{section.title}</h2>
        <p className="text-xs text-slate-400">{section.description}</p>
      </div>
      <div className="w-24 h-1 bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1, ease: 'linear' }}
        />
      </div>
    </div>
  );
};

export default SectionTransition;
