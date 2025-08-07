import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Bot } from 'lucide-react';
import DefineChatbot from './DefineChatbot';

const methodRecommendations = {
    'activity-diagram': [
        'User Interviews',
        'Personas',
        'Scenarios',
        'User Journey Map'
    ],
    'how-might-we': [
        'C-Sketching',
        'Real Win Worth',
        'Morph Matrix',
        'Moodboard'
    ],
    'affinity-analysis': [
        'User Interviews',
        'Empathic Lead User',
        'Persona',
        'Scenarios'
    ],
    '5-whys': [
        'User Interviews',
        'How Might We'
    ]
};

const methodTitleMapping = {
    'activity-diagram': 'Activity Diagram',
    'how-might-we': 'How Might We',
    'affinity-analysis': 'Affinity Analysis',
    '5-whys': '5 Whys'
};

const MethodDisplayCard = ({ methodName }) => (
    <div className="bg-white shadow-sm p-4 rounded-lg w-full">
        <h3 className="font-semibold text-lg text-gray-800">{methodName}</h3>
    </div>
);

const DefineMethods = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [currentMethod, setCurrentMethod] = useState('activity-diagram');
    
    useEffect(() => {
        if (location.state?.currentMethod) {
            setCurrentMethod(location.state.currentMethod);
        }
    }, [location.state]);

    const relevantMethods = methodRecommendations[currentMethod] || methodRecommendations['activity-diagram'];
    const currentMethodTitle = methodTitleMapping[currentMethod] || 'Current Method';

    return (
        <div className="relative min-h-screen bg-gray-50 flex flex-col items-center p-4 pt-24 pb-8">
            <header className="absolute top-6 left-6 right-6 flex items-center justify-between z-10 max-w-md mx-auto">
                <button onClick={() => navigate('/define/dashboard')} className="p-3 rounded-full hover:bg-gray-200 transition-colors">
                    <ArrowLeft className="w-10 h-10 text-gray-800" />
                </button>
                <button onClick={() => setIsChatbotOpen(true)} className="p-3 rounded-full hover:bg-gray-200 transition-colors">
                    <Bot className="w-10 h-10 text-gray-800" />
                </button>
            </header>

            <main className="w-full max-w-sm flex-grow flex flex-col">
                <div className="text-center mb-4">
                    <h1 className="text-4xl font-serif text-black">Relevant Methods</h1>
                </div>
                <p className="text-center text-gray-600 mb-8">
                    For <span className="font-semibold text-gray-800">{currentMethodTitle}</span>
                </p>

                <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-4">
                    {relevantMethods.map((methodName, index) => (
                        <MethodDisplayCard key={index} methodName={methodName} />
                    ))}
                </div>
            </main>

            {isChatbotOpen && <DefineChatbot onClose={() => setIsChatbotOpen(false)} />}
        </div>
    );
};

export default DefineMethods;