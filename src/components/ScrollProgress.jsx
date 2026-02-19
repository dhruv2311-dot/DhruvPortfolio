import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Scroll Progress Indicator
 * Simple top progress bar
 */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #00d4ff, #8b5cf6, #f43f5e)',
        transformOrigin: '0%',
        scaleX,
        zIndex: 9999
      }}
    />
  );
};

export default ScrollProgress;
