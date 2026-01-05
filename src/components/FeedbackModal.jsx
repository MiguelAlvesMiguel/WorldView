import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, MessageSquare, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const FeedbackModal = ({ isOpen, onClose, questionId, questionText }) => {
  const [feedback, setFeedback] = useState('');
  const [allFeedback, setAllFeedback] = useState({});
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('write');

  useEffect(() => {
    const stored = localStorage.getItem('worldview_feedback');
    if (stored) {
      const parsed = JSON.parse(stored);
      setAllFeedback(parsed);
      if (questionId && parsed[questionId]) {
        setFeedback(parsed[questionId].text);
      }
    }
  }, [questionId, isOpen]);

  const saveFeedback = () => {
    if (!feedback.trim()) return;
    
    const newFeedback = {
      ...allFeedback,
      [questionId]: {
        text: feedback,
        questionText: questionText,
        timestamp: new Date().toISOString()
      }
    };
    setAllFeedback(newFeedback);
    localStorage.setItem('worldview_feedback', JSON.stringify(newFeedback));
  };

  const deleteFeedback = (id) => {
    const { [id]: _removed, ...rest } = allFeedback;
    setAllFeedback(rest);
    localStorage.setItem('worldview_feedback', JSON.stringify(rest));
    if (id === questionId) {
      setFeedback('');
    }
  };

  const copyAllFeedback = () => {
    const feedbackText = Object.entries(allFeedback)
      .map((entry) => `Question: ${entry[1].questionText}\nFeedback: ${entry[1].text}\n`)
      .join('\n---\n\n');
    
    navigator.clipboard.writeText(feedbackText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between p-5 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Question Feedback</h3>
                <p className="text-xs text-slate-400">Help improve this questionnaire</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <div className="flex border-b border-slate-700/50">
            <button
              onClick={() => setActiveTab('write')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'write'
                  ? 'text-indigo-400 border-b-2 border-indigo-500 bg-indigo-500/5'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              Write Feedback
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'all'
                  ? 'text-indigo-400 border-b-2 border-indigo-500 bg-indigo-500/5'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              All Feedback ({Object.keys(allFeedback).length})
            </button>
          </div>

          <div className="p-5">
            {activeTab === 'write' ? (
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/30">
                  <p className="text-sm text-slate-300 line-clamp-2">{questionText}</p>
                </div>
                
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your thoughts on this question... Is it unclear? Biased? Missing options?"
                  className="w-full h-32 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-200 placeholder-slate-500 resize-none focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30"
                />
                
                <div className="flex justify-end gap-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    onClick={() => {
                      saveFeedback();
                      onClose();
                    }}
                    disabled={!feedback.trim()}
                    className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-500 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Save Feedback
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.keys(allFeedback).length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    No feedback submitted yet
                  </div>
                ) : (
                  <>
                    <div className="flex justify-end">
                      <motion.button
                        onClick={copyAllFeedback}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? 'Copied!' : 'Copy All'}
                      </motion.button>
                    </div>
                    
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {Object.entries(allFeedback).map(([id, data]) => (
                        <div
                          key={id}
                          className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/30"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-slate-500 mb-1 truncate">
                                {data.questionText}
                              </p>
                              <p className="text-sm text-slate-300">{data.text}</p>
                            </div>
                            <button
                              onClick={() => deleteFeedback(id)}
                              className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FeedbackModal;
