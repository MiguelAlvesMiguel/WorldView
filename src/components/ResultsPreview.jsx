import { useState } from 'react';
import { Eye, X } from 'lucide-react';
import { QUESTIONS, SECTIONS } from '../data/questionnaire';

const ResultsPreview = ({ responses }) => {
  const [showModal, setShowModal] = useState(false);

  // Calculate detailed results
  const getDetailedResults = () => {
    const results = [];
    
    SECTIONS.forEach(section => {
      const sectionQuestions = QUESTIONS.filter(q => q.sectionId === section.id);
      const sectionResponses = sectionQuestions.map(question => {
        const response = responses[question.id];
        if (!response || Object.keys(response).length === 0) return null;
        
        const selectedOptions = Object.keys(response).map(optId => {
          const option = question.options.find(o => o.id === optId);
          return {
            text: option?.text,
            description: option?.description,
            strength: response[optId].strength
          };
        });
        
        return {
          questionText: question.text,
          selections: selectedOptions
        };
      }).filter(Boolean);
      
      if (sectionResponses.length > 0) {
        results.push({
          sectionTitle: section.title,
          responses: sectionResponses
        });
      }
    });
    
    return results;
  };

  const results = getDetailedResults();
  const hasResponses = results.length > 0;

  const getStrengthLabel = (strength) => {
    switch(strength) {
      case 1: return 'Lean';
      case 2: return 'Agree';
      case 3: return 'Strong';
      default: return 'Unknown';
    }
  };

  const getStrengthColor = (strength) => {
    switch(strength) {
      case 1: return 'text-slate-400';
      case 2: return 'text-indigo-400';
      case 3: return 'text-pink-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        disabled={!hasResponses}
        className={`fixed top-20 left-6 z-40 flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
          hasResponses
            ? 'bg-purple-500/20 hover:bg-purple-500/30 border-2 border-purple-500/40 text-purple-300'
            : 'bg-slate-800/20 border-2 border-slate-700/40 text-slate-600 cursor-not-allowed'
        }`}
      >
        <Eye size={20} />
        Preview Results
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8">
          <div className="bg-slate-900 rounded-3xl border-2 border-slate-700 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-900 border-b-2 border-slate-700 p-8 flex items-center justify-between z-10">
              <h2 className="text-4xl font-black text-white">Your Worldview Profile</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-3 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
              >
                <X size={28} />
              </button>
            </div>

            <div className="p-8 space-y-8">
              {results.map((section, idx) => (
                <div key={idx} className="bg-slate-800/50 rounded-3xl p-8 border-2 border-slate-700/50">
                  <h3 className="text-3xl font-black text-white mb-6">{section.sectionTitle}</h3>
                  
                  <div className="space-y-6">
                    {section.responses.map((response, qIdx) => (
                      <div key={qIdx} className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/30">
                        <h4 className="text-xl font-bold text-indigo-300 mb-4">{response.questionText}</h4>
                        
                        <div className="space-y-3">
                          {response.selections.map((selection, sIdx) => (
                            <div key={sIdx} className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/30">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-lg font-bold text-white">{selection.text}</span>
                                <span className={`text-base font-black uppercase ${getStrengthColor(selection.strength)}`}>
                                  {getStrengthLabel(selection.strength)}
                                </span>
                              </div>
                              <p className="text-base text-slate-400 leading-relaxed">{selection.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResultsPreview;
