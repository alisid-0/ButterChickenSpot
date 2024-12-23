import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Clock, Heart, ChefHat, Sparkles, UtensilsCrossed } from 'lucide-react';

export default function About() {
  const stats = [
    { icon: Users, value: '10K+', label: 'Happy Customers' },
    { icon: Clock, value: '3+', label: 'Years of Excellence' },
    { icon: Award, value: '15+', label: 'Awards Won' },
    { icon: Heart, value: '1', label: 'Signature Dish' },
  ];

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-16 md:pb-24 bg-[#FFF8CC]">
      <div className="container mx-auto px-4 md:px-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-black text-[#434725] mb-6">Our Story</h1>
          <p className="text-xl text-[#434725]/80 max-w-2xl mx-auto">
            From a simple dream to the perfect butter chicken
          </p>
        </motion.div>

        {/* Timeline Section */}
        <div className="max-w-5xl mx-auto mb-32">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#F26722]/20" />
            
            {/* Timeline items */}
            {[
              {
                year: '2020',
                title: 'The Beginning',
                description: 'Started in a small kitchen with one goal: perfect butter chicken',
                icon: ChefHat,
              },
              {
                year: '2021',
                title: 'First Restaurant',
                description: 'Opened our doors to overwhelming support from the community',
                icon: UtensilsCrossed,
              },
              {
                year: '2023',
                title: 'Award Winning',
                description: 'Recognized as the city\'s best butter chicken spot',
                icon: Award,
              },
              {
                year: 'Today',
                title: 'Growing Strong',
                description: 'Continuing to serve happiness, one plate at a time',
                icon: Sparkles,
              },
            ].map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative mb-16 last:mb-0"
              >
                <div className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                  <div className="w-1/2 flex justify-end">
                    <div className={`bg-white p-6 md:p-8 rounded-3xl shadow-xl max-w-lg ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="text-[#F26722] font-black text-xl mb-2">{item.year}</div>
                      <h3 className="text-2xl font-bold text-[#434725] mb-3">{item.title}</h3>
                      <p className="text-[#434725]/70">{item.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#F26722] flex items-center justify-center shadow-lg">
                      <item.icon className="w-6 h-6 text-[#FFF8CC]" />
                    </div>
                  </div>
                  <div className="w-1/2" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Story Section - New */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mb-32 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#F26722] to-[#FF850A] rounded-3xl transform -rotate-1" />
          <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-black text-[#434725]">The Secret Behind Our Success</h2>
                <div className="space-y-4 text-lg text-[#434725]/80">
                  <p>
                    What makes our butter chicken special isn't just the recipe—it's the love and dedication 
                    we pour into every dish. Our journey began with a simple dream: to create the perfect 
                    butter chicken experience.
                  </p>
                  <p>
                    We spent countless hours perfecting our signature sauce, experimenting with different 
                    spice blends until we found the perfect balance. Our chefs treat each batch like a work 
                    of art, ensuring every plate that leaves our kitchen is nothing short of extraordinary.
                  </p>
                  <p className="font-medium text-[#F26722]">
                    "The magic isn't in the recipe—it's in the heart we put into making it."
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-[#434725] rounded-2xl transform translate-x-2 translate-y-2" />
                <img 
                  src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800"
                  alt="Our signature butter chicken"
                  className="relative rounded-2xl shadow-lg w-full"
                />
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-6 -right-6 bg-[#F6BF23] w-24 h-24 rounded-full flex items-center justify-center p-4 shadow-lg"
                >
                  <div className="text-center text-[#434725] font-black text-sm">
                    MADE WITH LOVE
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-32">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-lg text-center group hover:bg-[#F26722] transition-colors duration-300"
            >
              <stat.icon className="w-8 h-8 md:w-12 md:h-12 text-[#F26722] mx-auto mb-3 group-hover:text-[#FFF8CC] transition-colors" />
              <div className="text-2xl md:text-4xl font-black text-[#434725] mb-1 group-hover:text-[#FFF8CC] transition-colors">{stat.value}</div>
              <div className="text-sm md:text-base text-[#434725]/70 group-hover:text-[#FFF8CC]/90 transition-colors">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black text-[#434725] mb-16">Meet Our Butter Chicken Experts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Chef Priya',
                role: 'Head Chef',
                image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&q=80&w=800',
              },
              {
                name: 'Chef Raj',
                role: 'Sauce Master',
                image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800',
              },
              {
                name: 'Chef Sarah',
                role: 'Spice Expert',
                image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&q=80&w=800',
              },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#F26722] to-[#FF850A] rounded-3xl transform rotate-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-[#434725]">{member.name}</h3>
                    <p className="text-[#434725]/70">{member.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}