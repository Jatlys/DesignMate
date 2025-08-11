import React, { useState } from 'react';
import { User, ArrowRight } from 'lucide-react';
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
        <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto rounded-lg relative">
      {/* Header */}
      <div className="absolute top-0 right-0 p-4 mt-[33px]">
      </div>
      
      <div className="flex items-center justify-between p-4 bg-white mt-[94px]">
        <div className="flex items-center gap-2 flex-grow">
          <div className="h-1 bg-black w-1/4"></div>
          <div className="h-1 bg-gray-300 w-1/4"></div>
          <div className="h-1 bg-gray-300 w-1/4"></div>
          <div className="h-1 bg-gray-300 w-1/4"></div>
        </div>
      </div>
      
      {/* Main Content */}
      <form onSubmit={handleSignUp} className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <h2 className="text-3xl font-serif text-black">SIGN UP</h2>
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

      {/* Footer */}
      <div className="flex justify-end p-4">
        <button type="submit" onClick={handleSignUp}>
          <ArrowRight className="w-6 h-6 text-black" />
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
