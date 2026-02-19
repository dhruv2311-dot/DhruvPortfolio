import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/**
 * Advanced Custom Cursor with Trail Effect
 * Context-aware cursor that changes based on hoverable elements
 */
const Cursor = () => {
  const cursorDot = useRef(null);
  const cursorOutline = useRef(null);
  const cursorTrail = useRef([]);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const isTouch = useRef(false);

  useEffect(() => {
    // Check for touch device
    isTouch.current = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch.current) return;

    const dot = cursorDot.current;
    const outline = cursorOutline.current;
    if (!dot || !outline) return;

    let rafId;
    let trailElements = [];

    // Create trail elements
    for (let i = 0; i < 5; i++) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.cssText = `
        position: fixed;
        width: ${8 - i}px;
        height: ${8 - i}px;
        background: rgba(0, 212, 255, ${0.3 - i * 0.05});
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
      `;
      document.body.appendChild(trail);
      trailElements.push({ el: trail, x: 0, y: 0 });
    }
    cursorTrail.current = trailElements;

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      if (!isVisible) setIsVisible(true);

      // Animate dot
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      // Animate outline with slight delay
      gsap.to(outline, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out'
      });
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    // Trail animation
    const animateTrail = () => {
      trailElements.forEach((trail, index) => {
        const delay = (index + 1) * 0.05;
        gsap.to(trail.el, {
          x: mousePos.current.x,
          y: mousePos.current.y,
          duration: 0.3 + delay,
          ease: 'power2.out'
        });
      });
      rafId = requestAnimationFrame(animateTrail);
    };

    // Handle hoverable elements
    const handleElementHover = () => {
      const hoverables = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, .hoverable, [data-cursor]'
      );

      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          setIsHovering(true);
          const cursorType = el.getAttribute('data-cursor');
          if (cursorType) setCursorText(cursorType);
          
          gsap.to(outline, {
            scale: 1.5,
            borderColor: '#8b5cf6',
            duration: 0.2
          });
          gsap.to(dot, {
            scale: 0.5,
            duration: 0.2
          });
        });

        el.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setCursorText('');
          
          gsap.to(outline, {
            scale: 1,
            borderColor: 'rgba(0, 212, 255, 0.5)',
            duration: 0.2
          });
          gsap.to(dot, {
            scale: 1,
            duration: 0.2
          });
        });
      });
    };

    // Click effects
    const onMouseDown = () => {
      gsap.to(dot, { scale: 0.8, duration: 0.1 });
      gsap.to(outline, { scale: 0.9, duration: 0.1 });
    };

    const onMouseUp = () => {
      gsap.to(dot, { scale: isHovering ? 0.5 : 1, duration: 0.1 });
      gsap.to(outline, { scale: isHovering ? 1.5 : 1, duration: 0.1 });
    };

    // Magnetic effect for buttons
    const handleMagneticEffect = (e) => {
      const magneticElements = document.querySelectorAll('.magnetic');
      magneticElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
        const maxDistance = 100;

        if (distance < maxDistance) {
          const strength = (maxDistance - distance) / maxDistance;
          gsap.to(el, {
            x: distanceX * strength * 0.3,
            y: distanceY * strength * 0.3,
            duration: 0.3,
            ease: 'power2.out'
          });
        } else {
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousemove', handleMagneticEffect);
    window.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Initial setup and observer for dynamic elements
    handleElementHover();
    const observer = new MutationObserver(handleElementHover);
    observer.observe(document.body, { childList: true, subtree: true });

    animateTrail();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousemove', handleMagneticEffect);
      window.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(rafId);
      observer.disconnect();
      
      // Clean up trail elements
      trailElements.forEach(trail => trail.el.remove());
    };
  }, [isHovering, isVisible]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorDot}
        className="cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          background: '#00d4ff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s',
          mixBlendMode: 'difference'
        }}
      />
      <div
        ref={cursorOutline}
        className="cursor-outline"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: cursorText ? '80px' : '40px',
          height: cursorText ? '80px' : '40px',
          border: '1px solid rgba(0, 212, 255, 0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s, width 0.2s, height 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10px',
          fontWeight: 600,
          color: '#00d4ff',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}
      >
        {cursorText}
      </div>
    </>
  );
};

export default Cursor;
