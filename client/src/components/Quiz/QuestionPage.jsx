import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizNew.css'; // Import the new CSS file
import { questions } from './questions'; // Assuming questions are in this file

const WrongAnswerModal = ({ explanation, onRedo }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <div className="modal-body">
        <h3>Why?</h3>
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
    <div className="quiz-page max-w-sm mx-auto">
      {showModal && <WrongAnswerModal explanation={modalExplanation} onRedo={handleRedo} />}
      
      <div className="quiz-header">
        <button onClick={handleClose} className="close-button">X</button>
        <button className="chat-button">&#128172;</button>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="quiz-content">
        <h2 className="quiz-phase-title">{currentQuestion.phase}</h2>
        <p className="quiz-instruction">{currentQuestion.question}</p>
        <div className="answer-options">
          {currentQuestion.options.map((option, index) => (
            <button 
              key={index} 
              className={`answer-button ${selectedAnswers.includes(option) ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="quiz-footer">
        <button onClick={handleSubmit} className="next-button">&#8594;</button>
      </div>
    </div>
  );
};

export default QuestionPage;

