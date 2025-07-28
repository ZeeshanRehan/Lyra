import React, { useState } from 'react';
import { loginUser } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = () => {
    const success = loginUser(username, password);
    if (success) {
      navigate('/');
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="text-white p-8 max-w-md mx-auto mt-20">
      <h2 className="text-3xl font-bold mb-4">Log In</h2>
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
      <button onClick={handleLogin} className="bg-purple-600 px-4 py-2 rounded">
        Log In
      </button>
      {error && <p className="text-red-400 mt-2">{error}</p>}
    </div>
  );
};

export default Login;
