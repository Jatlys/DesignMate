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
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto rounded-lg">
      {/* Main Content */}
      <form onSubmit={handleLogin} className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <h2 className="text-3xl font-serif text-black mb-8">LOG IN</h2>
        
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

        <p className="text-sm text-gray-600">
          Don't have an account? <Link to="/signup" className="underline">SIGN UP</Link>
        </p>
      </form>

      {/* Footer */}
      <div className="flex justify-end p-4">
        <button type="submit" onClick={handleLogin}>
          <ArrowRight className="w-6 h-6 text-black" />
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
