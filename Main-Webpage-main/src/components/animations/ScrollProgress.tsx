import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

// === Scroll Progress Bar ===
export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-gray-300 to-red-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
};

// === Scroll Down Indicator ===
export const ScrollIndicator: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.85]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40"
      style={{ opacity, scale }}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="flex flex-col items-center"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-white dark:border-gray-300 rounded-full p-1 mb-2">
          <motion.div
            className="w-1 h-2 bg-white dark:bg-gray-300 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </div>
        <motion.span
          className="text-white dark:text-gray-300 text-sm font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          Scroll
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

// === Parallax Section ===
interface ParallaxSectionProps {
  children: React.ReactNode;
  offset?: number;
  direction?: "vertical" | "horizontal";
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  offset = 50,
  direction = "vertical",
}) => {
  const { scrollYProgress } = useScroll();
  const transformValue = useTransform(scrollYProgress, [0, 1], [0, offset]);

  return (
    <motion.div style={direction === "vertical" ? { y: transformValue } : { x: transformValue }}>
      {children}
    </motion.div>
  );
};
