import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Plus, Eye, Home, UserCircle } from 'lucide-react';
import GeneralChatbot from './GeneralChatbot'; // Import the GeneralChatbot component

const Homepage = () => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // eslint-disable-line no-unused-vars

  const handleGetStartedClick = (step) => {
    console.log(`${step} step clicked`);
    if (step === 'DEFINE') {
      navigate('/define');
    } else if (step === 'DISCOVER') {
      navigate('/discover');
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
      
      <div className="min-h-screen w-full flex flex-col mx-auto relative bg-white">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 bg-white">
          {/* Top Row - Logo and User Icon */}
          <div className="flex items-center justify-between mb-4">
            {/* Logo and Text */}
            <div className="flex items-center gap-3">
              <img src="/assets/logo.svg" alt="DesignMate" className="w-10 h-10 sm:w-12 sm:h-12" />
              <div className="text-2xl sm:text-3xl font-bold tracking-wide" style={{ fontFamily: 'The Seasons, serif' }}>
                <span className="text-black">DESIGN</span>
                <span className="text-orange-600">m</span>
                <span className="text-yellow-600">A</span>
                <span style={{ color: '#777228' }}>+</span>
                <span className="text-blue-500">E</span>
              </div>
            </div>
            
            {/* Profile Icon */}
            <button onClick={() => navigate('/profile')} className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </button>
          </div>
          
          {/* Search Bar Row */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-100 rounded-full py-2 sm:py-3 px-3 sm:px-4 pr-10 sm:pr-12 text-sm sm:text-base text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-colors duration-200"
            />
            <button className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 p-1">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 pb-32 sm:pb-36 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto w-full">
          
          {/* Get Started Section */}
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-serif text-black mb-4 sm:mb-6">Start Learning</h2>
            
            {/* Process Steps - Vertical Stack */}
            <div className="space-y-4 sm:space-y-5">
              {/* Discover */}
              <button
                onClick={() => handleGetStartedClick('DISCOVER')}
                className="w-full hover:opacity-90 rounded-xl sm:rounded-2xl p-5 sm:p-6 flex items-center transition-all duration-200 text-white"
                style={{ backgroundColor: '#CB592B', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
              >
                <div className="flex items-center space-x-4 sm:space-x-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-bold text-lg sm:text-xl" style={{ fontFamily: 'Inter, sans-serif' }}>DISCOVER</div>
                    <div className="text-white text-sm sm:text-base opacity-90">Research & Explore User Needs</div>
                  </div>
                </div>
              </button>

              {/* Define */}
              <button
                onClick={() => handleGetStartedClick('DEFINE')}
                className="w-full hover:opacity-90 rounded-xl sm:rounded-2xl p-5 sm:p-6 flex items-center transition-all duration-200 text-white"
                style={{ backgroundColor: '#E7A937', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
              >
                <div className="flex items-center space-x-4 sm:space-x-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-bold text-lg sm:text-xl" style={{ fontFamily: 'Inter, sans-serif' }}>DEFINE</div>
                    <div className="text-white text-sm sm:text-base opacity-90">Synthesize & Focus Problems</div>
                  </div>
                </div>
              </button>

              {/* Develop */}
              <button
                onClick={() => handleGetStartedClick('DEVELOP')}
                className="w-full hover:opacity-90 rounded-xl sm:rounded-2xl p-5 sm:p-6 flex items-center transition-all duration-200 text-white"
                style={{ backgroundColor: '#777228', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
              >
                <div className="flex items-center space-x-4 sm:space-x-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-bold text-lg sm:text-xl" style={{ fontFamily: 'Inter, sans-serif' }}>DEVELOP</div>
                    <div className="text-white text-sm sm:text-base opacity-90">Ideate & Create Solutions</div>
                  </div>
                </div>
              </button>

              {/* Deliver */}
              <button
                onClick={() => handleGetStartedClick('DELIVER')}
                className="w-full hover:opacity-90 rounded-xl sm:rounded-2xl p-5 sm:p-6 flex items-center transition-all duration-200 text-white"
                style={{ backgroundColor: '#3878B9', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
              >
                <div className="flex items-center space-x-4 sm:space-x-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-bold text-lg sm:text-xl" style={{ fontFamily: 'Inter, sans-serif' }}>DELIVER</div>
                    <div className="text-white text-sm sm:text-base opacity-90">Test & Launch Products</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Your Projects Section */}
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-serif text-black mb-3 sm:mb-4">Your Projects</h2>
            
            {/* Project Actions Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 h-44 sm:h-52">
              {/* Create/Join Project */}
              <button
                onClick={() => handleProjectAction('CREATE_JOIN')}
                className="hover:bg-gray-300 rounded-xl p-4 flex flex-col items-center justify-center transition-colors duration-200 relative"
                style={{ backgroundColor: '#e5e7eb', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}
              >
                {/* Plus icon in gray area */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/4">
                  <Plus className="w-12 h-12 text-black" strokeWidth={3} />
                </div>
                
                {/* White rounded rectangle with text only */}
                <div className="absolute bottom-1 left-1 right-1 h-16 rounded-lg flex flex-col items-center justify-center bg-white" style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
                  <span className="text-black text-sm sm:text-base opacity-90 font-bold text-center leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Create/Join<br />Project
                  </span>
                </div>
              </button>

              {/* View All Projects */}
              <button
                onClick={() => handleProjectAction('VIEW_ALL')}
                className="hover:bg-gray-300 rounded-xl p-4 flex flex-col items-center justify-center transition-colors duration-200 relative"
                style={{ backgroundColor: '#e5e7eb', boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}
              >
                {/* White rounded rectangle */}
                <div className="absolute bottom-1 left-1 right-1 h-16 rounded-lg flex flex-col items-center justify-center bg-white" style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
                  <Eye className="w-6 h-6 text-black mb-0.5" />
                  <span className="text-black text-sm sm:text-base opacity-90 font-bold text-center leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
                    View All<br />Projects
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center py-4 sm:py-5 border-t border-gray-100 w-full bg-white">
          <div className="flex gap-8 sm:gap-10">
            <button className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center">
              <User className="w-8 h-8 text-gray-700" />
            </button>
            <button className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center">
              <Home className="w-8 h-8 text-gray-700" />
            </button>
            <button onClick={() => setIsChatbotOpen(true)} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center">
              <img src="/assets/Chatbot.svg" alt="Chatbot" className="w-10 h-10" />
            </button>
          </div>
        </div>
      </div>

      {isChatbotOpen && <GeneralChatbot onClose={() => setIsChatbotOpen(false)} />}
    </>
  );
};

export default Homepage;