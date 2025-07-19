import React, { useState } from 'react';
import { ArrowRight, X, Camera, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProblemIdentification = () => {
  const navigate = useNavigate();
  const [problemStatement, setProblemStatement] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleBack = () => {
    navigate('/'); // Go to homepage
  };

  const handleNext = () => {
    // Can proceed even without problem statement (optional)
    navigate('/timeline/1');
  };

  const handleTakePhoto = () => {
    // TODO: Implement camera functionality
    console.log('Take photo clicked');
  };

  const handleUpload = () => {
    // TODO: Implement file upload
    console.log('Upload clicked');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto rounded-lg relative">
      {/* Header - X button */}
      <div className="w-full flex justify-start items-center px-4 pt-8 pb-4">
        <button onClick={handleBack} className="">
          <X className="w-8 h-8 text-black" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <h1 className="text-2xl font-serif text-black mb-16 leading-tight">
          Let's start with your<br/>
          problem statement!
        </h1>
        
        {/* Photo options */}
        <div className="flex items-center gap-8 mb-16">
          {/* Take a photo button */}
          <button 
            onClick={handleTakePhoto}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-16 h-16 border-2 border-black rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Camera className="w-8 h-8 text-black" />
            </div>
            <span className="text-sm font-semibold text-black">Take a photo</span>
          </button>

          {/* Upload button */}
          <button 
            onClick={handleUpload}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
              <Plus className="w-8 h-8 text-black" />
            </div>
            <span className="text-sm font-semibold text-black">Upload</span>
          </button>
        </div>

        {/* Optional text area for problem statement */}
        <textarea
          value={problemStatement}
          onChange={(e) => setProblemStatement(e.target.value)}
          placeholder="Describe your problem statement here... (optional)"
          className="w-full h-32 p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
        />
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

export default ProblemIdentification;