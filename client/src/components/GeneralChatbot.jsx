import React from 'react';
import Chatbot from './Chatbot';

const GeneralChatbot = ({ onClose }) => {
  const initialMessages = [
    {
      text: "Hi! I'm here to guide your team through the design innovation process.",
      sender: 'ai',
    },
    {
      text: 'You can ask me anything about the design process, or for tips on how to best use DesignMate.',
      sender: 'ai-phase',
    },
    {
      text: "Pro Tip: Use the different phases of the design process to structure your work and generate innovative ideas.",
      sender: 'ai-tip',
    },
  ];

  return <Chatbot onClose={onClose} initialMessages={initialMessages} phase="general" />;
};

export default GeneralChatbot;
