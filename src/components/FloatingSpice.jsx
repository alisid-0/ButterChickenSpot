import { motion } from 'framer-motion';
import { Circle } from 'lucide-react';

type Props = {
  delay: number;
  x: number;
  y: number;
  size?: number;
};

export default function FloatingSpice({ delay, x, y, size = 4 }: Props) {
  return (
    <motion.div
      className="absolute"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 0],
        scale: [0, 1.2, 0],
        x: [x, x + Math.random() * 100 - 50],
        y: [y, y - 200]
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 2
      }}
    >
      <Circle className={`w-${size} h-${size} text-[#FFF8CC]/30`} />
    </motion.div>
  );
}