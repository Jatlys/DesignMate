import React from 'react';
import GeneralChatbot from '../GeneralChatbot';

const DeliverChatbot = ({ onClose }) => {
  const deliverMessages = [
    {
      text: 'Welcome to the Deliver phase! Here, we focus on testing and implementing solutions.',
      sender: 'ai',
    },
    {
      text: 'You can use methods like Storyboarding, Wireframing, and creating Mockups to bring your ideas to life.',
      sender: 'ai',
    },
    {
      text: 'Remember to gather feedback from users to iterate and improve your prototypes.',
      sender: 'ai-tip',
    },
  ];

  return <GeneralChatbot onClose={onClose} initialMessages={deliverMessages} />;
};

export default DeliverChatbot;
