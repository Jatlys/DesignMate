import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

import { BsArrowRight } from 'react-icons/bs';
import QuizChatbot from './QuizChatbot';
import './QuizNew.css';

const SuccessfullyCompleted = () => {
    const location = useLocation();
    const { score, totalQuestions } = location.state || { score: 0, totalQuestions: 0 };
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    const toggleChatbot = () => {
        setIsChatbotOpen(!isChatbotOpen);
    };

    return (
        <div className="successfully-delivered-container max-w-sm mx-auto">
            <div className="top-bar">
                <Link to="/">
                    <img src="/assets/Home.svg" alt="Home" className="icon" />
                </Link>
                <img src="/assets/Chatbot.svg" alt="Chatbot" className="icon" onClick={toggleChatbot} />
            </div>

            <div className="center-content">
                <h1 className="success-title">QUIZ COMPLETED!</h1>
                <img src="/assets/SuccessfullyCompleted.svg" alt="Quiz Completed" className="success-image" />
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
