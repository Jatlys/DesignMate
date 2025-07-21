import React from 'react';
import Chatbot from '../Chatbot';

const DevelopChatbot = ({ onClose }) => {
  const initialMessages = [
    {
      text: "Hi! I'm here to guide your team through the design innovation process.",
      sender: 'ai',
    },
    {
      text: 'Current Phase: Develop. Focus on developing a diverse range of ideas and potential solutions.',
      sender: 'ai-phase',
    },
    {
      text: 'Pro Tip: Encourage wild ideas and defer judgment to foster a creative environment.',
      sender: 'ai-tip',
    },
  ];

  return <Chatbot onClose={onClose} initialMessages={initialMessages} phase="develop" />;
};

export default DevelopChatbot;
