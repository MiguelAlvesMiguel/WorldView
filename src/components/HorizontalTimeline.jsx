import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, Scale, Shield, Heart, Sparkles, Users, BookOpen, Atom,
  Dna, Cpu, Sword, Flag, Brain, Pill, Lightbulb, Check, Rainbow, Globe
} from 'lucide-react';
import { SECTIONS, QUESTIONS } from '../data/questionnaire';

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

const HorizontalTimeline = ({ currentIndex, responses, onJumpToQuestion }) => {
  const scrollRef = useRef(null);
  const activeRef = useRef(null);

  // Calculate section progress
  const sectionsWithProgress = SECTIONS.map(section => {
    const sectionQuestions = QUESTIONS.filter(q => q.sectionId === section.id);
    const answeredCount = sectionQuestions.filter(q => 
      responses[q.id] && Object.keys(responses[q.id]).length > 0
    ).length;
    const firstQuestionIndex = QUESTIONS.findIndex(q => q.sectionId === section.id);
    const isActive = QUESTIONS[currentIndex]?.sectionId === section.id;
    const progress = sectionQuestions.length > 0 ? (answeredCount / sectionQuestions.length) * 100 : 0;
    const isComplete = answeredCount === sectionQuestions.length && sectionQuestions.length > 0;
    
    return {
      ...section,
      questionCount: sectionQuestions.length,
      answeredCount,
      firstQuestionIndex,
      isActive,
      progress,
      isComplete
    };
  });

  // Scroll active section into view
  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const element = activeRef.current;
      const containerWidth = container.offsetWidth;
      const elementLeft = element.offsetLeft;
      const elementWidth = element.offsetWidth;
      const scrollLeft = elementLeft - (containerWidth / 2) + (elementWidth / 2);
      
      container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  return (
    <div className="w-full bg-slate-900/80 backdrop-blur-md border-b-2 border-slate-700/50">
      <div 
        ref={scrollRef}
        className="flex items-center gap-3 px-4 py-4 overflow-x-auto"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#4f46e5 #1e293b' }}
      >
        {sectionsWithProgress.map((section, index) => {
          const Icon = sectionIcons[section.id] || Brain;
          
          return (
            <div key={section.id} className="flex items-center">
              <motion.button
                ref={section.isActive ? activeRef : null}
                onClick={() => onJumpToQuestion(section.firstQuestionIndex)}
                className={`relative flex flex-col items-center gap-2 px-3 py-2 rounded-xl transition-all w-[110px] flex-shrink-0
                  ${section.isActive 
                    ? 'bg-indigo-500/30 border-2 border-indigo-500/60 text-white shadow-lg' 
                    : section.isComplete
                      ? 'bg-green-500/20 border-2 border-green-500/40 text-green-400 hover:bg-green-500/30'
                      : 'bg-slate-800/50 border-2 border-slate-700/40 text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center
                  ${section.isActive 
                    ? 'bg-indigo-500/40' 
                    : section.isComplete
                      ? 'bg-green-500/30'
                      : 'bg-slate-700/60'
                  }
                `}>
                  {section.isComplete ? (
                    <Check size={16} className="text-green-400" strokeWidth={3} />
                  ) : (
                    <Icon size={16} />
                  )}
                </div>
                
                <span className={`text-[9px] font-bold text-center transition-all leading-tight truncate w-full px-1`}>
                  {section.title}
                </span>
                
                {/* Progress indicator - always show */}
                <span className="text-[10px] text-slate-400 font-semibold">
                  {section.answeredCount}/{section.questionCount}
                </span>
                
                {/* Progress bar under button */}
                <div className="absolute bottom-0 left-2 right-2 h-1 bg-slate-700/50 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full ${section.isComplete ? 'bg-green-500' : 'bg-indigo-500'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${section.progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.button>
              
              {/* Connector line */}
              {index < sectionsWithProgress.length - 1 && (
                <div className={`
                  w-6 h-1 mx-1
                  ${section.isComplete ? 'bg-green-500/50' : 'bg-slate-700/50'}
                `} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalTimeline;
