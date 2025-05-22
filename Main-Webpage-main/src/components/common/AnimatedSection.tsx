import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

interface AnimatedSectionProps {
    children: React.ReactNode;
    delay?: number;
    threshold?: number;
    once?: boolean;
    offset?: string; // e.g., "-100px 0px"
    animationType?: 'fadeUp' | 'zoomIn' | 'slideLeft' | 'slideRight';
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
    children,
    delay = 0.2,
    threshold = 0.1,
    once = true,
    offset = '-100px 0px',
    animationType = 'fadeUp'
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const controls = useAnimation();

    const isInView = useInView(ref, {
        margin: offset,
        amount: threshold,
        once,
    });

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    const getAnimationVariant = () => {
        switch (animationType) {
            case 'fadeUp':
                return {
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                };
            case 'zoomIn':
                return {
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1 },
                };
            case 'slideLeft':
                return {
                    hidden: { opacity: 0, x: 30 },
                    visible: { opacity: 1, x: 0 },
                };
            case 'slideRight':
                return {
                    hidden: { opacity: 0, x: -30 },
                    visible: { opacity: 1, x: 0 },
                };
            default:
                return {
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                };
        }
    };

    return (
        <motion.div
            ref={ref}
            variants={getAnimationVariant()}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.6, delay }}
            viewport={{ amount: threshold }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedSection;