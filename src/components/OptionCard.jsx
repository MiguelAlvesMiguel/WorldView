import { Check } from 'lucide-react';
import StrengthPicker from './StrengthPicker';

const OptionCard = ({ option, isSelected, strength, onToggle, onStrengthChange }) => {
  return (
    <div
      onClick={() => onToggle(option.id)}
      className={`relative rounded-3xl border-3 transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'border-indigo-500/60 bg-gradient-to-br from-indigo-950/80 to-purple-950/60 shadow-2xl shadow-indigo-500/30'
          : 'border-slate-700/40 bg-slate-900/60 hover:border-slate-600/60 hover:bg-slate-800/60'
      } ${option.isUnsure ? 'border-dashed' : ''}`}
    >
      <div className="p-10 sm:p-12">
        <div className="flex items-start gap-8">
          {/* Checkbox */}
          <div
            className={`flex-shrink-0 w-8 h-8 mt-1 rounded-xl border-3 flex items-center justify-center transition-all ${
              isSelected
                ? 'bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-400'
                : 'border-slate-600 bg-slate-800'
            }`}
          >
            {isSelected && <Check size={18} className="text-white" strokeWidth={3} />}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className={`font-bold text-2xl sm:text-3xl mb-4 transition-colors ${isSelected ? 'text-indigo-100' : 'text-slate-100'}`}>
              {option.text}
            </h4>
            <p className={`text-lg sm:text-xl leading-relaxed transition-colors ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
              {option.description}
            </p>
          </div>
        </div>

        {/* Strength picker - shown when selected */}
        {isSelected && !option.isUnsure && (
          <div className="mt-8 pt-8 border-t-2 border-slate-700/50 flex justify-center">
            <StrengthPicker
              value={strength}
              onChange={onStrengthChange}
              optionId={option.id}
            />
          </div>
        )}
      </div>

      {/* Bottom highlight bar */}
      {isSelected && (
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-b-3xl" />
      )}
    </div>
  );
};

export default OptionCard;
