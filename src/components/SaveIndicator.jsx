import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Cloud, Loader2 } from 'lucide-react';

const SaveIndicator = ({ lastSaved, isSaving }) => {
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (lastSaved) {
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [lastSaved]);

  return (
    <div className="fixed top-4 right-4 z-50">
      <AnimatePresence mode="wait">
        {isSaving && (
          <motion.div
            key="saving"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 text-slate-300"
          >
            <Loader2 size={16} className="animate-spin text-indigo-400" />
            <span className="text-sm font-medium">Saving...</span>
          </motion.div>
        )}
        
        {!isSaving && showSaved && (
          <motion.div
            key="saved"
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/20 backdrop-blur-sm border border-green-500/30 text-green-400"
          >
            <Check size={16} />
            <span className="text-sm font-medium">Progress saved</span>
          </motion.div>
        )}
        
        {!isSaving && !showSaved && (
          <motion.div
            key="cloud"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/60 backdrop-blur-sm border border-slate-700/30 text-slate-500"
          >
            <Cloud size={14} />
            <span className="text-xs">Auto-saved</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SaveIndicator;
