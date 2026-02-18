import { useEffect, useRef } from 'react';
import { fadeInScroll } from '../utils/animations';

/**
 * Custom hook for scroll-triggered animations
 * Automatically animates elements when they enter the viewport
 * @param {object} options - GSAP animation options
 */
const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const animation = fadeInScroll(elementRef.current, options);

    return () => {
      if (animation && animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      if (animation) {
        animation.kill();
      }
    };
  }, [options]);

  return elementRef;
};

export default useScrollAnimation;
