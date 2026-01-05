import { useState } from 'react';
import { Eye, X, Copy, Download, Check } from 'lucide-react';
import { QUESTIONS, SECTIONS } from '../data/questionnaire';

const ResultsPreview = ({ responses }) => {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Get ALL questions with their responses (or indicate not answered)
  const getAllResults = () => {
    const results = [];
    
    SECTIONS.forEach(section => {
      const sectionQuestions = QUESTIONS.filter(q => q.sectionId === section.id);
      const questionData = sectionQuestions.map(question => {
        const response = responses[question.id];
        
        if (!response || Object.keys(response).length === 0) {
          return {
            questionText: question.text,
            answered: false,
            selections: []
          };
        }
        
        const selectedOptions = Object.keys(response).map(optId => {
          const option = question.options.find(o => o.id === optId);
          return {
            text: option?.text,
            description: option?.description,
            strength: response[optId].strength,
            isUnsure: option?.isUnsure
          };
        });
        
        return {
          questionText: question.text,
          answered: true,
          selections: selectedOptions
        };
      });
      
      results.push({
        sectionTitle: section.title,
        sectionDescription: section.description,
        questions: questionData
      });
    });
    
    return results;
  };

  const allResults = getAllResults();

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

  const generateMarkdown = () => {
    let md = '# WorldView Mapper Results\n\n';
    md += `Generated: ${new Date().toLocaleString()}\n\n`;
    md += '---\n\n';
    
    allResults.forEach(section => {
      md += `## ${section.sectionTitle}\n`;
      md += `*${section.sectionDescription}*\n\n`;
      
      section.questions.forEach(question => {
        md += `### ${question.questionText}\n\n`;
        
        if (!question.answered) {
          md += '**Not answered**\n\n';
        } else {
          question.selections.forEach(sel => {
            const strengthLabel = sel.isUnsure ? '' : ` (${getStrengthLabel(sel.strength)})`;
            md += `- **${sel.text}**${strengthLabel}\n`;
            md += `  - ${sel.description}\n`;
          });
          md += '\n';
        }
      });
      
      md += '---\n\n';
    });
    
    return md;
  };

  const copyToClipboard = async () => {
    const markdown = generateMarkdown();
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMarkdown = () => {
    const markdown = generateMarkdown();
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `worldview-results-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all bg-purple-500/20 hover:bg-purple-500/30 border-2 border-purple-500/40 text-purple-300"
      >
        <Eye size={20} />
        Preview Results
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8">
          <div className="bg-slate-900 rounded-3xl border-2 border-slate-700 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-900 border-b-2 border-slate-700 p-6 z-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-black text-white">Your Worldview Profile</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 border-2 border-indigo-500/40 text-indigo-300 transition-all text-sm font-semibold"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
                <button
                  onClick={downloadMarkdown}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/20 hover:bg-green-500/30 border-2 border-green-500/40 text-green-300 transition-all text-sm font-semibold"
                >
                  <Download size={16} />
                  Download .md
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {allResults.map((section, idx) => (
                <div key={idx} className="bg-slate-800/50 rounded-2xl p-6 border-2 border-slate-700/50">
                  <h3 className="text-2xl font-black text-white mb-1">{section.sectionTitle}</h3>
                  <p className="text-xs text-slate-400 mb-4">{section.sectionDescription}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.questions.map((question, qIdx) => (
                      <div key={qIdx} className={`rounded-xl p-4 border-2 ${
                        question.answered 
                          ? 'bg-slate-900/50 border-slate-700/30' 
                          : 'bg-slate-900/20 border-slate-700/20 opacity-60'
                      }`}>
                        <h4 className={`text-sm font-bold mb-2 ${
                          question.answered ? 'text-indigo-300' : 'text-slate-500'
                        }`}>{question.questionText}</h4>
                        
                        {!question.answered ? (
                          <p className="text-xs text-slate-600 italic">Not answered</p>
                        ) : (
                          <div className="space-y-2">
                            {question.selections.map((selection, sIdx) => (
                              <div key={sIdx} className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/20">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <span className="text-xs font-semibold text-white">{selection.text}</span>
                                  {!selection.isUnsure && (
                                    <span className={`text-[10px] font-black uppercase whitespace-nowrap ${getStrengthColor(selection.strength)}`}>
                                      {getStrengthLabel(selection.strength)}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-400 leading-tight">{selection.description}</p>
                              </div>
                            ))}
                          </div>
                        )}
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
