import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Loader.css';

/**
 * Loading Screen Component
 * Professional animated loader with CSS-driven orbital animation
 */
const Loader = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLoadComplete();
          }, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 3;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <motion.div
      className="loader-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
    >
      <div className="loader-content">
        {/* Orbital Animation */}
        <motion.div
          className="loader-orbital-wrap"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'backOut' }}
        >
          <div className="loader-orbital">
            <div className="loader-orbital-ring loader-ring-1"></div>
            <div className="loader-orbital-ring loader-ring-2"></div>
            <div className="loader-orbital-ring loader-ring-3"></div>
            <div className="loader-orbital-core">
              <span>DS</span>
            </div>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h2
          className="loader-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            background: 'linear-gradient(90deg, #00d4ff, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '0.5rem'
          }}
        >
          Dhruv Sonagra
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            color: '#64748b',
            fontSize: '0.9rem',
            marginBottom: '2rem',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}
        >
          Loading Portfolio
        </motion.p>

        {/* Progress Bar */}
        <div style={{
          width: '280px',
          height: '3px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '999px',
          overflow: 'hidden',
          margin: '0 auto 1rem'
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #00d4ff, #8b5cf6)',
              boxShadow: '0 0 15px rgba(0, 212, 255, 0.6)',
              borderRadius: '999px'
            }}
          />
        </div>

        {/* Percentage */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            color: '#00d4ff',
            fontSize: '0.875rem',
            fontWeight: 600,
            fontFamily: 'monospace'
          }}
        >
          {Math.min(progress, 100)}%
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Loader;
