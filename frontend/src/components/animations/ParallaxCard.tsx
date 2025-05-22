import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

interface ParallaxCardProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
}

export const ParallaxCard: React.FC<ParallaxCardProps> = ({ 
  children, 
  className = "",
  depth = 20
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    const rotateX = (y - 0.5) * depth;
    const rotateY = (x - 0.5) * depth;

    // Add parallax effect to child elements
    const elements = cardRef.current.querySelectorAll('.parallax-element');
    elements.forEach((element: Element, index) => {
      const z = (index + 1) * 10;
      (element as HTMLElement).style.transform = `translateZ(${z}px)`;
    });

    cardRef.current.style.transform = `
      perspective(1000px)
      rotateX(${-rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.05, 1.05, 1.05)
    `;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;

    // Reset parallax elements
    const elements = cardRef.current.querySelectorAll('.parallax-element');
    elements.forEach((element: Element) => {
      (element as HTMLElement).style.transform = 'translateZ(0)';
    });

    cardRef.current.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
    `;
  };

  return (
    <motion.div
      ref={cardRef}
      className={`transition-all duration-300 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 20
          }
        }
      }}
      initial="hidden"
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export const ParallaxElement: React.FC<{ 
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <div className={`parallax-element transition-transform duration-300 ${className}`}>
      {children}
    </div>
  );
};