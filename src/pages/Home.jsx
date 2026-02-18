import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import useMagneticButton from '../hooks/useMagneticButton';
import './Home.css';

/**
 * Home Page Component
 * Premium hero section with GSAP text animations
 */
const Home = () => {
  const containerRef = useRef(null);
  const codeCardRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const greetingRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);

  const projectsButtonRef = useMagneticButton(0.3);
  const aboutButtonRef = useMagneticButton(0.3);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animate greeting
      tl.fromTo(greetingRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      );

      // Animate name characters
      const nameEl = nameRef.current;
      if (nameEl) {
        const text = nameEl.textContent.trim();
        nameEl.innerHTML = '';
        const chars = text.split('').map((char) => {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          if (char === ' ') span.style.width = '0.3em';
          nameEl.appendChild(span);
          return span;
        });

        tl.to(chars, {
          y: 0,
          opacity: 1,
          rotationX: 0,
          stagger: 0.04,
          duration: 0.6,
          ease: 'back.out(1.7)',
        }, '-=0.3');
      }

      // Animate role characters
      const roleEl = roleRef.current;
      if (roleEl) {
        const text = roleEl.textContent.trim();
        roleEl.innerHTML = '';
        const chars = text.split('').map((char) => {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          if (char === ' ') span.style.width = '0.3em';
          roleEl.appendChild(span);
          return span;
        });

        tl.to(chars, {
          y: 0,
          opacity: 1,
          rotationX: 0,
          stagger: 0.03,
          duration: 0.5,
          ease: 'back.out(1.5)',
        }, '-=0.5');
      }

      // Animate description
      tl.fromTo(descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.3'
      );

      // Animate buttons
      tl.fromTo('.hero-buttons .btn-outline',
        { y: 30, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.4'
      );

      // Animate code card
      tl.fromTo(codeCardRef.current,
        { x: 100, opacity: 0, rotationY: 45 },
        { x: 0, opacity: 1, rotationY: 0, duration: 1.2, ease: 'power3.out' },
        '-=0.8'
      );

      // Floating code card
      gsap.to(codeCardRef.current, {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      // Scroll indicator bounce
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      // Glow pulse
      gsap.to('.glow-effect', {
        scale: 1.2,
        opacity: 0.6,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home | Dhruv Sonagra - Full-Stack Developer</title>
        <meta name="description" content="Hi, I'm Dhruv Sonagra. A Full-Stack Developer building scalable and user-friendly applications with modern technologies." />
      </Helmet>

      <main className="home-container" ref={containerRef}>
        <div className="home-content-wrapper">
          {/* Left Side - Text Content */}
          <div className="hero-text-section">
            <h2 className="hero-greeting" ref={greetingRef}>Hi, I'm</h2>
            <h1 ref={nameRef} className="hero-name">
              Dhruv Sonagra
            </h1>
            <h2 ref={roleRef} className="hero-role">
              Full-Stack Developer
            </h2>

            <p className="hero-description" ref={descRef}>
              Building scalable and user-friendly applications with modern technologies
            </p>

            <div className="hero-buttons" ref={buttonsRef}>
              <Link to="/projects">
                <button ref={projectsButtonRef} className="btn btn-outline btn-magnetic">
                  View Projects
                </button>
              </Link>
              <Link to="/about">
                <button ref={aboutButtonRef} className="btn btn-outline btn-magnetic">
                  About Me
                </button>
              </Link>
            </div>
          </div>

          {/* Right Side - Code Card */}
          <div className="hero-code-section">
            <div ref={codeCardRef} className="code-card glass-panel">
              <div className="code-header">
                <div className="dot red"></div>
                <div className="dot yellow"></div>
                <div className="dot green"></div>
              </div>
              <div className="code-content">
                <pre>
                  <code>
                    <span className="keyword">const</span> <span className="variable">developer</span> <span className="operator">=</span> {'{'}
                    {'\n'}  <span className="property">skills</span>: [<span className="string">'React'</span>, <span className="string">'Node'</span>, <span className="string">'UI/UX'</span>],
                    {'\n'}  <span className="property">passion</span>: <span className="string">'Creating amazing web experiences'</span>,
                    {'\n'}  <span className="property">available</span>: <span className="boolean">true</span>
                    {'\n'}{'}'}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div ref={scrollIndicatorRef} className="scroll-indicator">
          <div className="scroll-indicator-line"></div>
          <p>Scroll Down</p>
        </div>

        {/* Background Elements */}
        <div className="glow-effect top-left"></div>
        <div className="glow-effect bottom-right"></div>
      </main>
    </>
  );
};

export default Home;
