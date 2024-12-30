import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#F26722] to-[#FF850A] text-[#FFF8CC]">
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-black mb-6">The Butter Chicken Spot</h3>
            <p className="text-[#FFF8CC]/90 mb-6">
              Where tradition meets perfection in every bite of our signature butter chicken.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="hover:text-white transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="hover:text-white transition-colors">
                <Twitter size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/menu', label: 'Our Menu' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
              ].map(link => (
                <li key={link.to}>
                  <Link 
                    to={link.to}
                    className="hover:text-white transition-colors inline-flex items-center gap-2 group"
                  >
                    <span>{link.label}</span>
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} />
                <span>14817 Clayton Rd, Chesterfield, MO 63017</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} />
                <span>thebutterchickenspot@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xl font-bold mb-6">Hours</h3>
            <ul className="space-y-2">
              {[
                { day: 'Everyday', hours: '11:00 AM - 11:00 PM' },
              ].map(schedule => (
                <li key={schedule.day} className="flex flex-col">
                  <span className="font-bold">{schedule.day}</span>
                  <span className="text-[#FFF8CC]/90">{schedule.hours}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-[#FFF8CC]/70 mt-1">(Exclusions may apply)</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#FFF8CC]/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#FFF8CC]/90 text-sm text-center md:text-left">
              © {new Date().getFullYear()} The Butter Chicken Spot. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 