import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

const IceBreakerQuestion3 = () => {
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(10);
  const [isRunning, setIsRunning] = useState(true);

  // Pool of questions for this stage (dreams/aspirations)
  const questionPool = [
    "What's a lifelong dream of yours?",
    "Where do you see yourself in 10 years?",
    "What's on your bucket list?",
    "If money wasn't an issue, what would you do?",
    "What's your biggest goal this year?",
    "What legacy do you want to leave?",
    "What would you do if you knew you couldn't fail?",
    "What's something you've always wanted to learn?",
    "If you could change one thing about the world, what would it be?",
    "What's your definition of success?"
  ];

  const [currentQuestion, setCurrentQuestion] = useState(questionPool[0]);
  const [usedQuestions, setUsedQuestions] = useState([questionPool[0]]);

  const handleBack = () => {
    // In your actual app, replace with: navigate('/');
    window.location.href = '/';
  };

  const handleNext = () => {
    // In your actual app, replace with: navigate('/icebreaker/complete');
    window.location.href = '/icebreaker/complete';
  };

  const handleSkip = () => {
    console.log('Skip button clicked on Question 3!');
    
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
    setTimeLeft(10);
    setIsRunning(true);
  };

  // Timer effect
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          console.log('Timer expired on Question 3, going to complete page');
          handleNext(); // Go to complete page instead of new question
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isRunning]);

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto rounded-lg relative">
      {/* Header - X button moved further left */}
      <div className="w-full flex justify-start items-center px-4 pt-8 pb-4">
        <button onClick={handleBack} className="">
          <X className="w-8 h-8 text-black" />
        </button>
      </div>

      {/* Progress bar - 3rd step active */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-2">
          <div className="h-1 bg-black w-1/4"></div>
          <div className="h-1 bg-black w-1/4"></div>
          <div className="h-1 bg-black w-1/4"></div>
          <div className="h-1 bg-gray-300 w-1/4"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <h2 className="text-2xl font-serif text-black mb-16 leading-relaxed">
          {currentQuestion}
        </h2>
        
        {/* Circular Progress Timer */}
        <div className="relative mb-16">
          {/* SVG Circle Progress */}
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="54"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="54"
              stroke={timeLeft <= 3 ? "#ef4444" : "#000000"}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 54}`}
              strokeDashoffset={`${2 * Math.PI * 54 * (timeLeft / 10)}`}
              style={{
                transition: timeLeft === 10 ? 'none' : 'stroke-dashoffset 1s linear'
              }}
            />
          </svg>
          
          {/* Timer number in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-6xl font-bold font-['Instrument_Sans'] transition-colors ${
              timeLeft <= 3 ? 'text-red-500' : 'text-black'
            }`}>
              {timeLeft}
            </span>
          </div>
        </div>

        {/* SKIP button */}
        <button 
          type="button"
          onClick={handleSkip}
          className="bg-gray-300 text-black font-semibold px-12 py-3 rounded-full hover:bg-gray-400 transition-colors"
        >
          SKIP
        </button>
      </div>

      {/* Footer - using same arrow as RoleSelectionPage */}
      <div className="flex justify-end p-4">
        <button onClick={handleNext}>
          <ArrowRight className="w-6 h-6 text-black" />
        </button>
      </div>
    </div>
  );
};

export default IceBreakerQuestion3;