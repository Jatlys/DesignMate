import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './QuizNew.css';
import { BsArrowRight } from 'react-icons/bs';
import { GoHome } from 'react-icons/go';
import Chatbot from './QuizChatbot';

const SuccessfullyDelivered = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <div className="successfully-delivered-container">
      <div className="top-bar">
        <Link to="/">
          <GoHome className="icon" />
        </Link>
        <img src="/assets/Chatbot.svg" alt="Chatbot" className="icon" onClick={toggleChatbot} />
      </div>

      <div className="center-content">
        <h1 className="success-title">SUCCESSFULLY DELIVERED!</h1>
        <img src="/assets/SuccessfullyDelivered.svg" alt="Successfully Delivered" className="success-image" />
      </div>

      <div className="bottom-bar">
        <Link to="/quiz/questions" className="quiz-me-link">
          <BsArrowRight size={24} />
        </Link>
      </div>

      {showChatbot && (
        <div className="modal-overlay">
          <Chatbot onClose={toggleChatbot} />
        </div>
      )}
    </div>
  );
};

export default SuccessfullyDelivered;
