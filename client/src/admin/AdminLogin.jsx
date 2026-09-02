import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { FaLock } from 'react-icons/fa';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.token);
      navigate('/admin');
    } catch (err) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img src="/images/logo.jpeg" alt="Air Dream" className="h-16 object-contain mb-3" />
          <h2 className="text-2xl font-bold text-primary">Admin Login</h2>
          <p className="text-sm text-gray-400 mt-1">Air Dream Travel & Tourism</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 text-dark border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
              placeholder="admin@airdream.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 text-dark border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
            <FaLock size={14} />
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
