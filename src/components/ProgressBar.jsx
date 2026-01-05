import { motion } from 'framer-motion';
import CategoryNav from './CategoryNav';

const ProgressBar = ({ current, total, currentSection, responses, onJumpToQuestion }) => {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-700/50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <CategoryNav
              currentQuestionIndex={current}
              responses={responses}
              onJumpToQuestion={onJumpToQuestion}
            />
            <div className="h-5 w-px bg-slate-700" />
            <span className="text-sm font-semibold text-slate-200">
              {currentSection?.title || 'Loading...'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-400">
              {Math.round(progress)}% complete
            </span>
          </div>
        </div>
        
        <div className="h-2.5 bg-slate-800/80 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
