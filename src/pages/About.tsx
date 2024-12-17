import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#434725] mb-8">Our Story</h1>
          
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1974"
              alt="Restaurant interior"
              className="w-full h-96 object-cover"
            />
            
            <div className="p-8">
              <p className="text-lg text-[#434725]/80 mb-6">
                Founded in 2020, The Butter Chicken Spot was born from a simple idea: to perfect one dish and serve it with love. Our journey began in a small kitchen where our founder spent countless hours perfecting our signature butter chicken recipe.
              </p>
              
              <p className="text-lg text-[#434725]/80 mb-6">
                We believe in the power of simplicity and excellence. That's why we focus on just one main dish - our legendary butter chicken. Every batch is prepared fresh daily using a secret blend of spices and the finest ingredients.
              </p>
              
              <p className="text-lg text-[#434725]/80">
                Today, we're proud to be recognized as the go-to spot for butter chicken lovers. Our commitment to quality and consistency has earned us a loyal following and numerous culinary awards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}