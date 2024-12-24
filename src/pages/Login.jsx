import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChefHat } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    login();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FFF8CC] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#EF4423] to-[#F26722] rounded-3xl transform rotate-1" />
          <div className="relative bg-white rounded-3xl p-8 shadow-xl">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-[#F26722] rounded-full flex items-center justify-center">
                <ChefHat className="w-8 h-8 text-[#FFF8CC]" />
              </div>
            </div>
            
            <h2 className="text-3xl font-black text-[#434725] text-center mb-8">
              Welcome Back
            </h2>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-[#434725] font-bold mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-[#434725]/20 focus:outline-none focus:border-[#F26722]"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-[#434725] font-bold mb-2">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border border-[#434725]/20 focus:outline-none focus:border-[#F26722]"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#F26722] text-[#FFF8CC] py-4 rounded-xl font-bold hover:bg-[#FF850A] transition-colors duration-300"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 