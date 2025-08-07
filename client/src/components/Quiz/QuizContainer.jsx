import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, X, Bot } from 'lucide-react';
import GeneralChatbot from '../GeneralChatbot';

const quizData = [
  {
    phase: 'Discover',
    question: 'Select ALL the methods that you carry out at this stage',
    options: ['Conducting user interviews', 'Develop high-fidelity prototypes', 'Create user personas', 'Create user journey maps'],
    correctAnswers: ['Conducting user interviews', 'Create user personas', 'Create user journey maps'],
    explanations: {
      'Develop high-fidelity prototypes': 'High-fidelity prototypes are typically created in the "Develop" or "Deliver" phase, not the "Discover" phase.',
    },
  },
  {
    phase: 'Define',
    question: 'Select ALL the methods that you carry out at this stage',
    options: ['Create clear problem statements', 'Develop wireframes for solution', 'Synthesize research insights', 'Create user personas'],
    correctAnswers: ['Create clear problem statements', 'Synthesize research insights'],
    explanations: {
      'Develop wireframes for solution': 'Wireframes are part of the "Develop" phase, where solutions are visualized.',
      'Create user personas': 'User personas are created in the "Discover" phase based on initial research.',
    },
  },
  {
    phase: 'Develop',
    question: 'Select ALL the methods that you carry out at this stage',
    options: ['Summarize research insights', 'Ideate solutions to identified problems', 'Create high-fidelity prototypes', 'Run usability testing on prototypes'],
    correctAnswers: ['Ideate solutions to identified problems', 'Create high-fidelity prototypes', 'Run usability testing on prototypes'],
    explanations: {
      'Summarize research insights': 'This is typically done in the "Define" phase to clarify the problem.',
    },
  },
  {
    phase: 'Deliver',
    question: 'Select ALL the methods that you carry out at this stage',
    options: ['Test early prototypes with users', 'Create physical prototypes', 'Storyboard user ideas', 'Create user personas'],
    correctAnswers: ['Test early prototypes with users', 'Create physical prototypes', 'Storyboard user ideas'],
    explanations: {
      'Create user personas': 'User personas are created in the "Discover" phase.',
    },
  },
];

const QuizContainer = () => {
  const navigate = useNavigate();
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [explanationText, setExplanationText] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);
  const [allAnswers, setAllAnswers] = useState({});

  const currentPhaseData = quizData[currentPhaseIndex];

  const handleSelectAnswer = (option) => {
    if (submitted) return;
    const newSelectedAnswers = new Set(selectedAnswers);
    if (newSelectedAnswers.has(option)) {
      newSelectedAnswers.delete(option);
    } else {
      newSelectedAnswers.add(option);
    }
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleSubmitAndProceed = () => {
    setSubmitted(true);

    const correctAnswers = new Set(currentPhaseData.correctAnswers);
    const isFullyCorrect = selectedAnswers.size === correctAnswers.size && [...selectedAnswers].every(answer => correctAnswers.has(answer));

    if (isFullyCorrect) {
      const newAnswers = { ...allAnswers, [currentPhaseIndex]: selectedAnswers };
      setAllAnswers(newAnswers);

      if (currentPhaseIndex < quizData.length - 1) {
        setCurrentPhaseIndex(currentPhaseIndex + 1);
        setSelectedAnswers(new Set());
        setSubmitted(false);
      } else {
        let finalScore = 0;
        quizData.forEach((phase, index) => {
          const userAnswersForPhase = newAnswers[index] || new Set();
          const correctAnswersForPhase = new Set(phase.correctAnswers);
          if (userAnswersForPhase.size === correctAnswersForPhase.size && [...userAnswersForPhase].every(answer => correctAnswersForPhase.has(answer))) {
            finalScore++;
          }
        });
        navigate('/quiz/completed', { state: { score: finalScore, totalQuestions: quizData.length } });
      }
    } else {
      let feedbackText = '';
      const incorrectSelection = [...selectedAnswers].find(answer => !correctAnswers.has(answer));

      if (incorrectSelection) {
        const explanation = currentPhaseData.explanations[incorrectSelection];
        feedbackText = `"${incorrectSelection}" is incorrect. ${explanation || 'This is not a correct option for this phase.'}`;
      } else {
        const missedAnswer = currentPhaseData.correctAnswers.find(ans => !selectedAnswers.has(ans));
        if (missedAnswer) {
          const explanation = currentPhaseData.explanations[missedAnswer];
          feedbackText = `You missed "${missedAnswer}". ${explanation || 'This is a required option.'}`;
        }
      }
      setExplanationText(feedbackText || 'Please select all the correct answers to proceed.');
      setShowExplanation(true);
    }
  };
  
  const handleRedo = () => {
    setShowExplanation(false);
    setSubmitted(false);
    setSelectedAnswers(new Set());
  };

  const getButtonClass = (option) => {
    const baseClass = 'w-full text-left py-4 px-6 rounded-lg transition-colors duration-200 font-semibold';
    if (!submitted) {
      return selectedAnswers.has(option)
        ? `${baseClass} bg-black text-white`
        : `${baseClass} bg-gray-100 hover:bg-gray-200 text-gray-800`;
    }

    const isCorrect = currentPhaseData.correctAnswers.includes(option);
    if (selectedAnswers.has(option)) {
      return isCorrect
        ? `${baseClass} bg-green-500 text-white` // Correct and selected
        : `${baseClass} bg-red-500 text-white`; // Incorrect and selected
    } else {
      return isCorrect
        ? `${baseClass} bg-green-100 text-green-800` // Correct but not selected
        : `${baseClass} bg-gray-100 text-gray-800`; // Not selected, not correct
    }
  };

  const progress = ((currentPhaseIndex + 1) / quizData.length) * 100;

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center p-4 pt-20 pb-28 overflow-hidden">
      {/* Header */}
      <header className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 max-w-sm mx-auto">
        <button onClick={() => navigate('/')} className="p-2">
          <X className="w-8 h-8 text-gray-700" />
        </button>
        <button onClick={() => setShowChatbot(true)} className="p-2">
          <Bot className="w-8 h-8 text-gray-700" />
        </button>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-sm h-full flex flex-col items-center">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-black h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="text-center mb-6 w-full">
          <h2 className="text-4xl font-serif text-black mb-2">{currentPhaseData.phase}</h2>
          <p className="text-gray-600">{currentPhaseData.question}</p>
        </div>

        <div className="w-full flex-grow overflow-y-auto space-y-3 pr-2">
          {currentPhaseData.options.map((option) => (
            <button
              key={option}
              className={getButtonClass(option)}
              onClick={() => handleSelectAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 right-4">
        <button 
          onClick={handleSubmitAndProceed} 
          className="bg-black hover:bg-gray-800 text-white rounded-full p-4 shadow-lg transition-colors"
          disabled={submitted}
        >
          <ArrowRight size={24} />
        </button>
      </footer>

      {showExplanation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center">
            <h3 className="text-xl font-bold font-serif mb-4 text-red-500">Wrong Choice!</h3>
            <p className="text-gray-600 mb-6">{explanationText}</p>
            <button 
              onClick={handleRedo} 
              className="w-full bg-black text-white font-semibold py-3 rounded-full hover:bg-gray-800 transition-colors"
            >
              Redo
            </button>
          </div>
        </div>
      )}

      {showChatbot && <GeneralChatbot onClose={() => setShowChatbot(false)} />}
    </div>
  );
};

export default QuizContainer;