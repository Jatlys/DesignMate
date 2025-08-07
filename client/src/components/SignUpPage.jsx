import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (!agreed) {
      alert('You must agree to the privacy policy.');
      return;
    }
    console.log('Signing up with:', { email, password });
    navigate('/username');
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Main Content */}
      <form onSubmit={handleSignUp} className="w-full max-w-sm flex flex-col items-center justify-center text-center px-4">
        {/* Progress Bar */}
        <div className="w-full flex items-center gap-2 mb-8">
          <div className="h-1 bg-black flex-1"></div>
          <div className="h-1 bg-gray-300 flex-1"></div>
          <div className="h-1 bg-gray-300 flex-1"></div>
          <div className="h-1 bg-gray-300 flex-1"></div>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif text-black">SIGN UP</h2>
        <p className="text-sm text-gray-500 mb-8">Join us to have a smoother design journey</p>
        
        <input
          type="email"
          placeholder="EMAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-200 text-black placeholder-black font-semibold py-3 px-6 rounded-full w-full mb-4 text-center"
        />
        
        <input
          type="password"
          placeholder="PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-200 text-black placeholder-black font-semibold py-3 px-6 rounded-full w-full mb-4 text-center"
        />

        <input
          type="password"
          placeholder="CONFIRM PASSWORD"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="bg-gray-200 text-black placeholder-black font-semibold py-3 px-6 rounded-full w-full mb-4 text-center"
        />

        <div className="flex items-center mb-8">
          <input
            type="checkbox"
            id="privacy-policy"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="privacy-policy" className="text-sm text-gray-600">I agree with the <a href="#" className="underline">privacy policy</a></label>
        </div>
      </form>

      {/* Footer Button */}
      <button 
        type="submit" 
        onClick={handleSignUp}
        className="absolute bottom-4 right-4 p-2"
      >
        <ArrowRight className="w-8 h-8 text-black" />
      </button>
    </div>
  );
};

export default SignUpPage;
