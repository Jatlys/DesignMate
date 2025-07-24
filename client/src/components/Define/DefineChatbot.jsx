import React from 'react';
import Chatbot from '../Chatbot';

const DefineChatbot = ({ onClose }) => {
  const initialMessages = [
    {
      text: "Hi! I'm here to guide your team through the design innovation process.",
      sender: 'ai',
    },
    {
      text: 'Current Phase: Define. Focus on understanding your target demographic and empathise with their needs, actions, reactions and emotions.',
      sender: 'ai-phase',
    },
    {
      text: "Pro Tip: Make sure to ask open-ended questions to get a better understanding of your users.",
      sender: 'ai-tip',
    },
  ];

  return <Chatbot onClose={onClose} initialMessages={initialMessages} phase="define" />;  
};

export default DefineChatbot;
