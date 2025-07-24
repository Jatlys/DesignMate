import React, { useState } from 'react';
import { ArrowLeft, X, Calendar, Lightbulb, ArrowUp, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProjectOverview = () => {
  const navigate = useNavigate();
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showFullOverview, setShowFullOverview] = useState(true);

  const handleBack = () => {
    // In your actual app, replace with: navigate('/skillsets');
    window.location.href = '/skillsets';
  };

  const handleClose = () => {
    // In your actual app, replace with: navigate('/');
    window.location.href = '/';
  };

  const goToSkillsets = () => {
    // In your actual app, replace with: navigate('/skillsets');
    window.location.href = '/skillsets';
  };

  const goToCalendar = () => {
    // In your actual app, replace with: navigate('/timeline/2');
    window.location.href = '/timeline/2';
  };

  const handleStart = () => {
    // START button goes to sprint manual
    navigate('/sprint-manual');
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: chatInput
    };

    setMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsGenerating(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: `I understand you're asking about: "${userMessage.content}". Based on your project details, here are some insights and recommendations tailored to your unified collaboration system project.`
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsGenerating(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col max-w-md mx-auto relative">
      {/* Header */}
      <div className="w-full flex justify-between items-center px-4 pt-6 pb-2 bg-gray-100">
        <button onClick={handleBack} className="">
          <ArrowLeft className="w-8 h-8 text-black" />
        </button>
        <h1 className="text-lg font-serif text-gray-400">Project Overview</h1>
        <button onClick={handleClose} className="">
          <X className="w-8 h-8 text-black" />
        </button>
      </div>

      {/* Main Content Card - iPhone 14 Pro Max optimized */}
      <div className="flex-1 bg-gray-300 rounded-t-3xl mt-2 p-4 relative flex flex-col min-h-[85vh]">
        {/* Header with icons */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-serif font-bold text-black">Project Overview</h2>
          <div className="flex gap-3">
            <button onClick={goToCalendar} className="p-2">
              <Calendar className="w-6 h-6 text-black" />
            </button>
            <button onClick={goToSkillsets} className="p-2">
              <Lightbulb className="w-6 h-6 text-black" />
            </button>
          </div>
        </div>

        {/* Extended White Content Area for iPhone 14 Pro Max */}
        <div className="flex-1 bg-white rounded-2xl p-6 mb-4 overflow-y-scroll min-h-[70vh] max-h-[70vh]">
          <div className="space-y-6">
            {/* Project Context */}
            <div>
              <h3 className="text-xl font-serif font-bold text-black mb-3">Context</h3>
              <p className="text-sm font-serif text-gray-700 mb-4 leading-relaxed">
                Teams today struggle with fragmented communication tools and inefficient task management. Your goal is to create a unified system that fosters seamless collaboration, reduces redundant work, and improves overall productivity.
              </p>

              <h4 className="text-lg font-serif font-bold text-black mb-2">Discover Phase: Week 1-4</h4>
              <ul className="text-sm font-serif text-gray-700 mb-4 ml-4 space-y-1">
                <li>• During Weeks 1-4, you'll engage with users to gather insights through interviews and surveys.</li>
                <li>• You'll analyze current workflows, identify pain points, and explore competitor products.</li>
              </ul>
              <p className="text-sm font-serif text-gray-700 mb-6">
                The goal is to uncover opportunities that will shape your design direction.
              </p>

              <h4 className="text-lg font-serif font-bold text-black mb-2">Define Phase: Week 4-6</h4>
              <ul className="text-sm font-serif text-gray-700 mb-4 ml-4 space-y-1">
                <li>• In Weeks 4-6, you'll distill research findings into clear problem statements and user personas.</li>
                <li>• You'll define project goals, success criteria, and prioritize key features.</li>
              </ul>
              <p className="text-sm font-serif text-gray-700 mb-6">
                Early concepts and wire-frames will be created to guide further development.
              </p>

              <h4 className="text-lg font-serif font-bold text-black mb-2">Develop Phase: Week 6-10</h4>
              <ul className="text-sm font-serif text-gray-700 mb-4 ml-4 space-y-1">
                <li>• During Weeks 6-10, you'll build prototypes and develop core features.</li>
                <li>• You'll implement the unified communication system and task management tools.</li>
                <li>• Regular testing and iteration will ensure the solution meets user needs.</li>
              </ul>
              <p className="text-sm font-serif text-gray-700 mb-6">
                This phase focuses on bringing your ideas to life through iterative development.
              </p>

              <h4 className="text-lg font-serif font-bold text-black mb-2">Deliver Phase: Week 10-12</h4>
              <ul className="text-sm font-serif text-gray-700 mb-4 ml-4 space-y-1">
                <li>• In the final weeks, you'll polish the product and prepare for launch.</li>
                <li>• You'll conduct final user testing and gather feedback.</li>
                <li>• Deploy the system and create documentation for users.</li>
              </ul>
              <p className="text-sm font-serif text-gray-700 mb-6">
                The goal is to deliver a production-ready solution that transforms team collaboration.
              </p>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h4 className="text-lg font-serif font-bold text-black mb-2">Project Success Metrics</h4>
                <ul className="text-sm font-serif text-gray-700 ml-4 space-y-1">
                  <li>• 50% reduction in communication overhead</li>
                  <li>• 30% improvement in task completion rate</li>
                  <li>• 90% user adoption within first month</li>
                  <li>• Seamless integration with existing workflows</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="text-lg font-serif font-bold text-black mb-2">Key Deliverables</h4>
                <ul className="text-sm font-serif text-gray-700 ml-4 space-y-1">
                  <li>• User research findings and insights</li>
                  <li>• Problem statements and user personas</li>
                  <li>• Working prototype with core features</li>
                  <li>• Production-ready collaboration platform</li>
                  <li>• User documentation and training materials</li>
                </ul>
              </div>
            </div>

            {/* Chat Messages */}
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`p-4 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-blue-100 ml-4' 
                    : 'bg-gray-50'
                }`}
              >
                <div className="text-sm font-serif text-gray-800 whitespace-pre-line">
                  {message.content}
                </div>
              </div>
            ))}
            
            {isGenerating && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-serif text-gray-600">
                  Generating personalized insights...
                </div>
              </div>
            )}
          </div>
        </div>

        {/* START Button */}
        <div className="flex justify-center mb-6">
          <button 
            onClick={handleStart}
            className="bg-yellow-300 hover:bg-yellow-400 px-8 py-3 rounded-full font-serif font-bold text-black transition-colors"
          >
            START
          </button>
        </div>

        {/* Chat Input */}
        <div className="relative">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything"
            className="w-full p-4 pr-12 rounded-full border-0 bg-white text-sm font-serif placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button 
            onClick={handleSendMessage}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-black rounded-full hover:bg-gray-800 transition-colors"
          >
            <ArrowUp className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;