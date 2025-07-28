import React, { useState } from 'react';
import { signupUser } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    const success = signupUser(username, password);
    if (success) {
      navigate('/login');
    } else {
      setError("Username already exists.");
    }
  };

  return (
    <div className="text-white p-8 max-w-md mx-auto mt-20">
      <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
      <input
        placeholder="Username"
        className="w-full mb-3 p-2 rounded bg-zinc-800 border border-zinc-600"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        className="w-full mb-3 p-2 rounded bg-zinc-800 border border-zinc-600"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup} className="bg-purple-600 px-4 py-2 rounded">
        Sign Up
      </button>
      {error && <p className="text-red-400 mt-2">{error}</p>}
    </div>
  );
};

export default Signup;
