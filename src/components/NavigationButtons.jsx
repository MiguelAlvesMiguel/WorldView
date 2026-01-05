import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle, ChevronsLeft, ChevronsRight, Sparkles } from 'lucide-react';

const NavigationButtons = ({ 
  currentIndex, 
  totalQuestions, 
  onPrevious, 
  onNext, 
  onFinish, 
  currentQuestion, 
  questions = [] 
}) => {
  // Find questions in same section
  const sectionQuestions = questions.length > 0 && currentQuestion 
    ? questions.filter(q => q.sectionId === currentQuestion.sectionId) 
    : [];
  const currentIndexInSection = currentQuestion ? sectionQuestions.findIndex(q => q.id === currentQuestion.id) : -1;
  const hasPrevInSection = currentIndexInSection > 0;
  const hasNextInSection = currentIndexInSection < sectionQuestions.length - 1;
  
  const goToPrevInSection = () => {
    if (hasPrevInSection) {
      const prevQuestion = sectionQuestions[currentIndexInSection - 1];
      const globalIndex = questions.findIndex(q => q.id === prevQuestion.id);
      if (globalIndex >= 0) onPrevious();
    }
  };
  
  const goToNextInSection = () => {
    if (hasNextInSection) {
      const nextQuestion = sectionQuestions[currentIndexInSection + 1];
      const globalIndex = questions.findIndex(q => q.id === nextQuestion.id);
      if (globalIndex >= 0) onNext();
    }
  };
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-slate-900/80 backdrop-blur-md border-t-2 border-slate-700/50 p-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Section navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevInSection}
            disabled={!hasPrevInSection}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
              hasPrevInSection
                ? 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-200'
                : 'bg-slate-800/30 text-slate-600 cursor-not-allowed'
            }`}
            title="Previous question in section"
          >
            <ChevronsLeft size={16} />
          </button>
          <button
            onClick={goToNextInSection}
            disabled={!hasNextInSection}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
              hasNextInSection
                ? 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-200'
                : 'bg-slate-800/30 text-slate-600 cursor-not-allowed'
            }`}
            title="Next question in section"
          >
            <ChevronsRight size={16} />
          </button>
          <span className="text-xs text-slate-500 ml-2">
            {currentIndexInSection + 1} / {sectionQuestions.length} in section
          </span>
        </div>
        
        {/* Main navigation */}
        <div className="flex items-center gap-3">
        <motion.button
          onClick={onPrevious}
          disabled={isFirst}
          className={`flex items-center gap-3 px-10 py-5 rounded-3xl font-bold text-lg transition-all ${
            isFirst
              ? 'text-slate-600 cursor-not-allowed'
              : 'text-slate-200 hover:text-white bg-slate-800/60 hover:bg-slate-700/60 border-2 border-slate-700/50'
          }`}
          whileHover={!isFirst ? { x: -4 } : {}}
          whileTap={!isFirst ? { scale: 0.95 } : {}}
        >
          <ChevronLeft size={24} />
          Previous
        </motion.button>

        <div className="hidden sm:flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-800/40 border-2 border-slate-700/30">
          <Sparkles size={20} className="text-indigo-400" />
          <span className="text-slate-200 font-bold text-lg">
            {currentIndex + 1}
          </span>
          <span className="text-slate-500">/</span>
          <span className="text-slate-400 text-lg">
            {totalQuestions}
          </span>
        </div>

        {isLast ? (
          <motion.button
            onClick={onFinish}
            className="flex items-center gap-3 px-12 py-5 rounded-3xl font-black text-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-2xl shadow-green-500/40 hover:shadow-green-500/60 transition-all"
            whileHover={{ scale: 1.03, x: 4 }}
            whileTap={{ scale: 0.97 }}
          >
            <CheckCircle size={24} />
            Complete Assessment
          </motion.button>
        ) : (
          <motion.button
            onClick={onNext}
            className="flex items-center gap-3 px-12 py-5 rounded-3xl font-black text-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-2xl shadow-indigo-500/40 hover:shadow-indigo-500/60 transition-all"
            whileHover={{ scale: 1.03, x: 4 }}
            whileTap={{ scale: 0.97 }}
          >
            Continue
            <ChevronRight size={24} />
          </motion.button>
        )}
        </div>
      </div>
    </div>
  );
};

export default NavigationButtons;
