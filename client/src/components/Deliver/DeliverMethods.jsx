import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Bot, ArrowLeft } from 'lucide-react';
import DeliverChatbot from './DeliverChatbot';

const methodRecommendations = {
    'storyboarding': ['User Journey Map', 'Personas', 'Scenarios', 'Service/UX Blueprinting'],
    'wireframing': ['Prototyping Canvas'],
    'physical-model': ['Prototyping Canvas'],
    'mockups': ['Prototyping Canvas']
};

const methodTitleMapping = {
    'storyboarding': 'Storyboarding',
    'wireframing': 'Wireframing',
    'physical-model': 'Physical Model',
    'mockups': 'Mockups'
};

const MethodDisplayCard = ({ methodName }) => {
    return (
        <div className="bg-gray-100 p-4 rounded-lg w-full">
            <h3 className="font-semibold text-lg text-gray-800">{methodName}</h3>
        </div>
    );
};

const DeliverMethods = () => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [currentMethod, setCurrentMethod] = useState('storyboarding');
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        if (location.state?.currentMethod) {
            setCurrentMethod(location.state.currentMethod);
        }
    }, [location.state]);

    const relevantMethods = methodRecommendations[currentMethod] || methodRecommendations['storyboarding'];
    const currentMethodTitle = methodTitleMapping[currentMethod] || 'Current Method';

    return (
        <div className="relative min-h-screen bg-white flex flex-col p-4 pt-24 pb-8">
            <header className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 max-w-sm mx-auto">
                <button onClick={() => navigate('/deliver/dashboard')} className="p-2">
                    <ArrowLeft className="w-8 h-8 text-gray-700" />
                </button>
                <button onClick={() => setIsChatbotOpen(true)} className="p-2">
                    <Bot className="w-8 h-8 text-gray-700" />
                </button>
            </header>

            <main className="w-full max-w-sm mx-auto flex-grow flex flex-col">
                <div className="mb-6">
                    <h1 className="text-4xl font-serif text-black">Relevant Methods</h1>
                    <p className="text-gray-600 mt-1">
                        For <span className="font-semibold">{currentMethodTitle}</span>
                    </p>
                </div>

                <div className="flex-grow overflow-y-auto space-y-3 pr-2 -mr-2">
                    {relevantMethods.map((methodName, index) => (
                        <MethodDisplayCard key={index} methodName={methodName} />
                    ))}
                </div>
            </main>

            {isChatbotOpen && <DeliverChatbot onClose={() => setIsChatbotOpen(false)} />}
        </div>
    );
};

export default DeliverMethods;