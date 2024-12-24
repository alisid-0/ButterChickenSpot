import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Utensils, Heart, Award, ThumbsUp, Facebook, Instagram, Twitter, Flame, Droplets, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedText from '../components/AnimatedText';
import { specialOfTheWeek, remixMenu } from '../data/specials';

// Lazy load Spline
const Spline = lazy(() => import('@splinetool/react-spline'));

// Skeleton loader component
const SkeletonLoader = () => (
  <div className="w-full h-full relative bg-gradient-to-r from-[#F26722]/5 to-[#FF850A]/5">
    {/* Animated shapes to mimic your 3D scene */}
    <div className="absolute inset-0 overflow-hidden">
      {/* Large circular gradient */}
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-r from-[#F26722]/10 to-[#FF850A]/10 animate-pulse" />
      
      {/* Multiple floating elements */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-16 h-16 rounded-lg bg-gradient-to-r from-[#F26722]/20 to-[#FF850A]/20"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 3,
            delay: i * 0.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            left: `${20 + (i * 15)}%`,
            top: `${30 + (i * 10)}%`
          }}
        />
      ))}
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" 
           style={{
             backgroundSize: '200% 100%',
             animation: 'shimmer 2s infinite'
           }}
      />
    </div>
    
    {/* Loading text */}
    <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 text-center">
      <div className="bg-[#F26722]/10 rounded-full px-6 py-3 animate-pulse">
        <p className="text-[#F26722] font-bold">Loading 3D Experience...</p>
      </div>
    </div>
  </div>
);

// Add shimmer animation
const shimmerAnimation = `
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

// Add style tag for shimmer animation
const style = document.createElement('style');
style.textContent = shimmerAnimation;
document.head.appendChild(style);

export default function Home() {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const [isSplineVisible, setIsSplineVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplineVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleSplineLoad = () => {
    setIsSplineLoaded(true);
  };

  return (
    <div className="min-h-screen bg-[#FFF8CC]">
      {/* Hero Section */}
      <div className="h-screen relative overflow-hidden">
        {/* Spline Background with Skeleton */}
        <AnimatePresence>
          <div className="absolute inset-0 -bottom-[60px]">
            <Suspense fallback={<SkeletonLoader />}>
              {isSplineVisible && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Spline 
                    scene="https://prod.spline.design/veWZgKRhxw0qyrhb/scene.splinecode"
                    className="w-full h-full"
                    onLoad={handleSplineLoad}
                    onMouseDown={(e) => e.preventDefault()}
                    onTouchStart={(e) => e.preventDefault()}
                  />
                </motion.div>
              )}
            </Suspense>
          </div>
        </AnimatePresence>

        {/* Main content - Only show after Spline loads */}
        <AnimatePresence>
          {isSplineLoaded && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative h-full flex items-center z-10"
            >
              <div className="container mx-auto px-8">
                <div className="max-w-4xl relative">
                  <div className="relative">
                    <AnimatedText
                      text="Savor"
                      className="text-8xl font-black text-[#434725] block mb-2"
                      delay={0.2}
                    />
                    <AnimatedText
                      text="Authentic"
                      className="text-8xl font-black text-[#434725] block mb-2"
                      delay={0.4}
                    />
                    <div className="flex items-center gap-4 mb-2">
                      <AnimatedText
                        text="Butter Chicken"
                        className="text-8xl font-black text-[#F26722]"
                        delay={0.6}
                      />
                      <motion.div
                        initial={{ opacity: 0, rotate: -180 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        <Utensils className="w-16 h-16 text-[#F26722]" />
                      </motion.div>
                    </div>
                  </div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="text-2xl text-[#434725] mt-8 mb-12 max-w-2xl"
                  >
                    Where tradition meets perfection in every bite. Our signature butter chicken 
                    is crafted with love, using a secret blend of spices passed down through generations.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  >
                    <Link
                      to="/menu"
                      className="group inline-flex items-center gap-3 bg-[#F26722] text-[#FFF8CC] px-12 py-6 rounded-full text-xl font-bold hover:bg-[#FF850A] hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      Explore Our Menu
                      <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Textured Border */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#434725] z-20">
          <div 
            className="absolute inset-0 opacity-20 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundSize: 'cover'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FFF8CC]" />
        </div>
      </div>

      {/* Combined Specialties, Special & Testimonials Section */}
      <section className="py-32 relative overflow-hidden bg-[#FFF8CC]">
        <div className="container mx-auto px-8">
          {/* Our Specialties */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl font-black text-[#434725] mb-6">Our Specialties</h2>
            <p className="text-xl text-[#434725]/80 max-w-2xl mx-auto">
              Discover what makes our butter chicken the talk of the town
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {[
              {
                icon: Flame,
                title: "Perfect Spice Blend",
                description: "A harmonious mix of traditional Indian spices"
              },
              {
                icon: Droplets,
                title: "Creamy Sauce",
                description: "Rich, velvety smooth curry that's pure comfort"
              },
              {
                icon: Heart,
                title: "Made Fresh Daily",
                description: "Prepared with love every morning"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="w-16 h-16 rounded-2xl bg-[#F26722] flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-[#FFF8CC]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#434725] mb-3">{feature.title}</h3>
                  <p className="text-[#434725]/70">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Special of the Week */}
          <div className="relative -mx-8 px-8 mb-48">
            {/* Enhanced paint texture background */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-x-[-100vw] inset-y-[-50px] bg-gradient-to-r from-[#EF4423] to-[#F26722]">
                {/* Sharper paint texture overlay */}
                <div 
                  className="absolute inset-0 opacity-50 mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: '200px 200px'
                  }}
                />
                {/* Paint splash effects using brand colors */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#F26722] blur-[50px] opacity-70" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#EF4423] blur-[50px] opacity-70" />
              </div>
            </div>

            {/* Special content */}
            <div className="relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-20"
              >
                <h2 className="text-6xl font-black text-[#FFF8CC] mb-6">Special of the Week</h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative max-w-4xl mx-auto"
              >
                <div className="absolute inset-0 bg-[#FFF8CC] rounded-3xl transform rotate-3" />
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="relative aspect-square md:aspect-auto">
                      <img
                        src={specialOfTheWeek.image}
                        alt={specialOfTheWeek.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="text-4xl font-black text-[#434725] mb-4">{specialOfTheWeek.name}</h3>
                      <p className="text-lg text-[#434725]/80 mb-6">{specialOfTheWeek.description}</p>
                      <div className="text-3xl font-black text-[#F26722] mb-8">
                        ${specialOfTheWeek.price}
                      </div>
                      <Link
                        to="/menu"
                        className="group inline-flex items-center justify-center gap-2 bg-[#F26722] text-[#FFF8CC] px-8 py-4 rounded-full font-bold hover:bg-[#FF850A] transition-all duration-300 hover:scale-105 shadow-lg"
                      >
                        Order Now
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Testimonials Section - Moved inside */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 pt-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#F26722] to-[#FF850A] rounded-3xl transform rotate-3" />
              <img
                src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800"
                alt="Butter Chicken Dish"
                className="relative rounded-3xl shadow-xl w-full h-[600px] object-cover"
              />
            </motion.div>
            
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-5xl font-black text-[#434725]">What Our Customers Say</h2>
                <p className="text-xl text-[#434725]/80">
                  Join thousands of satisfied customers who've experienced our signature butter chicken
                </p>
              </motion.div>

              <div className="space-y-8">
                {[
                  {
                    quote: "The best butter chicken I've ever had! The sauce is perfectly balanced.",
                    author: "Sarah J.",
                    rating: 5
                  },
                  {
                    quote: "A taste of authentic Indian cuisine. Simply amazing!",
                    author: "Michael R.",
                    rating: 5
                  }
                ].map((testimonial, index) => (
                  <motion.div
                    key={testimonial.author}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-2xl shadow-lg"
                  >
                    <div className="flex gap-1 mb-4 text-[#F26722]">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-lg text-[#434725] mb-4 italic">"{testimonial.quote}"</p>
                    <p className="text-[#434725] font-bold">{testimonial.author}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media CTA */}
      <section className="py-32 bg-[#F26722] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[#FF850A] blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#EF4423] blur-3xl" />
        </div>
        
        <div className="container mx-auto px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl font-black text-[#FFF8CC] mb-8"
            >
              Join Our Butter Chicken<br />Community
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-[#FFF8CC]/90 mb-12 max-w-2xl mx-auto"
            >
              Follow us on social media for exclusive offers, behind-the-scenes content, and to share your butter chicken moments with us!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex justify-center gap-6"
            >
              {[
                { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
                { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
                { icon: Twitter, label: "Twitter", href: "https://twitter.com" }
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-[#FFF8CC] text-[#F26722] px-8 py-4 rounded-full text-lg font-bold hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <Icon className="w-6 h-6" />
                  <span>{label}</span>
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}