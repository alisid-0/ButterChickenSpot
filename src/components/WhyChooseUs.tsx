import React from 'react';
import { Award, Heart, ThumbsUp, Utensils } from 'lucide-react';

const features = [
  {
    icon: Utensils,
    title: "Authentic Recipe",
    description: "Our butter chicken recipe has been perfected over generations"
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every dish is prepared with passion and dedication"
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized as the best butter chicken in the city"
  },
  {
    icon: ThumbsUp,
    title: "Quality Ingredients",
    description: "We use only the finest, freshest ingredients"
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-32 bg-[#FFF8CC]">
      <div className="container mx-auto px-8">
        <h2 className="text-5xl font-bold text-[#F26722] text-center mb-16">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map(({ icon: Icon, title, description }) => (
            <div 
              key={title}
              className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="bg-[#F26722] w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                <Icon className="w-12 h-12 text-[#FFF8CC]" />
              </div>
              <h3 className="text-2xl font-bold text-[#F26722] mb-4">{title}</h3>
              <p className="text-[#F26722]/80 text-lg">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}