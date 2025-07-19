import React, { useState } from 'react';
import { ArrowRight, X, ChevronLeft, ChevronRight, Calendar, ArrowLeft } from 'lucide-react';

const Timeline2 = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 15)); // December 2024
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startMonth, setStartMonth] = useState(null);
  const [endMonth, setEndMonth] = useState(null);

  const handleBack = () => {
    console.log('Timeline2 back button clicked - going to /timeline/1');
    // In your actual app, replace this with: navigate('/timeline/1');
    window.location.href = '/timeline/1';
  };

  const handleClose = () => {
    // In your actual app, replace this with: navigate('/');
    window.location.href = '/';
  };

  const handleNext = () => {
    const dateData = {
      startDate, 
      endDate, 
      startMonth, 
      endMonth 
    };
    
    console.log('Timeline2 sending data:', dateData);
    
    // Store data in sessionStorage for Timeline3 to pick up
    sessionStorage.setItem('timeline2Data', JSON.stringify(dateData));
    
    // In your actual app, replace this with: navigate('/timeline/3');
    window.location.href = '/timeline/3';
  };

  // Calendar logic
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

  // Generate calendar days
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

  // Handle date click - simplified tap selection
  const handleDateClick = (day, isCurrentMonth) => {
    if (!isCurrentMonth) return;
    
    console.log('=== Date clicked ===');
    console.log('Clicked day:', day, 'Current month:', month);
    console.log('Current state before click:', { startDate, endDate, startMonth, endMonth });
    
    if (!startDate) {
      // Set start date
      console.log('Setting start date:', day, 'month:', month);
      setStartDate(day);
      setStartMonth(month);
      setEndDate(null);
      setEndMonth(null);
    } else if (!endDate) {
      // Set end date
      if (month === startMonth && day < startDate) {
        // If clicking earlier date in same month, reset start
        console.log('Earlier date clicked, resetting start');
        setStartDate(day);
        setStartMonth(month);
        setEndDate(null);
        setEndMonth(null);
      } else if (month < startMonth || (month === startMonth && day < startDate)) {
        // If clicking earlier month/date, reset start
        console.log('Earlier month/date clicked, resetting start');
        setStartDate(day);
        setStartMonth(month);
        setEndDate(null);
        setEndMonth(null);
      } else {
        // Valid end date
        console.log('Setting end date:', day, 'month:', month);
        setEndDate(day);
        setEndMonth(month);
      }
    } else {
      // Reset and set new start date
      console.log('Resetting and setting new start date');
      setStartDate(day);
      setStartMonth(month);
      setEndDate(null);
      setEndMonth(null);
    }
  };

  // Check if date is start date
  const isStartDate = (day, isCurrentMonth) => {
    return isCurrentMonth && day === startDate && month === startMonth;
  };

  // Check if date is end date
  const isEndDate = (day, isCurrentMonth) => {
    return isCurrentMonth && day === endDate && month === endMonth;
  };

  // Check if date is in range (for current month view)
  const isInRange = (day, isCurrentMonth) => {
    if (!isCurrentMonth || !startDate || !endDate) return false;
    
    // Same month selection
    if (startMonth === endMonth && month === startMonth) {
      return day >= startDate && day <= endDate;
    }
    
    // Multi-month selection
    if (month === startMonth && startMonth < endMonth) {
      return day >= startDate;
    } else if (month === endMonth && startMonth < endMonth) {
      return day <= endDate;
    } else if (month > startMonth && month < endMonth) {
      return true; // All days in between months
    }
    
    return false;
  };

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

      {/* Main Content - moved further down */}
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

        {/* Calendar Grid */}
        <div className="w-full relative select-none">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-1 mb-2 relative" style={{ height: '40px' }}>
              {week.map((dateObj, dayIndex) => {
                const { day, isCurrentMonth } = dateObj;
                const inRange = isInRange(day, isCurrentMonth);
                const isStart = isStartDate(day, isCurrentMonth);
                const isEnd = isEndDate(day, isCurrentMonth);
                
                return (
                  <div key={dayIndex} className="relative h-10">
                    <button
                      onClick={() => handleDateClick(day, isCurrentMonth)}
                      className={`
                        w-full h-full text-center text-base font-serif font-bold transition-all
                        ${isCurrentMonth 
                          ? 'text-black hover:bg-gray-100' 
                          : 'text-neutral-400'
                        }
                        ${isStart ? 'bg-green-200' : ''}
                        ${isEnd ? 'bg-red-200' : ''}
                        ${inRange && !isStart && !isEnd ? 'bg-gray-200' : ''}
                      `}
                    >
                      {day}
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Instructions */}
        {!startDate && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg w-full">
            <p className="text-center text-sm font-serif text-blue-800">
              Tap a date to set your project start date
            </p>
          </div>
        )}
        
        {startDate && !endDate && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg w-full">
            <p className="text-center text-sm font-serif text-green-800">
              Tap another date to set your project end date
            </p>
          </div>
        )}

        {/* Timeline info */}
        {startDate && endDate && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg w-full">
            <p className="text-center text-sm font-serif">
              Project Duration: {monthNames[startMonth]} {startDate} - {monthNames[endMonth]} {endDate}
              <br />
              <span className="text-gray-600">
                Selected timeline confirmed
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Footer - arrow button */}
      <div className="flex justify-end p-4">
        <button 
          onClick={() => {
            console.log('BUTTON CLICKED!');
            console.log('Button state check:', { startDate, endDate, startMonth, endMonth });
            handleNext();
          }} 
          disabled={!startDate || !endDate}
          style={{ 
            opacity: (!startDate || !endDate) ? 0.5 : 1,
            cursor: (!startDate || !endDate) ? 'not-allowed' : 'pointer'
          }}
        >
          <ArrowRight className="w-6 h-6 text-black" />
        </button>
        {/* Debug info */}
        <div className="ml-2 text-xs">
          <div>Start: {startDate || 'none'}</div>
          <div>End: {endDate || 'none'}</div>
          <div>Enabled: {(!startDate || !endDate) ? 'NO' : 'YES'}</div>
        </div>
      </div>
    </div>
  );
};

export default Timeline2;