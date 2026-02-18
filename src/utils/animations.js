import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP Animation Utilities
 * Centralized animation functions for consistent effects across the portfolio
 */

// ===================================
// FADE & SLIDE ANIMATIONS
// ===================================

/**
 * Fade in elements with optional slide direction
 * @param {string|Element} target - CSS selector or DOM element
 * @param {object} options - Animation options
 */
export const fadeIn = (target, options = {}) => {
  const defaults = {
    duration: 1,
    opacity: 0,
    y: 30,
    ease: 'power3.out',
    stagger: 0.1,
    ...options
  };

  return gsap.from(target, defaults);
};

/**
 * Fade in with scroll trigger
 * @param {string|Element} target - CSS selector or DOM element
 * @param {object} options - Animation options
 */
export const fadeInScroll = (target, options = {}) => {
  const defaults = {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: target,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
    },
    ...options
  };

  return gsap.from(target, defaults);
};

/**
 * Stagger animation for multiple elements
 * @param {string|Element} target - CSS selector or DOM element
 * @param {object} options - Animation options
 */
export const staggerFadeIn = (target, options = {}) => {
  const defaults = {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
    ...options
  };

  return gsap.from(target, defaults);
};

// ===================================
// TEXT ANIMATIONS
// ===================================

/**
 * Split text into characters and animate
 * @param {string|Element} target - CSS selector or DOM element
 * @param {object} options - Animation options
 */
export const animateText = (target, options = {}) => {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return null;

  const text = element.textContent;
  element.innerHTML = '';

  // Split text into characters
  const chars = text.split('').map(char => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    element.appendChild(span);
    return span;
  });

  const defaults = {
    opacity: 0,
    y: 50,
    rotationX: -90,
    duration: 0.8,
    stagger: 0.03,
    ease: 'back.out(1.7)',
    ...options
  };

  return gsap.from(chars, defaults);
};

/**
 * Gradient text animation
 * @param {string|Element} target - CSS selector or DOM element
 */
export const animateGradientText = (target) => {
  return gsap.to(target, {
    backgroundPosition: '200% center',
    duration: 3,
    ease: 'none',
    repeat: -1,
  });
};

// ===================================
// SCROLL ANIMATIONS
// ===================================

/**
 * Parallax scroll effect
 * @param {string|Element} target - CSS selector or DOM element
 * @param {number} speed - Parallax speed (0-1, where 0.5 is half speed)
 */
export const parallax = (target, speed = 0.5) => {
  return gsap.to(target, {
    y: () => window.innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: target,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

/**
 * Pin element during scroll
 * @param {string|Element} target - CSS selector or DOM element
 * @param {object} options - ScrollTrigger options
 */
export const pinElement = (target, options = {}) => {
  const defaults = {
    trigger: target,
    start: 'top top',
    end: '+=100%',
    pin: true,
    scrub: 1,
    ...options
  };

  return ScrollTrigger.create(defaults);
};

/**
 * Scale on scroll
 * @param {string|Element} target - CSS selector or DOM element
 * @param {object} options - Animation options
 */
export const scaleOnScroll = (target, options = {}) => {
  const defaults = {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: target,
      start: 'top 80%',
      end: 'top 30%',
      scrub: 1,
    },
    ...options
  };

  return gsap.from(target, defaults);
};

// ===================================
// HOVER ANIMATIONS
// ===================================

/**
 * Magnetic button effect
 * @param {Element} button - Button element
 * @param {number} strength - Magnetic strength (default: 0.5)
 */
export const magneticButton = (button, strength = 0.5) => {
  if (!button) return;

  const handleMouseMove = (e) => {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    gsap.to(button, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  button.addEventListener('mousemove', handleMouseMove);
  button.addEventListener('mouseleave', handleMouseLeave);

  // Return cleanup function
  return () => {
    button.removeEventListener('mousemove', handleMouseMove);
    button.removeEventListener('mouseleave', handleMouseLeave);
  };
};

/**
 * Tilt effect on hover
 * @param {Element} element - Element to tilt
 * @param {number} maxTilt - Maximum tilt angle in degrees
 */
export const tiltOnHover = (element, maxTilt = 10) => {
  if (!element) return;

  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);

    gsap.to(element, {
      rotationY: percentX * maxTilt,
      rotationX: -percentY * maxTilt,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// ===================================
// PAGE TRANSITION ANIMATIONS
// ===================================

/**
 * Page enter animation
 * @param {Element} element - Page container element
 */
export const pageEnter = (element) => {
  return gsap.from(element, {
    opacity: 0,
    y: 50,
    duration: 0.6,
    ease: 'power3.out',
  });
};

/**
 * Page exit animation
 * @param {Element} element - Page container element
 */
export const pageExit = (element) => {
  return gsap.to(element, {
    opacity: 0,
    y: -50,
    duration: 0.4,
    ease: 'power3.in',
  });
};

// ===================================
// TIMELINE ANIMATIONS
// ===================================

/**
 * Create hero section timeline
 * @param {object} elements - Object containing element selectors
 */
export const createHeroTimeline = (elements) => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from(elements.title, {
    opacity: 0,
    y: 100,
    duration: 1,
  })
  .from(elements.subtitle, {
    opacity: 0,
    y: 50,
    duration: 0.8,
  }, '-=0.5')
  .from(elements.description, {
    opacity: 0,
    y: 30,
    duration: 0.8,
  }, '-=0.4')
  .from(elements.buttons, {
    opacity: 0,
    y: 30,
    stagger: 0.2,
    duration: 0.6,
  }, '-=0.4');

  return tl;
};

/**
 * Create loading screen timeline
 * @param {object} elements - Object containing element selectors
 * @param {function} onComplete - Callback when animation completes
 */
export const createLoaderTimeline = (elements, onComplete) => {
  const tl = gsap.timeline({ 
    onComplete,
    defaults: { ease: 'power3.inOut' }
  });

  tl.to(elements.logo, {
    scale: 1.2,
    duration: 0.8,
  })
  .to(elements.logo, {
    scale: 1,
    duration: 0.6,
  })
  .to(elements.container, {
    opacity: 0,
    scale: 0.9,
    duration: 0.5,
  })
  .to(elements.container, {
    display: 'none',
  });

  return tl;
};

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Kill all ScrollTriggers
 */
export const killAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

/**
 * Refresh all ScrollTriggers
 */
export const refreshScrollTriggers = () => {
  ScrollTrigger.refresh();
};

/**
 * Batch scroll animations
 * @param {string} selector - CSS selector for elements to animate
 * @param {object} options - Animation options
 */
export const batchScrollAnimation = (selector, options = {}) => {
  const defaults = {
    interval: 0.1,
    batchMax: 3,
    onEnter: batch => gsap.from(batch, {
      opacity: 0,
      y: 50,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
    }),
    ...options
  };

  return ScrollTrigger.batch(selector, defaults);
};

export default {
  fadeIn,
  fadeInScroll,
  staggerFadeIn,
  animateText,
  animateGradientText,
  parallax,
  pinElement,
  scaleOnScroll,
  magneticButton,
  tiltOnHover,
  pageEnter,
  pageExit,
  createHeroTimeline,
  createLoaderTimeline,
  killAllScrollTriggers,
  refreshScrollTriggers,
  batchScrollAnimation,
};
