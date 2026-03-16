import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

/**
 * Advanced Custom Cursor with Trail Effect
 * Context-aware cursor that changes based on hoverable elements
 */
const Cursor = () => {
  const cursorDot = useRef(null);
  const cursorOutline = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const isTouch = useRef(false);
  const isHoveringRef = useRef(false);
  const isVisibleRef = useRef(false);
  const lowPerformanceMode = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const lowCpu = (navigator.hardwareConcurrency || 8) <= 6;
    const mobileLikeScreen = window.innerWidth < 1024;
    return lowCpu || mobileLikeScreen;
  }, []);

  useEffect(() => {
    // Check for touch device
    isTouch.current = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch.current) return;

    const dot = cursorDot.current;
    const outline = cursorOutline.current;
    if (!dot || !outline) return;

    let rafId;
    let magneticRafId = null;
    let trailElements = [];
    let magneticElements = [];

    const updateMagneticElements = () => {
      magneticElements = Array.from(document.querySelectorAll('.magnetic'));
    };

    // Create trail elements only for higher-performance devices.
    if (!lowPerformanceMode) {
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
          will-change: transform;
        `;
        document.body.appendChild(trail);
        trailElements.push({ el: trail, x: 0, y: 0 });
      }
    }

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' });
    const outlineX = gsap.quickTo(outline, 'x', { duration: 0.14, ease: 'power2.out' });
    const outlineY = gsap.quickTo(outline, 'y', { duration: 0.14, ease: 'power2.out' });
    const trailSetters = trailElements.map((trail) => ({
      x: gsap.quickSetter(trail.el, 'x'),
      y: gsap.quickSetter(trail.el, 'y')
    }));

    updateMagneticElements();

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      dotX(e.clientX);
      dotY(e.clientY);
      outlineX(e.clientX);
      outlineY(e.clientY);

      if (!lowPerformanceMode && !magneticRafId) {
        magneticRafId = requestAnimationFrame(() => {
          magneticElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distanceX = mousePos.current.x - centerX;
            const distanceY = mousePos.current.y - centerY;
            const distance = Math.hypot(distanceX, distanceY);
            const maxDistance = 100;

            if (distance < maxDistance) {
              const strength = (maxDistance - distance) / maxDistance;
              gsap.to(el, {
                x: distanceX * strength * 0.3,
                y: distanceY * strength * 0.3,
                duration: 0.2,
                ease: 'power2.out',
                overwrite: 'auto'
              });
            } else {
              gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.2,
                ease: 'power2.out',
                overwrite: 'auto'
              });
            }
          });
          magneticRafId = null;
        });
      }
    };

    const onMouseEnter = () => {
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
    };

    const onMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const onWindowMouseLeave = () => {
      onMouseLeave();
      resetMagneticElements();
    };

    // Trail animation loop using simple interpolation (lighter than creating GSAP tweens per frame)
    const animateTrail = () => {
      if (lowPerformanceMode || trailElements.length === 0) {
        rafId = requestAnimationFrame(animateTrail);
        return;
      }

      let targetX = mousePos.current.x;
      let targetY = mousePos.current.y;

      trailElements.forEach((trail, index) => {
        const lerp = Math.max(0.08, 0.22 - index * 0.03);
        trail.x += (targetX - trail.x) * lerp;
        trail.y += (targetY - trail.y) * lerp;

        trailSetters[index].x(trail.x);
        trailSetters[index].y(trail.y);

        targetX = trail.x;
        targetY = trail.y;
      });
      rafId = requestAnimationFrame(animateTrail);
    };

    // Use delegated hover listeners to avoid attaching handlers to every element repeatedly.
    const hoverSelector = 'a, button, [role="button"], input, textarea, select, .hoverable, [data-cursor]';

    const onPointerOver = (e) => {
      const el = e.target.closest?.(hoverSelector);
      if (!el) return;

      isHoveringRef.current = true;
      setCursorText(el.getAttribute('data-cursor') || '');

      gsap.to(outline, {
        scale: 1.5,
        borderColor: '#8b5cf6',
        duration: 0.2,
        overwrite: 'auto'
      });
      gsap.to(dot, {
        scale: 0.5,
        duration: 0.2,
        overwrite: 'auto'
      });
    };

    const onPointerOut = (e) => {
      const el = e.target.closest?.(hoverSelector);
      if (!el) return;
      if (e.relatedTarget && el.contains(e.relatedTarget)) return;

      isHoveringRef.current = false;
      setCursorText('');

      gsap.to(outline, {
        scale: 1,
        borderColor: 'rgba(0, 212, 255, 0.5)',
        duration: 0.2,
        overwrite: 'auto'
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.2,
        overwrite: 'auto'
      });
    };

    // Click effects
    const onMouseDown = () => {
      gsap.to(dot, { scale: 0.8, duration: 0.1 });
      gsap.to(outline, { scale: 0.9, duration: 0.1 });
    };

    const onMouseUp = () => {
      const hovering = isHoveringRef.current;
      gsap.to(dot, { scale: hovering ? 0.5 : 1, duration: 0.1 });
      gsap.to(outline, { scale: hovering ? 1.5 : 1, duration: 0.1 });
    };

    const resetMagneticElements = () => {
      magneticElements.forEach((el) => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.2,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mouseleave', onWindowMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onPointerOver, true);
    document.addEventListener('mouseout', onPointerOut, true);

    // Keep magnetic target list in sync with dynamic DOM updates.
    const observer = new MutationObserver(updateMagneticElements);
    if (!lowPerformanceMode) {
      observer.observe(document.body, { childList: true, subtree: true });
    }

    animateTrail();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseleave', onWindowMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onPointerOver, true);
      document.removeEventListener('mouseout', onPointerOut, true);
      cancelAnimationFrame(rafId);
      if (magneticRafId) cancelAnimationFrame(magneticRafId);
      if (!lowPerformanceMode) observer.disconnect();
      
      // Clean up trail elements
      trailElements.forEach(trail => trail.el.remove());
    };
  }, [lowPerformanceMode]);

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
