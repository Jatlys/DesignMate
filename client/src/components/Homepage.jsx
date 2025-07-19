import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Plus, Eye, Home, UserCircle } from 'lucide-react';
import Chatbot from './Chatbot'; // Import the Chatbot component

const Homepage = () => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleGetStartedClick = (step) => {
    console.log(`${step} step clicked`);
    if (step === 'DEFINE') {
      navigate('/define');
    }
    if (step === 'DEVELOP') {
      navigate('/develop');
    }
    if (step === 'DELIVER') {
      navigate('/deliver');
    }
  };

  const handleProjectAction = (action) => {
    console.log(`${action} clicked`);
    if (action === 'CREATE_JOIN') {
      navigate('/joinorcreate-team');
    } else if (action === 'VIEW_ALL') {
      navigate('/view-all-projects');
    }
  };

  return (
    <>
      {/* Google Fonts Link */}
      <link href="https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      
      <div className="h-screen bg-white flex flex-col max-w-sm mx-auto border-2 border-blue-400 rounded-lg relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
          {/* Search Bar */}
          <div className="relative flex-1 mr-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-100 rounded-full py-3 px-4 pr-12 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-colors duration-200"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          
          {/* Profile Icon */}
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-gray-600" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-6 py-6 space-y-8 pb-24">
          
          {/* Get Started Section */}
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-black mb-3" style={{ fontFamily: 'Abhaya Libre, serif' }}>Get Started</h2>
            
            {/* Process Steps Grid */}
            <div className="grid grid-cols-2 gap-4 h-72">
              {/* Discover */}
              <button
                onClick={() => handleGetStartedClick('DISCOVER')}
                className="bg-gray-200 hover:bg-gray-300 rounded-2xl p-6 flex items-center justify-center transition-colors duration-200"
                style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}
              >
                <span className="text-black font-bold text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>DISCOVER</span>
              </button>

              {/* Define */}
              <button
                onClick={() => handleGetStartedClick('DEFINE')}
                className="bg-gray-200 hover:bg-gray-300 rounded-2xl p-6 flex items-center justify-center transition-colors duration-200"
                style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}
              >
                <span className="text-black font-bold text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>DEFINE</span>
              </button>

              {/* Develop */}
              <button
                onClick={() => handleGetStartedClick('DEVELOP')}
                className="bg-gray-200 hover:bg-gray-300 rounded-2xl p-6 flex items-center justify-center transition-colors duration-200"
                style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}
              >
                <span className="text-black font-bold text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>DEVELOP</span>
              </button>

              {/* Deliver */}
              <button
                onClick={() => handleGetStartedClick('DELIVER')}
                className="bg-gray-200 hover:bg-gray-300 rounded-2xl p-6 flex items-center justify-center transition-colors duration-200"
                style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}
              >
                <span className="text-black font-bold text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>DELIVER</span>
              </button>
            </div>
          </div>

          {/* Your Projects Section */}
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-black mb-4" style={{ fontFamily: 'Abhaya Libre, serif' }}>Your Projects</h2>
            
            {/* Project Actions Grid */}
            <div className="grid grid-cols-2 gap-4 h-52">
              {/* Create/Join Project */}
              <button
                onClick={() => handleProjectAction('CREATE_JOIN')}
                className="bg-gray-200 hover:bg-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center transition-colors duration-200 relative"
                style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}
              >
                {/* Plus icon in gray area */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/4">
                  <Plus className="w-14 h-14 text-black" strokeWidth={3} />
                </div>
                
                {/* White rounded rectangle with text only */}
                <div className="absolute bottom-1 left-1 right-1 h-20 bg-white rounded-xl flex flex-col items-center justify-center" style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
                  <span className="text-black font-bold text-center text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Create/Join<br />Project
                  </span>
                </div>
              </button>

              {/* View All Projects */}
              <button
                onClick={() => handleProjectAction('VIEW_ALL')}
                className="bg-gray-200 hover:bg-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center transition-colors duration-200 relative"
                style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}
              >
                {/* White rounded rectangle */}
                <div className="absolute bottom-1 left-1 right-1 h-20 bg-white rounded-xl flex flex-col items-center justify-center" style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
                  <Eye className="w-8 h-8 text-black mb-0.5" />
                  <span className="text-black font-bold text-center text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    View All<br />Projects
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center py-6 bg-white border-t border-gray-100">
          <div className="flex gap-8">
            <button className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
              <UserCircle className="w-6 h-6 text-gray-700" />
            </button>
            <button className="p-3 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors duration-200">
              <Home className="w-6 h-6 text-gray-700" />
            </button>
            <button onClick={() => setIsChatbotOpen(true)} className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
              <img src="/assets/Chatbot.svg" alt="Chatbot" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {isChatbotOpen && <Chatbot onClose={() => setIsChatbotOpen(false)} />}
    </>
  );
};

export default Homepage;