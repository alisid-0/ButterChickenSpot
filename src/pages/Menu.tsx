import React from 'react';
import { menuItems } from '../data/menu';

export default function Menu() {
  return (
    <div className="min-h-screen bg-[#FFF8CC] pt-24 pb-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-[#434725] text-center mb-12">Our Menu</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {menuItems.map((item) => (
            <div 
              key={item.name}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-semibold text-[#434725]">{item.name}</h3>
                  <span className="text-xl font-bold text-[#F26722]">${item.price}</span>
                </div>
                <p className="text-[#434725]/80">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}