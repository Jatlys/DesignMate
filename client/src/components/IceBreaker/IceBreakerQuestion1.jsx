import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

const IceBreakerQuestion1 = () => {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(180);
  const [isRunning, setIsRunning] = useState(true);

  // Pool of questions for this stage
  const questionPool = [
    "What's a fun fact not many people know about you?",
    "If you could have dinner with anyone, who would it be?",
    "What's your hidden talent?",
    "What's the weirdest food combination you enjoy?",
    "If you could live in any fictional world, which would it be?",
    "What's your most unusual hobby?",
    "What's the strangest thing you believed as a child?",
    "If you could only eat one food for the rest of your life, what would it be?",
    "What's your biggest irrational fear?",
    "If you had a superpower, what would it be?"
  ];

  const [currentQuestion, setCurrentQuestion] = useState(questionPool[0]);
  const [usedQuestions, setUsedQuestions] = useState([questionPool[0]]);

  const handleBack = () => {
    navigate('/');
  };

  const handleNext = () => {
    navigate('/icebreaker/question/2');
  };

  const handleSkip = () => {
    console.log('Skip button clicked!');
    
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
          console.log('Timer expired on Question 1, going to next page');
          handleNext(); // Go to next page instead of new question
          return 180;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isRunning]);

  // Calculate rotation angle for timer indicator (360 degrees = 10 seconds)
  const rotationAngle = ((180 - timeLeft) / 180) * 360;

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto rounded-lg relative">
      {/* Header - X button moved further left */}
      <div className="w-full flex justify-start items-center px-4 pt-8 pb-4">
        <button onClick={handleBack} className="">
          <X className="w-8 h-8 text-black" />
        </button>
      </div>

      {/* Progress bar - 1st step active */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-2">
          <div className="h-1 bg-black w-1/4"></div>
          <div className="h-1 bg-gray-300 w-1/4"></div>
          <div className="h-1 bg-gray-300 w-1/4"></div>
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
              strokeDashoffset={`${2 * Math.PI * 54 * (timeLeft / 180)}`}
              style={{
                transition: timeLeft === 180 ? 'none' : 'stroke-dashoffset 1s linear'
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
        <p className="text-gray-600">
          Want another question? Skip!
        </p>
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

export default IceBreakerQuestion1;