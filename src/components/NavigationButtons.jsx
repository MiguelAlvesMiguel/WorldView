import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle, Sparkles } from 'lucide-react';

const NavigationButtons = ({ 
  currentIndex, 
  totalQuestions, 
  onPrevious, 
  onNext, 
  onFinish
}) => {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-xl border-t-2 border-slate-700/50">
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
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
  );
};

export default NavigationButtons;
