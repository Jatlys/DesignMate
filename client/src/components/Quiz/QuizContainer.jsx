import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizNew.css';
import { BsArrowRight } from 'react-icons/bs';
import { VscClose } from 'react-icons/vsc';
import Chatbot from './QuizChatbot';

const quizData = [
  {
    phase: 'Discover',
    question: 'Select ALL that is fulfilled at this stage',
    options: ['Conducting user interviews', 'Develop high-fidelity prototypes', 'Create user personas', 'Create user journey maps'],
    correctAnswers: ['Conducting user interviews', 'Create user personas', 'Create user journey maps'],
    explanations: {
      'Develop high-fidelity prototypes': 'High-fidelity prototypes are typically created in the "Develop" or "Deliver" phase, not the "Discover" phase.',
    },
  },
  {
    phase: 'Define',
    question: 'Select ALL that is fulfilled at this stage',
    options: ['Create clear problem statements', 'Develop wireframes for solution', 'Synthesize research insights', 'Create user personas'],
    correctAnswers: ['Create clear problem statements', 'Synthesize research insights'],
    explanations: {
      'Develop wireframes for solution': 'Wireframes are part of the "Develop" phase, where solutions are visualized.',
      'Create user personas': 'User personas are created in the "Discover" phase based on initial research.',
    },
  },
  {
    phase: 'Develop',
    question: 'Select ALL that is fulfilled at this stage',
    options: ['Summarize research insights', 'Ideate solutions to identified problems', 'Create high-fidelity prototypes', 'Run usability testing on prototypes'],
    correctAnswers: ['Ideate solutions to identified problems', 'Create high-fidelity prototypes', 'Run usability testing on prototypes'],
     explanations: {
      'Summarize research insights': 'This is typically done in the "Define" phase to clarify the problem.',
    },
  },
  {
    phase: 'Deliver',
    question: 'Select ALL that is fulfilled at this stage',
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
    setTimeout(() => {
      setSubmitted(false);
      setSelectedAnswers(new Set());
    }, 1000); // 1-second delay to show feedback
  };

  const getButtonClass = (option) => {
    if (!submitted) {
      return selectedAnswers.has(option) ? 'selected' : '';
    }
    const isCorrect = currentPhaseData.correctAnswers.includes(option);
    if (selectedAnswers.has(option)) {
      return isCorrect ? 'correct' : 'incorrect';
    }
    return '';
  };

  const progress = ((currentPhaseIndex + 1) / quizData.length) * 100;

  return (
    <div className="quiz-container max-w-sm mx-auto">
      <div className="quiz-header">
        <VscClose className="quiz-icon" onClick={() => navigate('/')} />
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <img src="/assets/Chatbot.svg" alt="Chatbot" className="quiz-icon" onClick={() => setShowChatbot(true)} />
      </div>

      <div className="quiz-content">
        <p className="quiz-phase-title">{currentPhaseData.phase}</p>
        <p className="quiz-question">{currentPhaseData.question}</p>
        <div className="options-container">
          {currentPhaseData.options.map((option) => (
            <button
              key={option}
              className={`option-button ${getButtonClass(option)}`}
              onClick={() => handleSelectAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="quiz-footer">
        <button className="next-button" onClick={handleSubmitAndProceed}>
            <BsArrowRight size={24} />
        </button>
      </div>

      {showExplanation && (
        <div className="modal-overlay">
          <div className="modal-content explanation-modal">
            <button className="close-modal-button" onClick={handleRedo}><VscClose /></button>
            <h3>Wrong Choice!</h3>
            <p>{explanationText}</p>
            <button className="redo-button" onClick={handleRedo}>Redo</button>
          </div>
        </div>
      )}

      {showChatbot && <Chatbot onClose={() => setShowChatbot(false)} />}
    </div>
  );
};

export default QuizContainer;