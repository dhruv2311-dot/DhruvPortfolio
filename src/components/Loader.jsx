import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import './Loader.css';

/**
 * Loading Screen Component
 * Full-screen animated loader with Lottie animation
 * Displays before the main content loads
 */
const Loader = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Delay before calling onLoadComplete to show 100%
          setTimeout(() => {
            onLoadComplete();
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  // Simple Lottie-style animation data (you can replace with actual Lottie JSON)
  const animationData = {
    v: "5.7.4",
    fr: 60,
    ip: 0,
    op: 120,
    w: 200,
    h: 200,
    nm: "Loading",
    ddd: 0,
    assets: [],
    layers: []
  };

  return (
    <motion.div
      className="loader-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <div className="loader-content">
        {/* Animated Logo/Icon */}
        <motion.div
          className="loader-logo"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="loader-circle">
            <motion.div
              className="loader-circle-inner"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          className="loader-text gradient-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Loading Portfolio
        </motion.h2>

        {/* Progress Bar */}
        <div className="loader-progress-container">
          <motion.div
            className="loader-progress-bar"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Progress Percentage */}
        <motion.p
          className="loader-percentage"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {progress}%
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Loader;
