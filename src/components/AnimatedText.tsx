import React from 'react';
import { motion } from 'framer-motion';

type Props = {
  text: string;
  className?: string;
  delay?: number;
};

export default function AnimatedText({ text, className = "", delay = 0 }: Props) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {text}
    </motion.span>
  );
}