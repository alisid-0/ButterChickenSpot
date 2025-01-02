import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, AlertCircle, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { hashPassword } from '../utils/hash';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: hashPassword(formData.password),
        phone: formData.phone || undefined,
        role: 'customer'
      };
      
      const response = await register(userData);
      if (response.user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Failed to create an account. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-16 md:pb-24 bg-[#FFF8CC]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="absolute top-0 left-1 right-1 bottom-6 bg-gradient-to-r from-[#F26722] to-[#FF850A] rounded-3xl transform rotate-1" />
            <div className="relative bg-white rounded-3xl p-8 shadow-xl">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-black text-[#434725]">Create Account</h1>
                <p className="text-[#434725]/70 mt-2">Join The Butter Chicken Spot family</p>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 text-red-500 p-4 rounded-xl mb-6">
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#434725] font-bold mb-2" htmlFor="firstName">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#434725]/50" />
                      <input
                        type="text"
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-[#F26722] focus:ring-[#F26722] focus:ring-1 outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#434725] font-bold mb-2" htmlFor="lastName">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#434725]/50" />
                      <input
                        type="text"
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-[#F26722] focus:ring-[#F26722] focus:ring-1 outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[#434725] font-bold mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#434725]/50" />
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-[#F26722] focus:ring-[#F26722] focus:ring-1 outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#434725] font-bold mb-2" htmlFor="phone">
                    Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#434725]/50" />
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-[#F26722] focus:ring-[#F26722] focus:ring-1 outline-none"
                      placeholder="123-456-7890"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#434725] font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#434725]/50" />
                    <input
                      type="password"
                      id="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-[#F26722] focus:ring-[#F26722] focus:ring-1 outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#434725] font-bold mb-2" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#434725]/50" />
                    <input
                      type="password"
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-[#F26722] focus:ring-[#F26722] focus:ring-1 outline-none"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#F26722] text-[#FFF8CC] py-3 rounded-xl font-bold hover:bg-[#FF850A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    'Creating Account...'
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      Create Account
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center text-[#434725]/70">
                Already have an account?{' '}
                <Link to="/login" className="text-[#F26722] font-bold hover:text-[#FF850A]">
                  Log In
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 