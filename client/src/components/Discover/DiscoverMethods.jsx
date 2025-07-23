import React, { useState } from 'react';
import DiscoverChatbot from './DiscoverChatbot';
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

const DiscoverMethods = ({ completedLessons, setCompletedLessons }) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const navigate = useNavigate();
    const completionPercentage = completedLessons ? (completedLessons.size / lessons.length) * 100 : 0;

    return (
        <div className="min-h-screen bg-white flex justify-center">
            <div className="w-full max-w-sm p-4 flex flex-col">
                {/* Header */}
                <header className="flex items-center justify-between mb-4">
                    <button onClick={() => navigate(-1)} className="p-2">
                        <img src="/assets/back-arrow.svg" alt="Back" className="w-8 h-8" />
                    </button>
                    <button onClick={() => setIsChatbotOpen(true)} className="p-2">
                        <img src="/assets/Chatbot.svg" alt="Chatbot" className="w-10 h-10" />
                    </button>
                </header>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
                </div>

                <div className="flex items-start mb-4">
                    <div className="w-1 bg-black h-16 mr-3"></div>
                    <h1 className="text-4xl font-bold leading-tight flex-shrink">Relevant<br/>Methods</h1>
                </div>

                {/* Main Content */}
                <main className="flex-grow pb-16">
                    {lessons.map(lesson => (
                        <MethodCard key={lesson.id} lesson={lesson} />
                    ))}
                </main>
                {isChatbotOpen && <DiscoverChatbot onClose={() => setIsChatbotOpen(false)} />}
            </div>
        </div>
    );
};

export default DiscoverMethods;
