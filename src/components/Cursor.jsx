import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import './cursor.css';

// 🚀 Performance Constants
const TRAIL_COUNT = 15;   // Length of neon snake tail
const PARTICLE_COUNT = 40; // Max concurrent sparks (Object Pool limits GC lag)

const Cursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const textRef = useRef(null);
  
  // Object Arrays mapped to DOM nodes
  const trailRefs = useRef([]);
  const particleRefs = useRef([]);
  
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  // Core Physics caching
  const mousePos = useRef({ x: 0, y: 0 });
  const lastEmitPos = useRef({ x: 0, y: 0 }); // Tracks distance for particle emissions
  const isHovering = useRef(false);
  const isVisible = useRef(false);
  
  // Pool indices tracker
  const particleIndex = useRef(0);

  useEffect(() => {
    // Falls back to native entirely on Mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Start completely hidden securely
    gsap.set(cursorRef.current, { opacity: 0 });

    // Initialize the Snake Trail arrays natively
    const trailPositions = Array.from({ length: TRAIL_COUNT }, () => ({ x: 0, y: 0 }));
    
    // QuickSetters -> Unlocks real 144hz capabilities bypassing React's event loop
    const xSet = gsap.quickSetter(cursorRef.current, "x", "px");
    const ySet = gsap.quickSetter(cursorRef.current, "y", "px");
    
    // Massive array of individual trail setters for extremely fast interpolation
    const trailSetters = trailRefs.current.map((el) => ({
      x: gsap.quickSetter(el, "x", "px"),
      y: gsap.quickSetter(el, "y", "px")
    }));

    // Visually scale down each node naturally into a disappearing tail securely 
    trailRefs.current.forEach((el, i) => {
       gsap.set(el, { 
         scale: 1 - (i / TRAIL_COUNT), // Linearly shrinks to 0
         opacity: 1 - (i / TRAIL_COUNT)
       });
    });

    let rafId;

    // The Master Display Loop (144fps+)
    const render = () => {
      // 1. Instantly pin the Head (Dot) to Mouse position directly 
      // Dot doesn't lerp for perfect accuracy!
      xSet(mousePos.current.x);
      ySet(mousePos.current.y);

      // 2. Head of trail chases the exact mouse
      trailPositions[0].x += (mousePos.current.x - trailPositions[0].x) * 0.4;
      trailPositions[0].y += (mousePos.current.y - trailPositions[0].y) * 0.4;
      trailSetters[0].x(trailPositions[0].x);
      trailSetters[0].y(trailPositions[0].y);

      // 3. Each subsequent tail node chases the node directly in front of it! Perfect Snake Physics.
      for (let i = 1; i < TRAIL_COUNT; i++) {
        trailPositions[i].x += (trailPositions[i-1].x - trailPositions[i].x) * 0.4;
        trailPositions[i].y += (trailPositions[i-1].y - trailPositions[i].y) * 0.4;
        trailSetters[i].x(trailPositions[i].x);
        trailSetters[i].y(trailPositions[i].y);
      }
      
      // 💥 4. Continuous Particle Emission checking 
      const delta = Math.hypot(
        mousePos.current.x - lastEmitPos.current.x, 
        mousePos.current.y - lastEmitPos.current.y
      );
      
      // Emit a sparkling particle physically every 25px traveled over the screen
      if (delta > 25) {
         lastEmitPos.current.x = mousePos.current.x;
         lastEmitPos.current.y = mousePos.current.y;
         
         // Pull node out of the Object Pool
         const particle = particleRefs.current[particleIndex.current];
         particleIndex.current = (particleIndex.current + 1) % PARTICLE_COUNT;
         
         // Spray them physically opposite to the movement
         const angle = Math.random() * Math.PI * 2;
         const distance = Math.random() * 25 + 5; 
         const endX = mousePos.current.x + Math.cos(angle) * distance;
         const endY = mousePos.current.y + Math.sin(angle) * distance;
         
         gsap.fromTo(particle, 
           { x: mousePos.current.x, y: mousePos.current.y, scale: Math.random() * 1.5 + 0.5, opacity: 1 },
           { x: endX, y: endY, scale: 0, opacity: 0, duration: Math.random() * 0.5 + 0.3, ease: "power2.out", overwrite: true }
         );
      }
      
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    const onMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      
      if (!isVisible.current) {
         gsap.to(cursorRef.current, { opacity: 1, duration: 0.3 });
         // Automatically fades in trailing elements too
         trailRefs.current.forEach(el => gsap.to(el, { opacity: "+=0" })); 
         isVisible.current = true;
      }
    };

    // Glow Transitions & Target Interactions 
    const hoverSelector = 'a, button, [role="button"], input, textarea, select, .project-card, [data-cursor]';
    
    const onPointerOver = (e) => {
      const el = e.target.closest?.(hoverSelector);
      if (!el) return;
      
      isHovering.current = true;
      cursorRef.current.classList.add('is-hovering'); 
      
      // Pulse completely to Magenta / Neon Pink
      gsap.to(dotRef.current, { 
        backgroundColor: '#ff3366', 
        boxShadow: '0 0 15px 3px rgba(255, 51, 102, 0.8), 0 0 30px 8px rgba(255, 51, 102, 0.4)', 
        scale: 2.5, 
        duration: 0.3 
      });
      trailRefs.current.forEach(node => gsap.to(node, { backgroundColor: '#ff3366', duration: 0.3 }));

      // Holographic Neon Text updates
      if (el.closest('.project-card')) {
         textRef.current.innerText = 'DATA_SYNC';
      } else if (el.tagName.toLowerCase() === 'a') {
         textRef.current.innerText = 'UPLINK';
      } else if (el.tagName.toLowerCase() === 'button' || el.getAttribute('role') === 'button') {
         textRef.current.innerText = 'RUN_PROG';
      } else {
         textRef.current.innerText = 'ACTIVE';
      }
    };

    const onPointerOut = (e) => {
      const el = e.target.closest?.(hoverSelector);
      if (!el) return;
      
      isHovering.current = false;
      cursorRef.current.classList.remove('is-hovering');
      
      // Restoring Neon Cyan colors!
      gsap.to(dotRef.current, { 
        backgroundColor: '#00d4ff', 
        boxShadow: '0 0 10px 2px rgba(0, 212, 255, 0.8), 0 0 25px 8px rgba(0, 212, 255, 0.4)', 
        scale: 1, 
        duration: 0.3 
      });
      trailRefs.current.forEach(node => gsap.to(node, { backgroundColor: '#00d4ff', duration: 0.3 }));
    };

    const onMouseDown = () => {
      cursorRef.current.classList.add('is-clicking');
      
      // Explosive click particle burst!! Extracts 15 nodes exactly!
      for(let i=0; i < 15; i++) {
        const particle = particleRefs.current[particleIndex.current];
        particleIndex.current = (particleIndex.current + 1) % PARTICLE_COUNT;
        
        // Massive expanding angle 
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 80 + 20; 
        const endX = mousePos.current.x + Math.cos(angle) * distance;
        const endY = mousePos.current.y + Math.sin(angle) * distance;

        gsap.fromTo(particle, 
          { x: mousePos.current.x, y: mousePos.current.y, scale: Math.random() * 2 + 1, opacity: 1 },
          { x: endX, y: endY, scale: 0, opacity: 0, duration: Math.random() * 0.6 + 0.4, ease: "power3.out", overwrite: true }
        );
      }
    };

    const onMouseUp = () => {
      cursorRef.current.classList.remove('is-clicking');
    };
    
    // Ghost entirely off screen
    const onMouseLeaveDoc = () => {
       gsap.to(cursorRef.current, { opacity: 0, duration: 0.3 });
       isVisible.current = false;
    };

    // Register all native handling
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onPointerOver, true);
    document.addEventListener('mouseout', onPointerOut, true);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeaveDoc);
    
    // Kickstart securely matching hardware correctly avoiding jump artifacts
    const setInitPosition = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      trailPositions.forEach(p => { p.x = e.clientX; p.y = e.clientY; });
      window.removeEventListener('mousemove', setInitPosition);
    };
    window.addEventListener('mousemove', setInitPosition);

    return () => {
      // Clean everything securely
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onPointerOver, true);
      document.removeEventListener('mouseout', onPointerOut, true);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeaveDoc);
      window.removeEventListener('mousemove', setInitPosition);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile, location.pathname]); 

  // Hard skips loading any DOM on pure mobile displays saving memory perfectly!
  if (isMobile) return null;

  return (
    <>
      {/* 1. Dynamic Object Pool array handling continuous high performance emissions securely! */}
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
         <div 
           key={`spark-${i}`} 
           ref={(el) => (particleRefs.current[i] = el)} 
           className="neon-particle"
           style={{ opacity: 0, transform: 'translate(-50%, -50%)' }}
         ></div>
      ))}

      {/* 2. Glow Snake Trailer instances physically drawn securely behind main cursor! */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
         <div 
           key={`node-${i}`} 
           ref={(el) => (trailRefs.current[i] = el)} 
           className="neon-trail"
           style={{ transform: 'translate(-50%, -50%)' }}
         ></div>
      ))}

      {/* 3. The Core Pinpoint Hardware dot tracking natively! */}
      <div ref={cursorRef} className="custom-cursor">
        <div ref={dotRef} className="neon-dot"></div>
        {/* Holographic Glowing Typeface strictly appending properly aligned! */}
        <span ref={textRef} className="neon-text"></span>
      </div>
    </>
  );
};

export default Cursor;