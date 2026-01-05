import { STRENGTH_LEVELS } from '../data/questionnaire';

const StrengthPicker = ({ value, onChange, optionId }) => {
  const levels = Object.values(STRENGTH_LEVELS);

  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-sm font-bold text-slate-300">
        How strongly do you hold this view?
      </span>
      
      <div className="flex items-center gap-3">
        {levels.map((level) => (
          <button
            key={level.value}
            onClick={(e) => {
              e.stopPropagation();
              onChange(optionId, level.value);
            }}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              value === level.value
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105'
                : 'bg-slate-800/60 text-slate-400 hover:bg-slate-700/60 hover:text-slate-200 border-2 border-slate-700/50'
            }`}
          >
            {level.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StrengthPicker;
