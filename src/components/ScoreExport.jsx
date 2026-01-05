import { useState } from 'react';
import { Download, BarChart3, X } from 'lucide-react';
import { QUESTIONS, SECTIONS } from '../data/questionnaire';

const ScoreExport = ({ responses }) => {
  const [showModal, setShowModal] = useState(false);

  // Calculate scores
  const answeredQuestions = Object.keys(responses).filter(qId => 
    responses[qId] && Object.keys(responses[qId]).length > 0
  );
  const totalAnswered = answeredQuestions.length;
  const totalQuestions = QUESTIONS.length;
  const percentComplete = Math.round((totalAnswered / totalQuestions) * 100);

  // Calculate scores by section
  const sectionScores = SECTIONS.map(section => {
    const sectionQuestions = QUESTIONS.filter(q => q.sectionId === section.id);
    const answeredInSection = sectionQuestions.filter(q => 
      responses[q.id] && Object.keys(responses[q.id]).length > 0
    ).length;
    return {
      ...section,
      answered: answeredInSection,
      total: sectionQuestions.length,
      percent: Math.round((answeredInSection / sectionQuestions.length) * 100)
    };
  });

  const exportData = () => {
    const exportObj = {
      exportDate: new Date().toISOString(),
      progress: {
        totalQuestions,
        answered: totalAnswered,
        percentComplete
      },
      responses: answeredQuestions.map(qId => {
        const question = QUESTIONS.find(q => q.id === parseInt(qId));
        const questionResponses = responses[qId];
        return {
          questionId: qId,
          questionText: question?.text,
          sectionId: question?.sectionId,
          selectedOptions: Object.keys(questionResponses).map(optId => {
            const option = question?.options.find(o => o.id === optId);
            return {
              optionId: optId,
              optionText: option?.text,
              strength: questionResponses[optId].strength
            };
          })
        };
      }),
      sectionBreakdown: sectionScores
    };

    const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `worldview-assessment-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="fixed top-20 right-6 z-40 flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-500/20 hover:bg-indigo-500/30 border-2 border-indigo-500/40 text-indigo-300 font-bold text-sm transition-all"
      >
        <BarChart3 size={20} />
        Score: {percentComplete}%
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6">
          <div className="bg-slate-900 rounded-3xl border-2 border-slate-700 p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black text-white">Your Progress</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-slate-300">Overall Progress</span>
                <span className="text-3xl font-black text-indigo-400">{percentComplete}%</span>
              </div>
              <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                  style={{ width: `${percentComplete}%` }}
                />
              </div>
              <p className="text-slate-400 mt-2">
                {totalAnswered} of {totalQuestions} questions answered
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">By Section</h3>
              {sectionScores.map(section => (
                <div key={section.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-200">{section.title}</span>
                    <span className="text-lg font-bold text-indigo-400">{section.percent}%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
                      style={{ width: `${section.percent}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {section.answered} / {section.total} questions
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={exportData}
              className="w-full flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black text-lg hover:shadow-2xl hover:shadow-green-500/50 transition-all"
            >
              <Download size={24} />
              Export All Data (JSON)
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ScoreExport;
