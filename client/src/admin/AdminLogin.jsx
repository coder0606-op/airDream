import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dummy check for fallback if backend not ready
      // if (email === 'admin@airdream.com' && password === 'admin123') {
      //   login('dummy-token');
      //   navigate('/admin');
      //   return;
      // }
      
      const res = await api.post('/auth/login', { email, password });
      login(res.data.token);
      navigate('/admin');
    } catch (err) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="bg-dark-lighter p-10 rounded-xl shadow-2xl w-full max-w-md border border-gray-800">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-400 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white border border-white rounded-md focus:ring-2 focus:ring-primary outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white border border-white rounded-md focus:ring-2 focus:ring-primary outline-none"
              required
            />
          </div>
          <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-md transition-colors mt-4">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
