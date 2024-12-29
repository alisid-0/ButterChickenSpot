import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Menu as MenuIcon, Info, PhoneCall, LogIn, LogOut, LayoutDashboard, X, ChefHat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  
  useEffect(() => {
    if (isLoggedIn && location.pathname === '/login') {
      navigate('/dashboard');
    }
  }, [isLoggedIn, location.pathname, navigate]);

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/menu', icon: MenuIcon, label: 'Menu' },
    { path: '/about', icon: Info, label: 'About' },
    { path: '/contact', icon: PhoneCall, label: 'Contact' },
  ];
  
  const AuthButton = () => {
    if (isLoggedIn) {
      return (
        <Link 
          to="/dashboard"
          className="relative group flex items-center gap-2 bg-[#FFF8CC] text-[#F26722] px-6 py-2 rounded-full font-bold hover:bg-white transition-all duration-200"
        >
          <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center gap-2">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </div>
        </Link>
      );
    }
    
    return (
      <Link 
        to="/login"
        className="relative group flex items-center gap-2 bg-[#FFF8CC] text-[#F26722] px-6 py-2 rounded-full font-bold hover:bg-white transition-all duration-200"
      >
        <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative flex items-center gap-2">
          <LogIn size={20} />
          <span>Login</span>
        </div>
      </Link>
    );
  };

  return (
    <nav className="bg-gradient-to-r from-[#F26722] to-[#FF850A] py-4 px-4 md:py-6 md:px-8 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center gap-3 text-[#FFF8CC] transform hover:scale-105 transition-transform duration-200"
        >
          <img 
            src={logo} 
            alt="The Butter Chicken Spot Logo" 
            className="w-12 h-12 md:w-14 md:h-14"
          />
          <span className="text-xl md:text-3xl font-black">
            The Butter Chicken Spot
          </span>
        </Link>

        <button 
          className="md:hidden text-[#FFF8CC] hover:bg-white/10 p-2 rounded-full transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link 
              key={path}
              to={path} 
              className="relative group"
            >
              <div className={`flex items-center gap-3 text-[#FFF8CC] px-4 py-2 rounded-full transition-all duration-200 ${
                location.pathname === path ? 'bg-white/20 font-bold' : 'hover:bg-white/10'
              }`}>
                <Icon size={24} />
                <span className="text-lg">{label}</span>
              </div>
              {location.pathname === path && (
                <motion.div 
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-[#FFF8CC] rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
          <AuthButton />
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-gradient-to-r from-[#F26722] to-[#FF850A] p-4 md:hidden shadow-lg"
            >
              {navItems.map(({ path, icon: Icon, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-3 text-[#FFF8CC] hover:bg-white/10 px-4 py-3 rounded-xl mb-2 ${
                    location.pathname === path ? 'bg-white/20 font-bold' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon size={24} />
                  <span>{label}</span>
                </Link>
              ))}
              <AuthButton />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}