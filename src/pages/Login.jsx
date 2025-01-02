import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChefHat, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { hashPassword } from '../utils/hash';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const hashedData = {
        email: formData.email,
        password: hashPassword(formData.password)
      };
      const response = await login(hashedData);
      
      // Safely check the user role
      const userRole = response?.user?.role || 'customer';
      if (userRole === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/'); // Regular customers go to home page
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
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

            {error && (
              <div className="flex items-center gap-2 bg-red-50 text-red-500 p-4 rounded-xl mb-6">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-[#434725] font-bold mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#434725]/20 focus:outline-none focus:border-[#F26722]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#434725] font-bold mb-2">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#434725]/20 focus:outline-none focus:border-[#F26722]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#F26722] text-[#FFF8CC] py-4 rounded-xl font-bold hover:bg-[#FF850A] transition-colors duration-300 disabled:opacity-50"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>

              <div className="mt-6 text-center text-[#434725]/70">
                Don't have an account?{' '}
                <Link to="/register" className="text-[#F26722] font-bold hover:text-[#FF850A]">
                  Create Account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 