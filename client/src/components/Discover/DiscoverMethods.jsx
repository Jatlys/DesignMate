import React, { useState } from 'react';
import Chatbot from './DiscoverChatbot';
import { useNavigate } from 'react-router-dom';

const lessons = [
    { id: 'Stakeholder Mapping', title: 'Stakeholder Mapping', path: '/discover/stakeholder-mapping' },
    { id: 'Personas', title: 'Personas', path: '/discover/personas' },
    { id: 'Scenarios', title: 'Scenarios', path: '/discover/scenarios' },
    { id: 'User Journey Mapping', title: 'User Journey Mapping', path: '/discover/user-journey-mapping' }
];

const MethodCard = ({ lesson }) => {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate(lesson.path)}
            className="border border-gray-300 rounded-lg p-4 mb-4 w-full text-left hover:bg-gray-50 transition-colors"
        >
            <h3 className="font-bold text-lg">{lesson.title}</h3>
        </button>
    );
};

const Methods = ({ completedLessons }) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const navigate = useNavigate();
    const discoverLessonIds = new Set(lessons.map(l => l.id));
    const completedDiscoverLessons = [...completedLessons].filter(id => discoverLessonIds.has(id));
    const completionPercentage = lessons.length > 0 ? (completedDiscoverLessons.length / lessons.length) * 100 : 0;

    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="w-full max-w-sm p-4">
            {/* Header */}
            <header className="flex items-center justify-between mb-4">
                <button onClick={() => navigate('/')} className="p-2">
                    <img src="/assets/Home.svg" alt="Home" className="w-8 h-8" />
                </button>
                <button onClick={() => setIsChatbotOpen(true)} className="p-2">
                    <img src="/assets/Chatbot.svg" alt="Chatbot" className="w-10 h-10" />
                </button>
            </header>

                {/* Progress Bar */}
                <div className="bg-gray-200 rounded-full h-2.5 mb-6">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
                </div>

                <div className="flex items-start mb-4">
                    <div className="w-1 bg-black h-16 mr-3"></div>
                    <h1 className="text-4xl font-bold leading-tight">Relevant<br/>Methods</h1>
                </div>

                    {/* Main Content */}
                    <main className="flex-grow pb-16">
                    {lessons.map(lesson => (
                        <MethodCard key={lesson.id} lesson={lesson} />
                    ))}
                </main>
            </div>
            {isChatbotOpen && <Chatbot onClose={() => setIsChatbotOpen(false)} />}
        </div>
    );
};

export default Methods;
