import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { useSpring, animated, config } from '@react-spring/web';
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
  const [hoveredButton, setHoveredButton] = useState(null);

  // React Spring for button hover effects
  const primaryButtonSpring = useSpring({
    scale: hoveredButton === 'primary' ? 1.05 : 1,
    boxShadow: hoveredButton === 'primary' 
      ? '0 20px 40px rgba(0, 212, 255, 0.4)' 
      : '0 10px 20px rgba(0, 212, 255, 0.2)',
    config: config.wobbly
  });

  const secondaryButtonSpring = useSpring({
    scale: hoveredButton === 'secondary' ? 1.05 : 1,
    boxShadow: hoveredButton === 'secondary' 
      ? '0 20px 40px rgba(139, 92, 246, 0.4)' 
      : '0 10px 20px rgba(139, 92, 246, 0.2)',
    config: config.wobbly
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Manual character splitting for name animation
      const nameEl = nameRef.current;
      if (nameEl) {
        const originalText = nameEl.getAttribute('data-text') || nameEl.textContent;
        nameEl.setAttribute('data-text', originalText);
        nameEl.innerHTML = '';
        
        // Split into characters and wrap in spans
        originalText.split('').forEach((char) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          span.style.opacity = '1';
          span.className = 'char';
          nameEl.appendChild(span);
        });

        // Animate each character with fromTo for reliability
        tl.fromTo(nameEl.querySelectorAll('.char'), 
          {
            opacity: 0,
            y: 80,
            rotationX: -80,
            transformOrigin: '50% 50% -50px',
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: 'back.out(1.7)'
          }, 0.3);
      }

      // Manual word splitting for role animation
      const roleEl = roleRef.current;
      if (roleEl) {
        const originalText = roleEl.getAttribute('data-text') || roleEl.textContent;
        roleEl.setAttribute('data-text', originalText);
        roleEl.innerHTML = '';
        
        // Split into words and wrap in spans
        originalText.split(' ').forEach((word, index) => {
          const span = document.createElement('span');
          span.textContent = word;
          span.style.display = 'inline-block';
          span.style.marginRight = '0.3em';
          span.style.opacity = '1';
          span.style.background = 'linear-gradient(90deg, #00d4ff, #8b5cf6)';
          span.style.webkitBackgroundClip = 'text';
          span.style.webkitTextFillColor = 'transparent';
          span.style.backgroundClip = 'text';
          span.className = 'word';
          roleEl.appendChild(span);
        });

        // Animate each word with fromTo for reliability
        tl.fromTo(roleEl.querySelectorAll('.word'),
          {
            opacity: 0,
            y: 30,
            filter: 'blur(10px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            stagger: 0.1
          }, '-=0.4');
      }

      // Animate description
      if (descRef.current) {
        tl.from(descRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6
        }, '-=0.4');
      }

      // Animate buttons
      if (buttonsRef.current?.children) {
        tl.from(buttonsRef.current.children, {
          opacity: 0,
          y: 20,
          scale: 0.9,
          duration: 0.5,
          stagger: 0.1
        }, '-=0.3');
      }

      // Animate code card
      if (codeCardRef.current) {
        tl.from(codeCardRef.current, {
          opacity: 0,
          x: 100,
          rotateY: 30,
          duration: 1
        }, '-=0.8');

        // Floating animation for code card
        gsap.to(codeCardRef.current, {
          y: -15,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }

      // Animate stats
      if (statsRef.current?.children) {
        tl.from(statsRef.current.children, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.1
        }, '-=0.5');
      }

    }, containerRef);

    return () => {
      ctx.revert();
      // Restore original text content to prevent issues on re-render
      if (nameRef.current) {
        const orig = nameRef.current.getAttribute('data-text');
        if (orig) nameRef.current.textContent = orig;
      }
      if (roleRef.current) {
        const orig = roleRef.current.getAttribute('data-text');
        if (orig) roleRef.current.textContent = orig;
      }
    };
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

  const personStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Dhruv Sonagra',
    url: 'https://dhruvsonagra.me/',
    jobTitle: 'Full-Stack Developer',
    sameAs: [
      'https://github.com/dhruv2311-dot',
      'https://www.linkedin.com/in/dhruv-sonagra-995144321/',
      'https://x.com/dhruvvv_23_'
    ]
  };

  return (
    <>
      <Helmet>
        <title>Dhruv Sonagra | Full-Stack Developer</title>
        <meta name="description" content="Dhruv Sonagra is a Full-Stack Developer building modern, responsive web apps with React, Node.js, and creative UI/UX. Explore projects, skills, and contact." />
        <link rel="canonical" href="https://dhruvsonagra.me/" />
        <meta property="og:url" content="https://dhruvsonagra.me/" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(personStructuredData)}</script>
      </Helmet>

      <div 
        ref={containerRef}
        className="home"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: '80px',
          position: 'relative',
          overflowX: 'hidden'
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
          <div className="hero-grid">
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
                  perspective: '1000px',
                  opacity: 1,
                  visibility: 'visible'
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
                  marginBottom: '1.5rem',
                  opacity: 1,
                  visibility: 'visible'
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

              {/* CTA Buttons with React Spring */}
              <div ref={buttonsRef} className="hero-cta-buttons" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <animated.div style={primaryButtonSpring}>
                  <Link 
                    to="/projects" 
                    className="btn btn-primary magnetic"
                    onMouseEnter={() => setHoveredButton('primary')}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '1rem 2rem',
                      background: 'linear-gradient(90deg, #00d4ff, #0099cc)',
                      border: 'none',
                      borderRadius: '0.75rem',
                      color: '#0a0e1a',
                      fontSize: '1rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    View My Work
                  </Link>
                </animated.div>
                
                <animated.div style={secondaryButtonSpring}>
                  <Link 
                    to="/contact" 
                    className="btn btn-secondary magnetic"
                    onMouseEnter={() => setHoveredButton('secondary')}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '1rem 2rem',
                      background: 'rgba(139, 92, 246, 0.1)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      borderRadius: '0.75rem',
                      color: '#8b5cf6',
                      fontSize: '1rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Get In Touch
                  </Link>
                </animated.div>
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


      </div>
    </>
  );
};

export default Home;
