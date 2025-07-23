import React, { useState } from 'react';
import Chatbot from './DefineChatbot';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const lessons = [
    { id: 'Activity Diagram', title: 'Activity Diagram', path: '/define/activity-diagram' },
    { id: 'How Might We', title: 'How Might We', path: '/define/how-might-we' },
    { id: 'Affinity Analysis', title: 'Affinity Analysis', path: '/define/affinity-analysis' },
    { id: '5 Whys', title: '5 Whys', path: '/define/5-whys' }
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
    const completionPercentage = (completedLessons.size / lessons.length) * 100;

    const handleBack = () => {
        navigate('/define/dashboard');
    };

    return (
        <div className="h-screen bg-white flex flex-col p-4 max-w-sm mx-auto relative overflow-hidden">
            {/* Header */}
            <header className="flex items-center justify-between mb-4">
                <button onClick={handleBack} className="p-2">
                    <ArrowLeft className="w-8 h-8 text-black" />
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
                <h1 className="text-4xl font-bold leading-tight">Relevant<br/>Methods</h1>
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {lessons.map(lesson => (
                    <MethodCard key={lesson.id} lesson={lesson} />
                ))}
            </main>

            {/* Footer Navigation */}
            <footer className="bg-white p-4 border-t border-gray-100">
                <button onClick={handleBack} className="p-2">
                    <ArrowLeft className="w-8 h-8 text-black" />
                </button>
            </footer>

            {isChatbotOpen && <Chatbot onClose={() => setIsChatbotOpen(false)} />}
        </div>
    );
};

export default Methods;