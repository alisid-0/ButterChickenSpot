import React, { useState } from 'react';
import { Menu as MenuIcon, Home, Info, PhoneCall, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/menu', icon: Menu, label: 'Menu' },
    { path: '/about', icon: Info, label: 'About' },
    { path: '/contact', icon: PhoneCall, label: 'Contact' },
  ];
  
  return (
    <nav className="bg-gradient-to-r from-[#F26722] to-[#FF850A] py-4 px-4 md:py-6 md:px-8 fixed w-full top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="text-[#FFF8CC] text-xl md:text-3xl font-bold transform hover:scale-105 transition-transform duration-200"
        >
          The Butter Chicken Spot
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-[#FFF8CC]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-8">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link 
              key={path}
              to={path} 
              className={`flex items-center gap-3 text-[#FFF8CC] hover:bg-white/10 px-4 py-2 rounded-full transition-all duration-200 ${
                location.pathname === path ? 'bg-white/20 font-bold' : ''
              }`}
            >
              <Icon size={24} />
              <span className="text-lg">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-r from-[#F26722] to-[#FF850A] py-4 px-4 shadow-lg">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link 
              key={path}
              to={path} 
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-3 text-[#FFF8CC] hover:bg-white/10 px-4 py-3 rounded-lg transition-all duration-200 mb-2 ${
                location.pathname === path ? 'bg-white/20 font-bold' : ''
              }`}
            >
              <Icon size={24} />
              <span className="text-lg">{label}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}