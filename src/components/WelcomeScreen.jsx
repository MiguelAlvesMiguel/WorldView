import { Brain, Play, RotateCcw } from 'lucide-react';

const WelcomeScreen = ({ onStart, onResume, hasProgress }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-32 h-32 mb-8 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border-2 border-indigo-500/30">
          <Brain size={64} className="text-indigo-400" strokeWidth={1.5} />
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6">
          WorldView <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">Mapper</span>
        </h1>

        <p className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
          A multi-dimensional worldview and personality audit.
        </p>

        <p className="text-lg sm:text-xl text-slate-400 mb-12">
          30 questions across 16 dimensions of human thought.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          <div className="bg-slate-800/40 rounded-3xl p-8 border-2 border-slate-700/30">
            <div className="text-indigo-400 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Multi-Select</h3>
            <p className="text-slate-400">
              Choose all options that resonate with your worldview
            </p>
          </div>

          <div className="bg-slate-800/40 rounded-3xl p-8 border-2 border-slate-700/30">
            <div className="text-purple-400 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Conviction Levels</h3>
            <p className="text-slate-400">
              Indicate how strongly you hold each belief
            </p>
          </div>

          <div className="bg-slate-800/40 rounded-3xl p-8 border-2 border-slate-700/30">
            <div className="text-pink-400 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">No Judgments</h3>
            <p className="text-slate-400">
              This maps perspectives, not right or wrong answers
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {hasProgress ? (
            <>
              <button
                onClick={onResume}
                className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/50 transition-all"
              >
                <Play size={24} />
                Continue Assessment
              </button>
              <button
                onClick={onStart}
                className="flex items-center justify-center gap-3 rounded-2xl bg-slate-800/60 hover:bg-slate-700/60 text-slate-200 hover:text-white border-2 border-slate-700/50 font-bold text-lg transition-all"
              >
                <RotateCcw size={24} />
                Start Fresh
              </button>
            </>
          ) : (
            <button
              onClick={onStart}
              className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/50 transition-all"
            >
              <Play size={24} />
              Continue Assessment
            </button>
          )}
        </div>

        <p className="text-slate-500 text-sm mt-8">
          Takes approximately 15-20 minutes
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
