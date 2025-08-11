import React, { useEffect, useState } from 'react';
import { ArrowRight, X, Calendar, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Timeline3 = () => {
  const navigate = useNavigate();
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedStartMonth, setSelectedStartMonth] = useState(null);
  const [selectedEndMonth, setSelectedEndMonth] = useState(null);

  // Get data from sessionStorage on component mount
  useEffect(() => {
    const storedData = sessionStorage.getItem('timeline2Data');
    if (storedData) {
      const data = JSON.parse(storedData);
      console.log('Timeline3 received data:', data);
      
      setSelectedStartDate(data.startDate);
      setSelectedEndDate(data.endDate);
      setSelectedStartMonth(data.startMonth);
      setSelectedEndMonth(data.endMonth);
    }
  }, []);

  const handleBack = () => {
    navigate('/timeline/2');
  };

  const handleClose = () => {
    navigate('/');
  };

  const handleNext = () => {
    navigate('/skillsets');
  };

  // Calculate project duration in weeks from selected dates
  const calculateProjectDuration = () => {
    if (!selectedStartDate || !selectedEndDate || selectedStartMonth === null || selectedEndMonth === null) {
      return 12; // Default to 12 weeks if no dates selected
    }

    // Create actual date objects from the selected dates
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, selectedStartMonth, selectedStartDate);
    const endDate = new Date(currentYear, selectedEndMonth, selectedEndDate);
    
    // If end date is in the past relative to start date, assume next year
    if (endDate < startDate) {
      endDate.setFullYear(currentYear + 1);
    }
    
    // Calculate difference in milliseconds
    const timeDifference = endDate.getTime() - startDate.getTime();
    
    // Convert to weeks (milliseconds to days to weeks)
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    const weeksDifference = Math.ceil(daysDifference / 7);
    
    return Math.max(weeksDifference, 4); // Minimum 4 weeks for a reasonable project
  };

  const projectDurationWeeks = calculateProjectDuration();

  // Calculate timeline based on the EXACT selected dates from Timeline2
  const calculateTimeline = () => {
    const phases = [
      { name: "Discover", ratio: 1/6, color: "#000000" },
      { name: "Define", ratio: 1/6, color: "#90AD89" },
      { name: "Develop", ratio: 2/6, color: "#6C97D7" },
      { name: "Deliver", ratio: 2/6, color: "#E26567" }
    ];

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
      "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Use the EXACT selected dates from Timeline2
    if (!selectedStartDate || !selectedEndDate || selectedStartMonth === null || selectedEndMonth === null) {
      // Fallback timeline if no dates selected
      const today = new Date();
      let cumulativeWeeks = 0;
      return phases.map((phase, index) => {
        const phaseWeeks = Math.ceil(12 * phase.ratio); // Default 12 weeks
        const phaseDate = new Date(today);
        phaseDate.setDate(today.getDate() + (cumulativeWeeks * 7));
        cumulativeWeeks += phaseWeeks;

        return {
          phase: phase.name,
          date: {
            day: phaseDate.getDate(),
            month: monthNames[phaseDate.getMonth()]
          },
          color: phase.color,
          weeksFromStart: cumulativeWeeks,
          phaseDays: phaseWeeks * 7
        };
      });
    }

    // Create the actual start and end dates from Timeline2 selection
    const currentYear = new Date().getFullYear();
    const actualStartDate = new Date(currentYear, selectedStartMonth, selectedStartDate);
    const actualEndDate = new Date(currentYear, selectedEndMonth, selectedEndDate);
    
    // Handle year rollover (e.g., Dec 19 to Jan 3)
    if (actualEndDate < actualStartDate) {
      actualEndDate.setFullYear(currentYear + 1);
    }

    // Calculate the total project duration in days
    const totalDays = Math.ceil((actualEndDate - actualStartDate) / (1000 * 60 * 60 * 24));
    
    // Calculate each phase duration and start date based on the EXACT start date
    let currentDate = new Date(actualStartDate); // Start from the actual selected start date
    const timeline = [];
    
    phases.forEach((phase, index) => {
      const phaseDays = Math.ceil(totalDays * phase.ratio);
      
      // Use the current date for this phase
      timeline.push({
        phase: phase.name,
        date: {
          day: currentDate.getDate(),
          month: monthNames[currentDate.getMonth()]
        },
        color: phase.color,
        weeksFromStart: Math.ceil((currentDate - actualStartDate) / (1000 * 60 * 60 * 24 * 7)),
        phaseDays: phaseDays // Store actual days for this phase
      });
      
      // Move to next phase start date (only if not the last phase)
      if (index < phases.length - 1) {
        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + phaseDays);
      }
    });

    return timeline;
  };

  const milestones = calculateTimeline();

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-4xl mx-auto rounded-lg relative">
      {/* Header - Back button left, X button right */}
      <div className="w-full flex justify-between items-center px-4 pt-8 pb-4">
        <button onClick={handleBack} className="">
          <ArrowLeft className="w-8 h-8 text-black" />
        </button>
        <button onClick={handleClose} className="">
          <X className="w-8 h-8 text-black" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-8 pt-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-6 h-6 text-black" />
          <h2 className="text-2xl font-serif text-black">Projected Timeline</h2>
        </div>

        {/* Description */}
        <p className="text-center text-sm font-serif text-gray-600 mb-12 leading-relaxed">
          Based on your project duration, we have generated<br />
          an ideal timeline for you
        </p>

        {/* Project Duration Info */}
        <div className="mb-8 p-3 bg-blue-50 rounded-lg w-full">
          <p className="text-center text-sm font-serif text-blue-800">
            Project Duration: {projectDurationWeeks} weeks
          </p>
          {selectedStartDate && selectedEndDate && (
            <p className="text-center text-xs font-serif text-blue-600 mt-1">
              Selected: Dec {selectedStartDate} - Dec {selectedEndDate}
            </p>
          )}
        </div>

        {/* Timeline */}
        <div className="relative w-full max-w-xs">
          {/* Milestones */}
          <div className="relative">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative flex items-center mb-16 last:mb-0">
                {/* Date */}
                <div className="text-right mr-4 w-12">
                  <div className="text-lg font-bold font-serif text-black">
                    {milestone.date.day}
                  </div>
                  <div className="text-xs font-serif text-gray-600">
                    {milestone.date.month}
                  </div>
                </div>
                
                {/* Circle marker - fully colored with custom colors */}
                <div 
                  className="w-6 h-6 rounded-full shadow-lg relative"
                  style={{ backgroundColor: milestone.color }}
                ></div>
                
                {/* Phase label */}
                <div className="ml-4 flex-1">
                  <div className="text-lg font-bold font-serif text-black">
                    {milestone.phase}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phase Breakdown */}
        <div className="mt-8 w-full space-y-2">
          <h3 className="text-sm font-serif text-gray-600 text-center mb-4">Phase Breakdown</h3>
          {milestones.map((milestone, index) => {
            // Use the actual calculated days for each phase
            const actualDays = milestone.phaseDays || 1;
            const displayText = actualDays === 1 ? "1 day" : `${actualDays} days`;
            
            return (
              <div key={index} className="flex items-center justify-between text-xs font-serif">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: milestone.color }}
                  ></div>
                  <span>{milestone.phase}</span>
                </div>
                <span className="text-gray-600">{displayText}</span>
              </div>
            );
          })}
        </div>
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

export default Timeline3;