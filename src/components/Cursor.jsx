import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Cursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(true); // Default to mobile to prevent flash of hidden cursor

  useEffect(() => {
    // Check if device is desktop
    const checkDevice = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isTouch || isSmallScreen);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    if (isMobile) {
      document.body.style.cursor = 'auto';
      return;
    }

    // Hide default cursor
    document.body.style.cursor = 'none';
    const links = document.querySelectorAll('a, button, .btn, input, textarea');
    links.forEach(link => {
        link.style.cursor = 'none';
    });

    // Initial setup for centering
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50, opacity: 0 });
    gsap.set(followerRef.current, { xPercent: -50, yPercent: -50, opacity: 0 });

    const onMouseMove = (e) => {
        // Make visible on first move
        gsap.to([cursorRef.current, followerRef.current], { opacity: 1, duration: 0.3 });
        
        gsap.to(cursorRef.current, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power1.out"
        });
        gsap.to(followerRef.current, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.15, // Faster follow
            ease: "power2.out"
        });
    };

    const onExpectHover = () => {
        gsap.to(cursorRef.current, { scale: 0, duration: 0.3 });
        gsap.to(followerRef.current, { 
            scale: 2, 
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            borderColor: 'rgba(102, 126, 234, 0.8)',
            duration: 0.3 
        });
    };

    const onExpectLeave = () => {
        gsap.to(cursorRef.current, { scale: 1, duration: 0.3 });
        gsap.to(followerRef.current, { 
            scale: 1, 
            backgroundColor: 'transparent',
            borderColor: 'rgba(102, 126, 234, 0.5)',
            duration: 0.3 
        });
    };

    window.addEventListener('mousemove', onMouseMove);
    
    // Add hover listeners to clickable elements
    const clickables = document.querySelectorAll('a, button, .btn, .card, input, textarea');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', onExpectHover);
      el.addEventListener('mouseleave', onExpectLeave);
      el.style.cursor = 'none'; // Ensure these also hide cursor
    });

    // Observer for new elements
    const observer = new MutationObserver(() => {
        const newClickables = document.querySelectorAll('a, button, .btn, .card, input, textarea');
        newClickables.forEach(el => {
            el.removeEventListener('mouseenter', onExpectHover); // Avoid duplicates
            el.removeEventListener('mouseleave', onExpectLeave);
            el.addEventListener('mouseenter', onExpectHover);
            el.addEventListener('mouseleave', onExpectLeave);
            el.style.cursor = 'none';
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      clickables.forEach(el => {
        el.removeEventListener('mouseenter', onExpectHover);
        el.removeEventListener('mouseleave', onExpectLeave);
      });
      observer.disconnect();
      document.body.style.cursor = 'auto';
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div 
        ref={cursorRef} 
        style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '12px',
            height: '12px',
            backgroundColor: '#667eea',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 99999, // Highest z-index
            mixBlendMode: 'normal' // Ensure visibility
        }}
      />
      <div 
        ref={followerRef} 
        style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '40px',
            height: '40px',
            border: '2px solid rgba(102, 126, 234, 0.5)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 99998,
            backgroundColor: 'transparent',
            transition: 'background-color 0.3s, border-color 0.3s, transform 0.3s'
        }}
      />
    </>
  );
};

export default Cursor;
