import { motion } from 'framer-motion';

export const TextSkeleton = ({ width = "100%", height = "1rem" }) => (
  <div 
    className="bg-gradient-to-r from-[#F26722]/10 to-[#FF850A]/10 rounded animate-pulse"
    style={{ width, height }}
  />
);

export const ImageSkeleton = ({ className }) => (
  <div className={`bg-gradient-to-r from-[#F26722]/10 to-[#FF850A]/10 rounded-3xl animate-pulse ${className}`} />
);

export const CardSkeleton = () => (
  <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
    <TextSkeleton width="60%" height="1.5rem" />
    <TextSkeleton />
    <TextSkeleton width="80%" />
  </div>
);

export const ContentSkeleton = () => (
  <div className="space-y-8">
    {[...Array(3)].map((_, i) => (
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
      />
    ))}
  </div>
);

export const ShimmerEffect = () => (
  <div 
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
    style={{
      backgroundSize: '200% 100%',
      animation: 'shimmer 2s infinite linear'
    }}
  />
); 