import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

/**
 * Page Transition with Fade Effect
 * Smooth page transitions between routes
 */
const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 0.3, 
        ease: 'easeInOut'
      }}
      style={{ 
        width: '100%',
        minHeight: '100vh'
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
