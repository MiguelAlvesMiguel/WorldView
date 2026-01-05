import { MessageSquarePlus } from 'lucide-react';
import OptionCard from './OptionCard';

const QuestionCard = ({ question, questionIndex, totalQuestions, responses, onToggleOption, onStrengthChange, onOpenFeedback }) => {
  const questionResponses = responses[question.id] || {};

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl mx-auto px-8">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-4 mb-8 flex-wrap justify-center">
          <span className="px-8 py-4 rounded-3xl bg-slate-800/80 text-indigo-400 font-mono text-lg border-2 border-slate-700/50">
            Question {questionIndex + 1} of {totalQuestions}
          </span>
          {question.multiSelect && (
            <span className="px-6 py-4 rounded-3xl bg-purple-900/40 text-purple-300 text-base font-semibold border-2 border-purple-700/30">
              Select all that apply
            </span>
          )}
          <button
            onClick={() => onOpenFeedback(question.id, question.text)}
            className="p-4 rounded-2xl bg-slate-800/60 text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 border-2 border-slate-700/50 transition-all"
            title="Report or suggest feedback for this question"
          >
            <MessageSquarePlus size={24} />
          </button>
        </div>
        
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6 px-4">
          {question.text}
        </h2>
        
        <p className="text-slate-400 text-lg sm:text-xl">
          Select your views, then indicate how strongly you hold each one
        </p>
      </div>

      <div className="space-y-6 w-full">
        {question.options.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            isSelected={!!questionResponses[option.id]}
            strength={questionResponses[option.id]?.strength || 2}
            onToggle={(optionId) => onToggleOption(question.id, optionId)}
            onStrengthChange={(optionId, strength) => onStrengthChange(question.id, optionId, strength)}
          />
        ))}
      </div>
      </div>
    </div>
  );
};

export default QuestionCard;
