import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

import { BsArrowRight } from 'react-icons/bs';
import QuizChatbot from './QuizChatbot';
import './QuizNew.css';

const SuccessfullyCompleted = () => {
    const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  
    const toggleChatbot = () => {
      setIsChatbotOpen(!isChatbotOpen);
    };
  
    const handleNext = () => {
      navigate('/');
    };
  
  
    return (
        <div className="successfully-delivered-container max-w-sm mx-auto">
            <div className="top-bar">
                <img src="/assets/Home.svg" alt="Back" className="icon" onClick={() => navigate(-1)} />
                <img src="/assets/Chatbot.svg" alt="Chatbot" className="icon" onClick={toggleChatbot} />
            </div>

            <div className="center-content">
                <h1 className="success-title">QUIZ COMPLETED!</h1>
                <img src="/assets/SuccessfullyCompleted.svg" alt="Quiz Completed" className="success-image" />
                <p className="text-gray-600">
                  Great job on finishing your design journey! 
                </p>            
                  </div>

            <div className="bottom-bar">
                <Link to="/" className="quiz-me-link">
                    <BsArrowRight size={24} />
                </Link>
            </div>

            {isChatbotOpen && <QuizChatbot onClose={toggleChatbot} />}
      </div>
    );
  };

export default SuccessfullyCompleted;
