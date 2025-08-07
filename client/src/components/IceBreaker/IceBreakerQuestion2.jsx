import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

const IceBreakerQuestion2 = () => {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(180);
  const [isRunning, setIsRunning] = useState(true);

  // Pool of questions for this stage (personality/preferences)
  const questionPool = [
    "What's your mbti?",
    "Are you a morning person or night owl?",
    "Introvert or extrovert?",
    "Coffee or tea person?",
    "What's your love language?",
    "Beach vacation or mountain adventure?",
    "Books or movies?",
    "Planner or spontaneous?",
    "Cats or dogs?",
    "Sweet or savory snacks?"
  ];

  const [currentQuestion, setCurrentQuestion] = useState(questionPool[0]);
  const [usedQuestions, setUsedQuestions] = useState([questionPool[0]]);

  const handleBack = () => {
    navigate('/');
  };

  const handleNext = () => {
    navigate('/icebreaker/question/3');
  };

  const handleSkip = () => {
    // Get available questions
    const availableQuestions = questionPool.filter(q => !usedQuestions.includes(q));
    
    let newQuestion;
    if (availableQuestions.length === 0) {
      // If all questions used, reset and pick randomly
      const randomIndex = Math.floor(Math.random() * questionPool.length);
      newQuestion = questionPool[randomIndex];
      setUsedQuestions([newQuestion]);
    } else {
      // Pick random from unused questions
      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      newQuestion = availableQuestions[randomIndex];
      setUsedQuestions([...usedQuestions, newQuestion]);
    }
    
    // Update question and reset timer
    setCurrentQuestion(newQuestion);
    setTimeLeft(180);
    setIsRunning(true);
  };

  // Timer effect
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleNext(); // Go to next page instead of new question
          return 180;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isRunning]);

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center p-4 pt-20 pb-20 overflow-hidden">
      {/* Header */}
      <header className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <button onClick={handleBack} className="p-2">
          <X className="w-8 h-8 text-black" />
        </button>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-sm h-full flex flex-col items-center justify-between">
        {/* Progress bar */}
        <div className="w-full px-2 mb-8">
          <div className="flex items-center gap-2">
            <div className="h-1 bg-black w-1/4 rounded-full"></div>
            <div className="h-1 bg-black w-1/4 rounded-full"></div>
            <div className="h-1 bg-gray-300 w-1/4 rounded-full"></div>
            <div className="h-1 bg-gray-300 w-1/4 rounded-full"></div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-center flex-grow">
          <h2 className="text-2xl font-serif text-black mb-8 leading-relaxed">
            {currentQuestion}
          </h2>
          
          {/* Circular Progress Timer */}
          <div className="relative mb-8">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" stroke="#e5e7eb" strokeWidth="8" fill="none" />
              <circle
                cx="60"
                cy="60"
                r="54"
                stroke={timeLeft <= 10 ? "#ef4444" : "#000000"}
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 54}`}
                strokeDashoffset={`${(2 * Math.PI * 54 * (180 - timeLeft)) / 180}`}
                style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-5xl font-bold font-['Instrument_Sans'] transition-colors ${timeLeft <= 10 ? 'text-red-500' : 'text-black'}`}>
                {timeLeft}
              </span>
            </div>
          </div>

          {/* SKIP button */}
          <button 
            type="button"
            onClick={handleSkip}
            className="bg-gray-200 text-black font-semibold px-10 py-3 rounded-full hover:bg-gray-300 transition-colors"
          >
            SKIP
          </button>
          <p className="text-gray-500 text-sm mt-2">
            Want another question? Skip!
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 left-4 right-4 flex justify-end max-w-sm mx-auto">
        <button onClick={handleNext} className="p-2">
          <ArrowRight className="w-8 h-8 text-black" />
        </button>
      </footer>
    </div>
  );
};

export default IceBreakerQuestion2;