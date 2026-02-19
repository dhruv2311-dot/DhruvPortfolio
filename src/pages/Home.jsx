import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { FaGithub, FaLinkedin, FaTwitter, FaArrowDown, FaAws } from 'react-icons/fa';
import { 
  SiReact, SiNodedotjs, SiTypescript, SiMongodb, SiPostgresql, 
  SiNextdotjs, SiTailwindcss, SiFigma, SiGit, 
  SiDocker 
} from 'react-icons/si';
import './Home.css';

/**
 * Home Page - Cinematic Hero Section
 * Features: Particle text animation, floating code card, scroll indicators
 */
const Home = () => {
  const containerRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const codeCardRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animate name with character split
      const nameEl = nameRef.current;
      if (nameEl) {
        const text = nameEl.textContent;
        nameEl.innerHTML = '';
        text.split('').forEach((char, i) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          span.style.transform = 'translateY(100px) rotateX(-90deg)';
          nameEl.appendChild(span);
        });

        tl.to(nameEl.children, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: 'back.out(1.7)'
        }, 0.3);
      }

      // Animate role
      tl.fromTo(roleRef.current,
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 },
        '-=0.4'
      );

      // Animate description
      tl.fromTo(descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      );

      // Animate buttons
      tl.fromTo(buttonsRef.current?.children || [],
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 },
        '-=0.3'
      );

      // Animate code card
      tl.fromTo(codeCardRef.current,
        { opacity: 0, x: 100, rotateY: 30 },
        { opacity: 1, x: 0, rotateY: 0, duration: 1 },
        '-=0.8'
      );

      // Animate stats
      tl.fromTo(statsRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        '-=0.5'
      );

      // Floating animation for code card
      gsap.to(codeCardRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const techStack = [
    { name: 'React', icon: <SiReact />, color: '#61DAFB' },
    { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933' },
    { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
    { name: 'Next.js', icon: <SiNextdotjs />, color: '#ffffff' },
    { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
    { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#4169E1' },    
    { name: 'AWS', icon: <FaAws />, color: '#FF9900' },
    { name: 'Docker', icon: <SiDocker />, color: '#2496ED' },
    { name: 'Tailwind', icon: <SiTailwindcss />, color: '#06B6D4' },
    { name: 'Figma', icon: <SiFigma />, color: '#F24E1E' },
    { name: 'Git', icon: <SiGit />, color: '#F05032' }
  ];

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/dhruv2311-dot', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/dhruv-sonagra-995144321/', label: 'LinkedIn' },
    { icon: <FaTwitter />, url: 'https://x.com/dhruvvv_23_', label: 'Twitter' }
  ];

  return (
    <>
      <Helmet>
        <title>Dhruv Sonagra | Full-Stack Developer</title>
        <meta name="description" content="Full-Stack Developer specializing in React, Node.js, and modern web technologies. Building scalable and user-friendly applications." />
      </Helmet>

      <main 
        ref={containerRef}
        className="home"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: '80px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }} />

        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center',
            minHeight: 'calc(100vh - 200px)'
          }}>
            {/* Left Content */}
            <div style={{ maxWidth: '600px' }}>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  background: 'rgba(0, 212, 255, 0.1)',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                  borderRadius: '9999px',
                  marginBottom: '1.5rem'
                }}
              >
                <span style={{
                  width: '8px',
                  height: '8px',
                  background: '#10b981',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite'
                }} />
                <span style={{ fontSize: '0.875rem', color: '#00d4ff' }}>
                  Available for work
                </span>
              </motion.div>

              {/* Name */}
              <h1
                ref={nameRef}
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  marginBottom: '1rem',
                  perspective: '1000px'
                }}
              >
                Dhruv Sonagra
              </h1>

              {/* Role */}
              <h2
                ref={roleRef}
                style={{
                  fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                  fontWeight: 600,
                  background: 'linear-gradient(90deg, #00d4ff, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '1.5rem'
                }}
              >
                Full-Stack Developer
              </h2>

              {/* Description */}
              <p
                ref={descRef}
                style={{
                  fontSize: '1.125rem',
                  color: '#94a3b8',
                  marginBottom: '2rem',
                  lineHeight: 1.7
                }}
              >
                I craft scalable web applications with modern technologies. 
                Passionate about creating exceptional user experiences and 
                solving complex problems through elegant code.
              </p>

              {/* CTA Buttons */}
              <div ref={buttonsRef} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <Link to="/projects" className="btn btn-primary magnetic">
                  View My Work
                </Link>
                <Link to="/contact" className="btn btn-secondary magnetic">
                  Get In Touch
                </Link>
              </div>

              {/* Social Links */}
              <div style={{ display: 'flex', gap: '1rem' }}>
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic"
                    style={{
                      width: '44px',
                      height: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#94a3b8',
                      transition: 'all 0.3s ease'
                    }}
                    whileHover={{ 
                      scale: 1.1, 
                      borderColor: '#00d4ff',
                      color: '#00d4ff'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Right Content - Code Card */}
            <div style={{ position: 'relative', perspective: '1000px' }}>
              <div
                ref={codeCardRef}
                style={{
                  background: 'linear-gradient(145deg, rgba(20, 29, 51, 0.9) 0%, rgba(10, 14, 26, 0.95) 100%)',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 212, 255, 0.1)',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Window Controls */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <span style={{ width: '12px', height: '12px', background: '#f43f5e', borderRadius: '50%' }} />
                  <span style={{ width: '12px', height: '12px', background: '#f59e0b', borderRadius: '50%' }} />
                  <span style={{ width: '12px', height: '12px', background: '#10b981', borderRadius: '50%' }} />
                </div>

                {/* Code Content */}
                <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.875rem', lineHeight: 1.8 }}>
                  <code>
                    <span style={{ color: '#c084fc' }}>const</span>{' '}
                    <span style={{ color: '#60a5fa' }}>developer</span>{' '}
                    <span style={{ color: '#94a3b8' }}>=</span>{' '}
                    <span style={{ color: '#fbbf24' }}>{'{'}</span>{'\n'}
                    {'  '}<span style={{ color: '#34d399' }}>name</span>
                    <span style={{ color: '#94a3b8' }}>:</span>{' '}
                    <span style={{ color: '#a5f3fc' }}>&quot;Dhruv Sonagra&quot;</span>
                    <span style={{ color: '#94a3b8' }}>,</span>{'\n'}
                    {'  '}<span style={{ color: '#34d399' }}>role</span>
                    <span style={{ color: '#94a3b8' }}>:</span>{' '}
                    <span style={{ color: '#a5f3fc' }}>&quot;Full-Stack Dev&quot;</span>
                    <span style={{ color: '#94a3b8' }}>,</span>{'\n'}
                    {'  '}<span style={{ color: '#34d399' }}>skills</span>
                    <span style={{ color: '#94a3b8' }}>:</span>{' '}
                    <span style={{ color: '#fbbf24' }}>[</span>
                    <span style={{ color: '#a5f3fc' }}>&quot;React&quot;</span>
                    <span style={{ color: '#94a3b8' }}>,</span>{' '}
                    <span style={{ color: '#a5f3fc' }}>&quot;Node&quot;</span>
                    <span style={{ color: '#94a3b8' }}>,</span>{' '}
                    <span style={{ color: '#a5f3fc' }}>&quot;TypeScript&quot;</span>
                    <span style={{ color: '#fbbf24' }}>]</span>
                    <span style={{ color: '#94a3b8' }}>,</span>{'\n'}
                    {'  '}<span style={{ color: '#34d399' }}>passion</span>
                    <span style={{ color: '#94a3b8' }}>:</span>{' '}
                    <span style={{ color: '#a5f3fc' }}>&quot;Building amazing products&quot;</span>
                    <span style={{ color: '#94a3b8' }}>,</span>{'\n'}
                    {'  '}<span style={{ color: '#34d399' }}>available</span>
                    <span style={{ color: '#94a3b8' }}>:</span>{' '}
                    <span style={{ color: '#f472b6' }}>true</span>{'\n'}
                    <span style={{ color: '#fbbf24' }}>{'}'}</span>
                  </code>
                </pre>
              </div>

              {/* Floating Elements */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  padding: '0.75rem 1rem',
                  background: 'rgba(139, 92, 246, 0.2)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '0.75rem',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)'
                }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                React.js
              </motion.div>
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '-30px',
                  padding: '0.75rem 1rem',
                  background: 'rgba(0, 212, 255, 0.2)',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  borderRadius: '0.75rem',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)'
                }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                Node.js
              </motion.div>
            </div>
          </div>

          {/* Tech Stack Marquee */}
          <div className="tech-marquee-container" ref={statsRef}>
            <div className="tech-marquee-track">
              {/* Double the items for seamless loop */}
              {[...techStack, ...techStack].map((tech, index) => (
                <div 
                  key={`${tech.name}-${index}`} 
                  className="tech-item"
                  style={{ '--hover-color': tech.color }}
                >
                  <div 
                    className="tech-icon" 
                    style={{ color: tech.color }}
                  >
                    {tech.icon}
                  </div>
                  <span className="tech-label">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#64748b'
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FaArrowDown size={16} />
          </motion.div>
        </motion.div>
      </main>
    </>
  );
};

export default Home;
