import React, { useState } from 'react';
import { ArrowRight, X, ChevronLeft, ChevronRight, Calendar, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Timeline1 = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 15)); // December 2024

  const handleBack = () => {
    navigate('/problem-identification'); // Go back to problem identification
  };

  const handleClose = () => {
    navigate('/'); // Go to homepage
  };

  const handleNext = () => {
    navigate('/timeline/2');
  };

  const handleOkClick = () => {
    setShowPopup(false);
    // After clicking OK, navigate to Timeline2 (the actual calendar)
    navigate('/timeline/2');
  };

  // Calendar logic (same as Timeline2)
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Navigate months
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Generate calendar days (same as Timeline2)
  const generateCalendarDays = () => {
    const days = [];
    const weeks = [];
    
    // Adjust for Monday start (0=Sunday, 1=Monday, etc.)
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    
    // Previous month's trailing days
    for (let i = adjustedFirstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        isPrevMonth: true
      });
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day: day,
        isCurrentMonth: true,
        isPrevMonth: false
      });
    }
    
    // Next month's leading days
    const remainingDays = 35 - days.length; // 5 weeks * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day: day,
        isCurrentMonth: false,
        isPrevMonth: false
      });
    }
    
    // Group into weeks
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    
    return weeks;
  };

  const weeks = generateCalendarDays();

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto rounded-lg relative">
      {/* Header - Back button left, X button right */}
      <div className="w-full flex justify-between items-center px-4 pt-8 pb-4">
        <button onClick={handleBack} className="">
          <ArrowLeft className="w-8 h-8 text-black" />
        </button>
        <button onClick={handleClose} className="">
          <X className="w-8 h-8 text-black" />
        </button>
      </div>

      {/* Main Content - same layout as Timeline2 */}
      <div className="flex-1 flex flex-col items-center px-8 pt-16">
        {/* Calendar Header */}
        <div className="flex items-center gap-3 mb-8">
          <Calendar className="w-8 h-8 text-black" />
          <h1 className="text-4xl font-serif text-black">Calendar</h1>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between w-full mb-6">
          <button onClick={prevMonth} className="p-2">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h2 className="text-xl font-serif text-black">
            {monthNames[month]} {year}
          </h2>
          <button onClick={nextMonth} className="p-2">
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 gap-1 w-full mb-2">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
            <div key={index} className="text-center text-neutral-500 text-sm font-serif py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar separator line */}
        <div className="w-full h-px bg-neutral-500 mb-4"></div>

        {/* Calendar Grid - same as Timeline2 */}
        <div className="w-full relative select-none opacity-50">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-1 mb-2 relative" style={{ height: '40px' }}>
              {week.map((dateObj, dayIndex) => {
                const { day, isCurrentMonth } = dateObj;
                
                return (
                  <div key={dayIndex} className="relative h-10">
                    <div
                      className={`
                        w-full h-full text-center text-base font-serif font-bold
                        ${isCurrentMonth 
                          ? 'text-black' 
                          : 'text-neutral-400'
                        }
                      `}
                    >
                      {day}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Popup Notification - covers entire screen with lighter grey */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-8 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm border border-gray-300 shadow-lg">
              <p className="text-center text-black font-serif text-lg mb-6 leading-relaxed">
                Tap to select your project start and end dates
              </p>
              
              <div className="border-t border-gray-300 pt-4">
                <button 
                  onClick={handleOkClick}
                  className="w-full text-center text-black font-semibold text-lg"
                >
                  Ok!
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer - arrow button */}
      <div className="flex justify-end p-4">
        <button onClick={handleNext}>
          <ArrowRight className="w-6 h-6 text-black" />
        </button>
      </div>
    </div>
  );
};

export default Timeline1;