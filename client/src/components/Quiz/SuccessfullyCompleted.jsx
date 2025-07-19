import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './QuizNew.css';

const SuccessfullyCompleted = () => {
    const location = useLocation();
    const { score, totalQuestions } = location.state || { score: 0, totalQuestions: 0 };
    const navigate = useNavigate();

    const handleReturnHome = () => {
        navigate('/');
    };

    return (
        <div className="quiz-completed-page">
            <h1>Quiz Completed!</h1>
            <img src="/assets/SuccessfullyCompleted.svg" alt="Quiz Completed" className="success-image" />
            <h2>Your Score: {score} / {totalQuestions}</h2>
            <p>Great job! You've successfully tested your knowledge of the design thinking process.</p>
            <button onClick={handleReturnHome} className="next-button">Return to Home</button>
        </div>
    );
};

export default SuccessfullyCompleted;
