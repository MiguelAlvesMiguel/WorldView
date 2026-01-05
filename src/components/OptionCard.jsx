import { useState } from 'react';
import { Check } from 'lucide-react';
import StrengthPicker from './StrengthPicker';

const OptionCard = ({ option, isSelected, strength, onToggle, onStrengthChange }) => {
  const [unsureNote, setUnsureNote] = useState('');
  return (
    <div
      onClick={() => onToggle(option.id)}
      className={`relative rounded-3xl border-3 transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'border-indigo-500/60 bg-gradient-to-br from-indigo-950/80 to-purple-950/60 shadow-2xl shadow-indigo-500/30'
          : 'border-slate-700/40 bg-slate-900/60 hover:border-slate-600/60 hover:bg-slate-800/60'
      } ${option.isUnsure ? 'border-dashed' : ''}`}
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start gap-4">
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
            <h4 className={`font-bold text-lg sm:text-xl mb-2 transition-colors ${isSelected ? 'text-indigo-100' : 'text-slate-100'}`}>
              {option.text}
            </h4>
            <p className={`text-sm sm:text-base leading-relaxed transition-colors ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
              {option.description}
            </p>
          </div>
        </div>

        {/* Strength picker - shown when selected */}
        {isSelected && !option.isUnsure && (
          <div className="mt-6 pt-6 border-t-2 border-slate-700/50 flex justify-center">
            <StrengthPicker
              value={strength}
              onChange={onStrengthChange}
              optionId={option.id}
            />
          </div>
        )}

        {/* Text input for unsure/mixed options */}
        {isSelected && option.isUnsure && (
          <div className="mt-6 pt-6 border-t-2 border-slate-700/50">
            <label className="block text-sm font-semibold text-slate-300 mb-3">
              Care to elaborate? (optional)
            </label>
            <textarea
              value={unsureNote}
              onChange={(e) => {
                e.stopPropagation();
                setUnsureNote(e.target.value);
              }}
              onClick={(e) => e.stopPropagation()}
              placeholder="Share your thoughts on this complex topic..."
              className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-500 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
              rows={3}
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
