import React from 'react';
import Chatbot from '../Chatbot';

const DiscoverChatbot = ({ onClose }) => {
  const initialMessages = [
    {
      text: "Hi! I'm here to guide your team through the design innovation process.",
      sender: 'ai',
    },
    {
      text: 'Current Phase: Discover. Focus on learning more about your users and empathising with their needs.',
      sender: 'ai-phase',
    },
    {
      text: 'Pro Tip: Encourage wild ideas and defer judgment to foster a creative environment.',
      sender: 'ai-tip',
    },
  ];

  return <Chatbot onClose={onClose} initialMessages={initialMessages} phase="discover" />;
};

export default DiscoverChatbot;
