import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-[#434725] text-center mb-12">Contact Us</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-[#434725] mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#F26722]" />
                <div>
                  <h3 className="font-semibold text-[#434725]">Address</h3>
                  <p className="text-[#434725]/80">123 Foodie Street, Flavor Town</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-[#F26722]" />
                <div>
                  <h3 className="font-semibold text-[#434725]">Phone</h3>
                  <p className="text-[#434725]/80">(555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-[#F26722]" />
                <div>
                  <h3 className="font-semibold text-[#434725]">Email</h3>
                  <p className="text-[#434725]/80">hello@butterchickenspot.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-[#F26722]" />
                <div>
                  <h3 className="font-semibold text-[#434725]">Hours</h3>
                  <p className="text-[#434725]/80">
                    Monday - Sunday<br />
                    11:00 AM - 10:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-[#434725] mb-6">Send us a Message</h2>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#434725] mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F26722] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#434725] mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F26722] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#434725] mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F26722] focus:border-transparent"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#F26722] text-[#FFF8CC] py-3 rounded-lg font-semibold hover:bg-[#F26722]/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}