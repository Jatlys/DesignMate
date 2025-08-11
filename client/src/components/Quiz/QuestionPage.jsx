import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizNew.css'; // Import the new CSS file
import { questions } from './questions'; // Assuming questions are in this file
import { ArrowLeft, ArrowRight } from 'lucide-react';


const Section = ({ title, children, icon }) => (
  <div className="mb-6">
    <div className="flex items-center mb-2">
      <div className="w-1 bg-black h-6 mr-3"></div>
      <h3 className="font-bold text-lg">{title}</h3>
      {icon && <img src={icon} alt="icon" className="ml-2 w-5 h-5" />}
    </div>
    <div className="text-gray-700 text-sm ml-4">{children}</div>
  </div>
);

const WrongAnswerModal = ({ explanation, onRedo }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <div className="modal-body">
        <h3>Wrong Choice!</h3>
        <p>{explanation}</p>
      </div>
      <div className="modal-footer">
        <button onClick={onRedo} className="redo-button">Redo</button>
      </div>
    </div>
  </div>
);

const QuestionPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalExplanation, setModalExplanation] = useState('');
  const navigate = useNavigate();

  if (!questions || questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (option) => {
    const newSelectedAnswers = selectedAnswers.includes(option)
      ? selectedAnswers.filter(a => a !== option)
      : [...selectedAnswers, option];
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleSubmit = () => {
    const correctAnswers = currentQuestion.correct.sort();
    const userAnswers = selectedAnswers.sort();

    if (JSON.stringify(correctAnswers) === JSON.stringify(userAnswers)) {
      setSelectedAnswers([]);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        navigate('/quiz/completed');
      }
    } else {
      setModalExplanation(currentQuestion.explanation);
      setShowModal(true);
    }
  };

  const handleRedo = () => {
    setShowModal(false);
    setSelectedAnswers([]);
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="quiz-page max-w-4xl mx-auto">
      {showModal && <WrongAnswerModal explanation={modalExplanation} onRedo={handleRedo} />}

      {/* Header section with a close button and a chat icon. */}
      <header className="flex justify-between items-center mb-6">
        <button onClick={handleClose} className="text-2xl">&times;</button>
        <button className="p-2 border rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </button>
      </header>

      {/* Progress bar to show the user's progress through the quiz. */}
      <div className="relative w-full h-2 bg-gray-200 rounded-full mb-8">
        <div className="absolute top-0 left-0 h-2 bg-gray-400 rounded-full" style={{ width: `${progress}%` }}></div>
        <div className="absolute h-4 w-4 bg-white border-2 border-gray-400 rounded-full -top-1" style={{ left: `calc(${progress}% - 8px)` }}></div>
      </div>

      {/* Main content area for the question and answer options. */}
      <main className="flex-grow flex flex-col items-center text-center">
        <h1 className="text-4xl font-serif text-black mb-2">{currentQuestion.phase}</h1>
        <p className="text-gray-600 mb-8">{currentQuestion.question}</p>
        
        {/* Container for the answer buttons. */}
        <div className="w-full space-y-4">
          {/* Maps over the available options for the current question and creates a button for each. */}
          {currentQuestion.options.map((option, index) => (
            <button 
              key={index} 
              className={`w-full py-4 px-6 text-center rounded-full transition-colors duration-200 ${selectedAnswers.includes(option) ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => handleAnswerSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </main>

      <footer className="w-full flex justify-end p-4">
        <button onClick={handleSubmit} className="p-2">
          <ArrowRight className="w-8 h-8 text-black" />
        </button>
      </footer>
    </div>

  );
};

export default QuestionPage;

