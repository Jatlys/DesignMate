import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from './questions';
import { ArrowRight, X, Bot } from 'lucide-react';

const WrongAnswerModal = ({ explanation, onRedo }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center">
      <h3 className="text-xl font-bold font-serif mb-4">Wrong Choice!</h3>
      <p className="text-gray-600 mb-6">{explanation}</p>
      <button 
        onClick={onRedo} 
        className="w-full bg-black text-white font-semibold py-3 rounded-full hover:bg-gray-800 transition-colors"
      >
        Redo
      </button>
    </div>
  </div>
);

const QuestionPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const navigate = useNavigate();

  if (!questions || questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

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

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center p-4 pt-20 pb-28 overflow-hidden">
      {showModal && <WrongAnswerModal explanation={currentQuestion.explanation} onRedo={handleRedo} />}
      
      {/* Header */}
      <header className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 max-w-sm mx-auto">
        <button onClick={handleClose} className="p-2">
          <X className="w-8 h-8 text-gray-700" />
        </button>
        <button onClick={toggleChatbot} className="p-2">
          <Bot className="w-8 h-8 text-gray-700" />
        </button>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-sm h-full flex flex-col items-center">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div 
            className="bg-black h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="flex flex-col items-center text-center flex-grow w-full">
          <h1 className="text-4xl font-serif text-black mb-2">{currentQuestion.phase}</h1>
          <p className="text-gray-600 mb-8">{currentQuestion.question}</p>
          
          <div className="w-full space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button 
                key={index} 
                className={`w-full py-4 px-6 text-left rounded-lg transition-colors duration-200 font-semibold ${
                  selectedAnswers.includes(option) 
                    ? 'bg-black text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 right-4">
        <button 
          onClick={handleSubmit} 
          className="bg-black hover:bg-gray-800 text-white rounded-full p-4 shadow-lg transition-colors"
        >
          <ArrowRight size={24} />
        </button>
      </footer>

      {/* {isChatbotOpen && <QuizChatbot onClose={toggleChatbot} />} */}
    </div>
  );
};

export default QuestionPage;

