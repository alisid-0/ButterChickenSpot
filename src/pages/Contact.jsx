import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-16 md:pb-24 bg-[#FFF8CC]">
      <div className="container mx-auto px-4 md:px-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-black text-[#434725] mb-6">Get in Touch</h1>
          <p className="text-xl text-[#434725]/80 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you!
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-32">
          {/* Contact Form */}
          <div className="relative">
            <div className="absolute top-0 left-1 right-1 bottom-[290px] bg-gradient-to-r from-[#F26722] to-[#FF850A] rounded-3xl transform rotate-1" style={{ zIndex: 0 }} />
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative bg-white rounded-3xl p-8 shadow-xl"
              style={{ zIndex: 1 }}
            >
              <h2 className="text-3xl font-black text-[#434725] mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-[#434725] font-bold mb-2" htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#434725]/10 focus:border-[#F26722] focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-[#434725] font-bold mb-2" htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#434725]/10 focus:border-[#F26722] focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-[#434725] font-bold mb-2" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#434725]/10 focus:border-[#F26722] focus:outline-none transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  className="group w-full bg-[#F26722] text-[#FFF8CC] px-8 py-4 rounded-xl font-bold hover:bg-[#FF850A] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Send Message
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl p-8 shadow-xl"
            >
              <h2 className="text-3xl font-black text-[#434725] mb-6">Quick Contact</h2>
              <div className="space-y-6">
                {[
                  { icon: Phone, label: 'Phone', value: '(123) 456-7890', href: 'tel:1234567890' },
                  { icon: Mail, label: 'Email', value: 'hello@butterchickenspot.com', href: 'mailto:hello@butterchickenspot.com' },
                  { icon: MapPin, label: 'Location', value: '123 Butter Lane, Foodie City', href: 'https://maps.google.com' },
                  { icon: Clock, label: 'Hours', value: 'Mon-Sun: 11am - 10pm', href: null },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href || '#'}
                    className={`flex items-start gap-4 group ${item.href ? 'hover:text-[#F26722]' : ''} transition-colors`}
                  >
                    <item.icon className="w-6 h-6 text-[#F26722] mt-1" />
                    <div>
                      <div className="font-bold text-[#434725]">{item.label}</div>
                      <div className="text-[#434725]/70">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-xl"
            >
              <h2 className="text-3xl font-black text-[#434725] mb-6">Connect With Us</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
                  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
                  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-[#F26722]/5 transition-colors group"
                  >
                    <social.icon className="w-8 h-8 text-[#F26722] group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-bold text-[#434725]">{social.label}</span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Chat Bubble */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#F26722] rounded-3xl p-8 shadow-xl text-[#FFF8CC] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF850A] rounded-full blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2" />
              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <MessageCircle className="w-8 h-8" />
                  <h2 className="text-2xl font-black">Live Chat</h2>
                </div>
                <p className="mb-6">
                  Need immediate assistance? Chat with our team now!
                </p>
                <button className="bg-[#FFF8CC] text-[#F26722] px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors">
                  Start Chat
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden h-[400px] shadow-xl"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.2688!2d-79.3849!3d43.6529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDM5JzEwLjQiTiA3OcKwMjMnMDUuNiJX!5e0!3m2!1sen!2sca!4v1620835678974!5m2!1sen!2sca"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </div>
  );
}