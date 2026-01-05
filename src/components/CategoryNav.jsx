import { motion } from 'framer-motion';
import { 
  Compass, Scale, Shield, Heart, Sparkles, Users, BookOpen, Atom,
  Dna, Cpu, Sword, Flag, Brain, ChevronDown
} from 'lucide-react';
import { useState } from 'react';
import { SECTIONS, QUESTIONS } from '../data/questionnaire';

const sectionIcons = {
  'meta': Compass,
  'human-nature': Users,
  'power-state': Shield,
  'equality-hierarchy': Scale,
  'responsibility': Heart,
  'culture-morality': BookOpen,
  'religion-meaning': Sparkles,
  'knowledge-science': Atom,
  'genetics': Dna,
  'ai-tech': Cpu,
  'force-legitimacy': Sword,
  'identity': Flag,
  'personality': Brain
};

const CategoryNav = ({ currentQuestionIndex, responses, onJumpToQuestion }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSectionProgress = (sectionId) => {
    const sectionQuestions = QUESTIONS.filter(q => q.sectionId === sectionId);
    const answered = sectionQuestions.filter(q => {
      const r = responses[q.id];
      return r && Object.keys(r).length > 0;
    }).length;
    return { answered, total: sectionQuestions.length };
  };

  const getFirstQuestionIndex = (sectionId) => {
    return QUESTIONS.findIndex(q => q.sectionId === sectionId);
  };

  const currentSection = QUESTIONS[currentQuestionIndex]?.sectionId;

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:bg-slate-700/60 transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-sm font-medium text-slate-300">Jump to Section</span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} className="text-slate-400" />
        </motion.div>
      </motion.button>

      {isExpanded && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsExpanded(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full left-0 mt-2 w-80 max-h-[70vh] overflow-y-auto bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl z-50 p-3"
          >
            <div className="space-y-1">
              {SECTIONS.map((section) => {
                const IconComponent = sectionIcons[section.id] || Brain;
                const progress = getSectionProgress(section.id);
                const isActive = currentSection === section.id;
                const isComplete = progress.answered === progress.total;

                return (
                  <motion.button
                    key={section.id}
                    onClick={() => {
                      onJumpToQuestion(getFirstQuestionIndex(section.id));
                      setIsExpanded(false);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                      isActive 
                        ? 'bg-indigo-600/30 border border-indigo-500/50' 
                        : 'hover:bg-slate-800/60 border border-transparent'
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      isComplete 
                        ? 'bg-green-500/20 text-green-400' 
                        : isActive 
                          ? 'bg-indigo-500/20 text-indigo-400' 
                          : 'bg-slate-800 text-slate-400'
                    }`}>
                      <IconComponent size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-200 truncate">
                        {section.title}
                      </div>
                      <div className="text-xs text-slate-500">
                        {progress.answered}/{progress.total} answered
                      </div>
                    </div>
                    <div className="w-12 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${isComplete ? 'bg-green-500' : 'bg-indigo-500'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(progress.answered / progress.total) * 100}%` }}
                      />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default CategoryNav;
