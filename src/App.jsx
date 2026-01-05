import { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { QUESTIONS, getSectionById } from './data/questionnaire';
import WelcomeScreen from './components/WelcomeScreen';
import QuestionCard from './components/QuestionCard';
import HorizontalTimeline from './components/HorizontalTimeline';
import NavigationButtons from './components/NavigationButtons';
import SectionTransition from './components/SectionTransition';
import ResultsScreen from './components/ResultsScreen';
import ShaderBackground from './components/ShaderBackground';
import FeedbackModal from './components/FeedbackModal';
import SaveIndicator from './components/SaveIndicator';
import ScoreExport from './components/ScoreExport';
import ResultsPreview from './components/ResultsPreview';
import { useLocalStorage, clearStoredProgress } from './hooks/useLocalStorage';

const SCREENS = {
  WELCOME: 'welcome',
  SECTION_INTRO: 'section_intro',
  QUESTION: 'question',
  RESULTS: 'results'
};

function App() {
  const [screen, setScreen] = useState(SCREENS.WELCOME);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useLocalStorage('worldview_currentIndex', 0);
  const [responses, setResponses] = useLocalStorage('worldview_responses', {});
  const [showSectionIntro, setShowSectionIntro] = useState(true);
  const [lastSectionId, setLastSectionId] = useState(null);
  const [hasExistingProgress, setHasExistingProgress] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState({ isOpen: false, questionId: null, questionText: '' });
  const [lastSaved, setLastSaved] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const saveTimeoutRef = useRef(null);

  useEffect(() => {
    const savedResponses = localStorage.getItem('worldview_responses');
    if (savedResponses && Object.keys(JSON.parse(savedResponses)).length > 0) {
      setHasExistingProgress(true);
    }
  }, []);

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const currentSection = currentQuestion ? getSectionById(currentQuestion.sectionId) : null;

  
  useEffect(() => {
    if (currentSection && currentSection.id !== lastSectionId && screen === SCREENS.QUESTION) {
      setShowSectionIntro(true);
      setLastSectionId(currentSection.id);
    }
  }, [currentSection, lastSectionId, screen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (screen !== SCREENS.QUESTION || showSectionIntro) return;
      
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleStartFresh = useCallback(() => {
    setCurrentQuestionIndex(0);
    setResponses({});
    setScreen(SCREENS.QUESTION);
    setShowSectionIntro(true);
    setLastSectionId(QUESTIONS[0].sectionId);
    setHasExistingProgress(false);
    clearStoredProgress();
  }, [setCurrentQuestionIndex, setResponses]);

  const handleContinue = useCallback(() => {
    setScreen(SCREENS.QUESTION);
    const question = QUESTIONS[currentQuestionIndex];
    if (question) {
      setLastSectionId(question.sectionId);
      setShowSectionIntro(true);
    }
  }, [currentQuestionIndex]);

  // Trigger save indicator on response changes
  useEffect(() => {
    if (Object.keys(responses).length > 0) {
      setIsSaving(true);
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        setIsSaving(false);
        setLastSaved(Date.now());
      }, 500);
    }
  }, [responses]);

  const handleToggleOption = useCallback((questionId, optionId) => {
    setResponses(prev => {
      const questionResponses = prev[questionId] || {};
      
      if (questionResponses[optionId]) {
        const { [optionId]: _removed, ...rest } = questionResponses;
        return {
          ...prev,
          [questionId]: rest
        };
      } else {
        return {
          ...prev,
          [questionId]: {
            ...questionResponses,
            [optionId]: { strength: 2 }
          }
        };
      }
    });
  }, [setResponses]);

  const handleStrengthChange = useCallback((questionId, optionId, strength) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [optionId]: { strength }
      }
    }));
  }, [setResponses]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      const currentQ = QUESTIONS[currentQuestionIndex];
      const nextQ = QUESTIONS[nextIndex];
      
      // Show section intro only if moving to a new section
      if (currentQ.sectionId !== nextQ.sectionId) {
        setShowSectionIntro(true);
        setLastSectionId(nextQ.sectionId);
      }
      
      setCurrentQuestionIndex(nextIndex);
    }
  }, [currentQuestionIndex, setCurrentQuestionIndex]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      const prevQuestion = QUESTIONS[currentQuestionIndex - 1];
      if (prevQuestion.sectionId !== currentQuestion.sectionId) {
        setLastSectionId(prevQuestion.sectionId);
        setShowSectionIntro(false);
      }
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex, currentQuestion, setCurrentQuestionIndex]);

  const handleFinish = useCallback(() => {
    setScreen(SCREENS.RESULTS);
  }, []);

  const handleRestart = useCallback(() => {
    setScreen(SCREENS.WELCOME);
    setCurrentQuestionIndex(0);
    setResponses({});
    setLastSectionId(null);
    setShowSectionIntro(true);
    setHasExistingProgress(false);
    clearStoredProgress();
  }, [setCurrentQuestionIndex, setResponses]);

  const handleSectionContinue = useCallback(() => {
    setShowSectionIntro(false);
  }, []);

  const handleJumpToQuestion = useCallback((index) => {
    if (index >= 0 && index < QUESTIONS.length) {
      const targetQuestion = QUESTIONS[index];
      setCurrentQuestionIndex(index);
      setLastSectionId(targetQuestion.sectionId);
      // Don't show section intro when jumping manually
      setShowSectionIntro(false);
    }
  }, [setCurrentQuestionIndex]);

  const handleOpenFeedback = useCallback((questionId, questionText) => {
    setFeedbackModal({ isOpen: true, questionId, questionText });
  }, []);

  const handleCloseFeedback = useCallback(() => {
    setFeedbackModal({ isOpen: false, questionId: null, questionText: '' });
  }, []);

  // Calculate progress percentage
  const answeredCount = Object.keys(responses).filter(qId => 
    responses[qId] && Object.keys(responses[qId]).length > 0
  ).length;
  const progressPercent = Math.round((answeredCount / QUESTIONS.length) * 100);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ShaderBackground opacity={0.4} />
      
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {screen === SCREENS.WELCOME && (
            <WelcomeScreen 
              key="welcome" 
              onStart={handleStartFresh} 
              onContinue={handleContinue}
              hasExistingProgress={hasExistingProgress}
            />
          )}

          {screen === SCREENS.QUESTION && showSectionIntro && currentSection && (
            <SectionTransition
              key={`section-${currentSection.id}`}
              section={currentSection}
              onContinue={handleSectionContinue}
            />
          )}

          {screen === SCREENS.QUESTION && !showSectionIntro && (
            <>
              {/* Horizontal Timeline */}
              <div className="fixed top-0 left-0 right-0 z-40">
                <HorizontalTimeline
                  currentIndex={currentQuestionIndex}
                  responses={responses}
                  onJumpToQuestion={handleJumpToQuestion}
                />
                
                {/* Progress percentage bar */}
                <div className="bg-slate-900/60 backdrop-blur-sm border-b-2 border-slate-800/50 px-8 py-3">
                  <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <span className="text-base font-bold text-slate-300">
                      {currentSection?.title}
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-black text-indigo-400">
                        {progressPercent}% complete
                      </span>
                      <div className="w-48 h-3 bg-slate-800 rounded-full overflow-hidden border-2 border-slate-700/50">
                        <div 
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Score/Export Button */}
              <ScoreExport responses={responses} />
              
              {/* Results Preview Button */}
              <ResultsPreview responses={responses} />
              
              <div className="pt-56 pb-48 px-8 sm:px-12 lg:px-16">
                <QuestionCard
                  key={currentQuestion.id}
                  question={currentQuestion}
                  questionIndex={currentQuestionIndex}
                  totalQuestions={QUESTIONS.length}
                  responses={responses}
                  onToggleOption={handleToggleOption}
                  onStrengthChange={handleStrengthChange}
                  onOpenFeedback={handleOpenFeedback}
                />
              </div>

              <NavigationButtons
                currentIndex={currentQuestionIndex}
                totalQuestions={QUESTIONS.length}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onFinish={handleFinish}
              />
            </>
          )}

          {screen === SCREENS.RESULTS && (
            <ResultsScreen
              key="results"
              responses={responses}
              onRestart={handleRestart}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Save indicator */}
      <SaveIndicator lastSaved={lastSaved} isSaving={isSaving} />

      <FeedbackModal
        isOpen={feedbackModal.isOpen}
        onClose={handleCloseFeedback}
        questionId={feedbackModal.questionId}
        questionText={feedbackModal.questionText}
      />
    </div>
  );
}

export default App
