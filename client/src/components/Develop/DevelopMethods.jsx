import React, { useState, useEffect } from 'react';
import Chatbot from './DevelopChatbot';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Define relevant methods for each lesson (non-clickable display items)
const methodRecommendations = {
    'c-sketching': [
        'User Interviews',
        'Affinity Analysis',
        'Activity Diagram',
        'Hierarchy of Purpose'
    ],
    'real-win-worth': [
        'Brainstorming',
        'DI Mindmapping',
        'C-Sketch (6-3-5)',
        'Design by Analogy'
    ],
    'morph-matrix': [
        'Systems Function Model'
    ]
    // Note: moodboard is excluded as it doesn't need review methods
};

// Method titles mapping for display
const methodTitleMapping = {
    'c-sketching': 'C-Sketching',
    'real-win-worth': 'Real Win Worth',
    'morph-matrix': 'Morph Matrix'
};

const MethodDisplayCard = ({ methodName }) => {
    return (
        <div className="bg-gray-100 p-4 rounded-lg mb-4 w-full">
            <h3 className="font-medium text-lg text-gray-800">{methodName}</h3>
        </div>
    );
};

const DevelopMethods = ({ completedLessons }) => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [currentMethod, setCurrentMethod] = useState('c-sketching');
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        // Check if method is passed in location state
        if (location.state?.currentMethod) {
            setCurrentMethod(location.state.currentMethod);
            return;
        }
        
        // If no state, default to c-sketching
        setCurrentMethod('c-sketching');
    }, [location.state]);

    const completionPercentage = (completedLessons?.size || 0) / 4 * 100; // Assuming 4 total lessons

    // Get relevant methods for current lesson
    const getRelevantMethods = () => {
        if (methodRecommendations[currentMethod]) {
            return methodRecommendations[currentMethod];
        }
        return methodRecommendations['c-sketching']; // Default fallback
    };

    const relevantMethods = getRelevantMethods();
    const currentMethodTitle = methodTitleMapping[currentMethod] || 'Current Method';

    const handleBack = () => {
        navigate('/develop/dashboard');
    };

    return (
        <div className="h-screen bg-white flex flex-col p-4 max-w-sm mx-auto relative overflow-hidden">
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
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
            </div>

            <div className="flex items-start mb-4">
                <div className="w-1 bg-blue-600 h-16 mr-3"></div>
                <h1 className="text-4xl font-bold leading-tight">
                    Relevant<br/>Methods
                </h1>
            </div>

            {/* Subtitle showing which method these recommendations are for */}
            <p className="text-gray-600 mb-6 ml-4">
                Methods relevant to <span className="font-semibold">{currentMethodTitle}</span>
            </p>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="space-y-4">
                    {relevantMethods.map((methodName, index) => (
                        <MethodDisplayCard 
                            key={index}
                            methodName={methodName}
                        />
                    ))}
                </div>
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

export default DevelopMethods;