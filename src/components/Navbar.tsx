import React from 'react';
import { Menu, Home, Info, PhoneCall } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/menu', icon: Menu, label: 'Menu' },
    { path: '/about', icon: Info, label: 'About' },
    { path: '/contact', icon: PhoneCall, label: 'Contact' },
  ];
  
  return (
    <nav className="bg-gradient-to-r from-[#F26722] to-[#FF850A] py-6 px-8 fixed w-full top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="text-[#FFF8CC] text-3xl font-bold transform hover:scale-105 transition-transform duration-200"
        >
          The Butter Chicken Spot
        </Link>
        <div className="flex gap-8">
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
    </nav>
  );
}