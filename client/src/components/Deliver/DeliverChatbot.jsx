import React from 'react';
import Chatbot from '../Chatbot';

const DeliverChatbot = ({ onClose }) => {
  const initialMessages = [
    {
      text: "Hi! I'm here to guide your team through the design innovation process.",
      sender: 'ai',
    },
    {
      text: 'Current Phase: Deliver. Iteratively prototype and test concepts and models with users.',
      sender: 'ai-phase',
    },
    {
      text: 'Pro Tip: Use prototypes and storyboards to clearly communicate your ideas and gather feedback.',
      sender: 'ai-tip',
    },
  ];

  return <Chatbot onClose={onClose} initialMessages={initialMessages} phase="deliver" />;
};

export default DeliverChatbot;
