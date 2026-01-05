import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { 
  Brain, BarChart3, Download, RefreshCcw, ChevronDown, ChevronUp,
  Compass, Scale, Shield, Heart, Sparkles, Users, BookOpen, Atom,
  Dna, Cpu, Sword, Flag
} from 'lucide-react';
import { SECTIONS, QUESTIONS, STRENGTH_LEVELS } from '../data/questionnaire';

const sectionIcons = {
  'meta': Compass,
  'human-nature': Users,
  'power-state': Shield,
  'equality-hierarchy': Scale,
  'responsibility': Heart,
  'culture-morality': BookOpen,
  'religion-meaning': Sparkles,
  'knowledge-science': Atom,
  'genetics': Dna,
  'ai-tech': Cpu,
  'force-legitimacy': Sword,
  'identity': Flag,
  'personality': Brain
};

const ResultsScreen = ({ responses, onRestart }) => {
  const [expandedSections, setExpandedSections] = useState({});

  const analysis = useMemo(() => {
    const sectionScores = {};
    const totalResponses = Object.keys(responses).length;
    let totalSelections = 0;
    let strongSelections = 0;

    SECTIONS.forEach(section => {
      const sectionQuestions = QUESTIONS.filter(q => q.sectionId === section.id);
      const sectionResponses = [];

      sectionQuestions.forEach(question => {
        const qResponses = responses[question.id] || {};
        Object.entries(qResponses).forEach(([optionId, data]) => {
          sectionResponses.push({
            questionId: question.id,
            optionId,
            strength: data.strength,
            option: question.options.find(o => o.id === optionId)
          });
          totalSelections++;
          if (data.strength === 3) strongSelections++;
        });
      });

      sectionScores[section.id] = {
        section,
        responses: sectionResponses,
        responseCount: sectionResponses.length,
        avgStrength: sectionResponses.length > 0 
          ? sectionResponses.reduce((acc, r) => acc + r.strength, 0) / sectionResponses.length 
          : 0
      };
    });

    return {
      sectionScores,
      totalResponses,
      totalSelections,
      strongSelections,
      completionRate: (totalResponses / QUESTIONS.length) * 100
    };
  }, [responses]);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const exportResults = () => {
    const data = {
      timestamp: new Date().toISOString(),
      responses,
      analysis: {
        totalSelections: analysis.totalSelections,
        strongSelections: analysis.strongSelections,
        completionRate: analysis.completionRate
      }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `worldview-results-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-20 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 p-1">
            <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center">
              <BarChart3 className="w-10 h-10 text-green-400" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Your WorldView Profile
          </h1>
          
          <p className="text-slate-400 max-w-lg mx-auto">
            Based on {analysis.totalSelections} selections across {analysis.totalResponses} questions
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-center">
            <div className="text-3xl font-bold text-indigo-400">{analysis.totalSelections}</div>
            <div className="text-sm text-slate-400">Total Selections</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-center">
            <div className="text-3xl font-bold text-purple-400">{analysis.strongSelections}</div>
            <div className="text-sm text-slate-400">Strong Convictions</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-center">
            <div className="text-3xl font-bold text-pink-400">{Math.round(analysis.completionRate)}%</div>
            <div className="text-sm text-slate-400">Completion</div>
          </div>
        </motion.div>

        <div className="space-y-4 mb-8">
          {SECTIONS.map((section, index) => {
            const score = analysis.sectionScores[section.id];
            const IconComponent = sectionIcons[section.id] || Brain;
            const isExpanded = expandedSections[section.id];

            return (
              <motion.div
                key={section.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="rounded-xl bg-slate-800/50 border border-slate-700/50 overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-4 flex items-center gap-4 hover:bg-slate-700/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <IconComponent size={20} />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-white">{section.title}</h3>
                    <p className="text-xs text-slate-400">{score.responseCount} selections</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {[1, 2, 3].map(level => (
                        <div
                          key={level}
                          className={`w-3 h-3 rounded-full ${
                            score.avgStrength >= level
                              ? 'bg-indigo-500'
                              : 'bg-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                    {isExpanded ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                  </div>
                </button>

                {isExpanded && score.responses.length > 0 && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    className="border-t border-slate-700/50 p-4 space-y-2"
                  >
                    {score.responses.map((response, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-2 rounded-lg bg-slate-900/50"
                      >
                        <div className="flex gap-0.5">
                          {[1, 2, 3].map(level => (
                            <div
                              key={level}
                              className={`w-2 h-2 rounded-full ${
                                response.strength >= level
                                  ? 'bg-purple-500'
                                  : 'bg-slate-700'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-slate-300">
                          {response.option?.text}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            onClick={exportResults}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download size={18} />
            Export Results
          </motion.button>
          
          <motion.button
            onClick={onRestart}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RefreshCcw size={18} />
            Start Over
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResultsScreen;
