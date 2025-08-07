import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
  };
  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Main Content */}
      <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl sm:text-4xl font-serif text-black mb-8">LOG IN</h2>
        
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
          className="bg-gray-200 text-black placeholder-black font-semibold py-3 px-6 rounded-full w-full mb-6 text-center"
        />

        <p className="text-sm text-gray-600">
          Don't have an account? <Link to="/signup" className="underline">SIGN UP</Link>
        </p>
      </form>

      {/* Footer Button */}
      <button 
        type="submit" 
        onClick={handleLogin}
        className="absolute bottom-4 right-4 p-2"
      >
        <ArrowRight className="w-8 h-8 text-black" />
      </button>
    </div>
  );
};

export default LoginPage;
