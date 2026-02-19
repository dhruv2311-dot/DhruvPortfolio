import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import './Loader.css';

/**
 * Loading Screen Component
 * Full-screen animated loader with Lottie animation from @lottiefiles
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

  return (
    <motion.div
      className="loader-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <div className="loader-content">
        {/* Professional Lottie Animation */}
        <motion.div
          className="loader-logo"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Player
            autoplay
            loop
            src="https://lottie.host/4c5b5e7f-3a4c-4e0e-9c6a-2c6d3f3e3c3e/UFdOPP5CqX.json"
            style={{ height: '200px', width: '200px' }}
          />
        </motion.div>

        {/* Loading Text with Gradient */}
        <motion.h2
          className="loader-text gradient-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <span style={{
            background: 'linear-gradient(90deg, #00d4ff, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '1.5rem',
            fontWeight: 700
          }}>
            Loading Portfolio
          </span>
        </motion.h2>

        {/* Modern Progress Bar */}
        <div className="loader-progress-container">
          <motion.div
            className="loader-progress-bar"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'linear-gradient(90deg, #00d4ff, #8b5cf6)',
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)'
            }}
          />
        </div>

        {/* Progress Percentage */}
        <motion.p
          className="loader-percentage"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            color: '#00d4ff',
            fontSize: '1rem',
            fontWeight: 600
          }}
        >
          {progress}%
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Loader;
