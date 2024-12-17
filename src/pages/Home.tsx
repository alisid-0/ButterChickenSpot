import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';
import ThreeBackground from '../components/ThreeBackground';
import WhyChooseUs from '../components/WhyChooseUs';
import AnimatedText from '../components/AnimatedText';
import FloatingSpice from '../components/FloatingSpice';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFF8CC]">
      {/* Hero Section */}
      <div className="h-screen relative overflow-hidden bg-gradient-to-br from-[#EF4423] via-[#F26722] to-[#FF850A]">
        <ThreeBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FFF8CC]/90" />
        
        {/* Floating spice particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <FloatingSpice
            key={i}
            delay={i * 0.2}
            x={Math.random() * window.innerWidth}
            y={window.innerHeight}
            size={Math.floor(Math.random() * 3) + 2}
          />
        ))}

        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl relative">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute -left-16 -top-16 w-32 h-32 bg-[#F6BF23] rounded-full blur-3xl opacity-30"
              />
              
              <div className="relative">
                <AnimatedText
                  text="Experience"
                  className="text-8xl font-bold text-[#FFF8CC] block mb-2"
                  delay={0.2}
                />
                <AnimatedText
                  text="the Best"
                  className="text-8xl font-bold text-[#FFF8CC] block mb-2"
                  delay={0.4}
                />
                <div className="flex items-center gap-4 mb-2">
                  <AnimatedText
                    text="Butter Chicken"
                    className="text-8xl font-bold text-[#FFF8CC]"
                    delay={0.6}
                  />
                  <motion.div
                    initial={{ opacity: 0, rotate: -180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <Utensils className="w-16 h-16 text-[#FFF8CC]" />
                  </motion.div>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="text-2xl text-[#FFF8CC] mt-8 mb-12 max-w-2xl"
              >
                Indulge in our signature butter chicken, where every bite tells a story of 
                tradition, passion, and culinary excellence.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <Link
                  to="/menu"
                  className="group inline-flex items-center gap-3 bg-[#FFF8CC] text-[#F26722] px-12 py-6 rounded-full text-xl font-bold hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  View Our Menu
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Testimonials Section */}
      <section className="py-32 bg-[#FFF8CC]">
        <div className="container mx-auto px-8">
          <h2 className="text-5xl font-bold text-[#F26722] text-center mb-16">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                name: "Sarah J.",
                quote: "Best butter chicken I've ever had! The sauce is perfectly balanced."
              },
              {
                name: "Michael C.",
                quote: "I'm addicted to their naan bread. It's always fresh and perfectly cooked."
              },
              {
                name: "Emily R.",
                quote: "The mango lassi is heavenly! A perfect complement to the spicy dishes."
              }
            ].map((testimonial) => (
              <motion.div 
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-[#F26722] text-[#FFF8CC] px-6 py-1 rounded-full text-sm font-medium">
                    ★★★★★
                  </div>
                </div>
                <p className="text-[#F26722] text-center mb-6 text-lg italic">"{testimonial.quote}"</p>
                <p className="text-[#F26722] font-bold text-center text-xl">{testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}