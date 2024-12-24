import React from 'react';
import { motion } from 'framer-motion';
import { useMenu } from '../hooks/useMenu';
import { Flame, Leaf } from 'lucide-react';

export default function Menu() {
  const { menuItems, loading, error } = useMenu();
  
  const classicItems = menuItems.filter(item => 
    !item.categories?.includes('remix') && 
    !item.categories?.includes('special')
  );
  const remixItems = menuItems.filter(item => item.categories?.includes('remix'));
  const specialItem = menuItems.find(item => item.categories?.includes('special'));

  if (loading) {
    return <div className="min-h-screen bg-[#FFF8CC] flex items-center justify-center">
      <div className="text-xl text-[#434725]">Loading menu...</div>
    </div>;
  }

  if (error) {
    return <div className="min-h-screen bg-[#FFF8CC] flex items-center justify-center">
      <div className="text-xl text-[#434725]">Error loading menu: {error}</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-[#FFF8CC]">
      {/* Hero Banner */}
      <div className="relative h-[30vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#EF4423] to-[#F26722]">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-[#EF4423] blur-3xl" />
            <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-[#FF850A] blur-3xl" />
          </div>
        </div>
        <div className="relative h-full flex items-center justify-center text-center">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-7xl font-black text-[#FFF8CC] mb-2"
            >
              Our Menu
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-[#FFF8CC]/90 max-w-2xl mx-auto px-4"
            >
              Savor the perfect blend of spices and creamy textures in every dish
            </motion.p>
          </div>
        </div>
      </div>

      {/* Special of the Week */}
      <div className="container mx-auto px-4 md:px-8 py-16">
        {specialItem && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto mb-24"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#EF4423] to-[#F26722] rounded-3xl transform rotate-2" />
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative aspect-video md:aspect-auto">
                  <img
                    src={specialItem.image}
                    alt={specialItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-4xl font-black text-[#434725] mb-4">{specialItem.name}</h3>
                  <p className="text-lg text-[#434725]/80 mb-6">{specialItem.description}</p>
                  <div className="text-2xl font-black text-[#F26722] mb-8">${specialItem.price}</div>
                  <button className="inline-flex items-center justify-center gap-2 bg-[#F26722] text-[#FFF8CC] px-8 py-4 rounded-full font-bold hover:bg-[#FF850A] transition-colors">
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Classic Menu */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-[#434725] mb-6">Classic Menu</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-24">
          {classicItems.map((item, index) => (
            <motion.div 
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#F26722] to-[#FF850A] rounded-3xl transform rotate-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {item.categories?.includes('spicy') && (
                    <div className="absolute top-4 right-4 bg-[#EF4423] text-[#FFF8CC] px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                      <Flame className="w-4 h-4" />
                      Spicy
                    </div>
                  )}
                  {item.categories?.includes('vegetarian') && (
                    <div className="absolute top-4 left-4 bg-[#434725] text-[#FFF8CC] px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                      <Leaf className="w-4 h-4" />
                      Veg
                    </div>
                  )}
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#434725]">{item.name}</h3>
                    <span className="text-xl md:text-2xl font-black text-[#F26722]">${item.price}</span>
                  </div>
                  <p className="text-[#434725]/80 text-base md:text-lg mb-4">{item.description}</p>
                  {item.spiceLevel > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#434725]">Spice Level:</span>
                      <div className="flex gap-1">
                        {[...Array(item.spiceLevel)].map((_, i) => (
                          <Flame key={i} className="w-4 h-4 text-[#EF4423]" />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Remix Menu */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-black text-[#434725] mb-6">REMIX!</h2>
          <p className="text-xl text-[#434725]/80 max-w-2xl mx-auto">
            Modern twists on our classic butter chicken
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {remixItems.map((item, index) => (
            <motion.div 
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#F26722] to-[#FF850A] rounded-3xl transform rotate-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {item.categories?.includes('spicy') && (
                    <div className="absolute top-4 right-4 bg-[#EF4423] text-[#FFF8CC] px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                      <Flame className="w-4 h-4" />
                      Spicy
                    </div>
                  )}
                  {item.categories?.includes('vegetarian') && (
                    <div className="absolute top-4 left-4 bg-[#434725] text-[#FFF8CC] px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                      <Leaf className="w-4 h-4" />
                      Veg
                    </div>
                  )}
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#434725]">{item.name}</h3>
                    <span className="text-xl md:text-2xl font-black text-[#F26722]">${item.price}</span>
                  </div>
                  <p className="text-[#434725]/80 text-base md:text-lg mb-4">{item.description}</p>
                  {item.spiceLevel > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#434725]">Spice Level:</span>
                      <div className="flex gap-1">
                        {[...Array(item.spiceLevel)].map((_, i) => (
                          <Flame key={i} className="w-4 h-4 text-[#EF4423]" />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}