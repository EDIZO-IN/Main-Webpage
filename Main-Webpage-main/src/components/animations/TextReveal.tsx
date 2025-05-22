import React from 'react';
import { motion } from 'framer-motion';

interface TextRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const TextReveal: React.FC<TextRevealProps> = ({ 
  children, 
  delay = 0,
  direction = 'up'
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: "100%" };
      case 'down': return { y: "-100%" };
      case 'left': return { x: "100%" };
      case 'right': return { x: "-100%" };
    }
  };

  const getFinalPosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0 };
      case 'left':
      case 'right':
        return { x: 0 };
    }
  };

  return (
    <div className="overflow-hidden">
      <motion.div
        initial={getInitialPosition()}
        animate={getFinalPosition()}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.6, 0.01, -0.05, 0.9]
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const TextGradient: React.FC<TextRevealProps & { 
  gradient?: string;
}> = ({ 
  children, 
  delay = 0,
  gradient = "from-edizo-red via-edizo-silver to-edizo-red"
}) => {
  return (
    <motion.span
      initial={{ 
        backgroundPosition: "200% 0",
        opacity: 0,
        scale: 0.95
      }}
      animate={{ 
        backgroundPosition: "0% 0",
        opacity: 1,
        scale: 1
      }}
      transition={{
        duration: 1,
        delay,
        ease: "easeOut"
      }}
      className={`bg-gradient-to-r ${gradient} bg-[length:200%_auto] bg-clip-text text-transparent inline-block`}
    >
      {children}
    </motion.span>
  );
};

export const TextSplit: React.FC<TextRevealProps> = ({ 
  children, 
  delay = 0 
}) => {
  const text = children?.toString() || '';
  const words = text.split(' ');

  return (
    <span className="inline-block">
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.1,
            ease: "easeOut"
          }}
        >
          {word}
          {i !== words.length - 1 && ' '}
        </motion.span>
      ))}
    </span>
  );
};