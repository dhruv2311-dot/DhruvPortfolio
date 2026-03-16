import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import './Navigation.css';

/**
 * Professional Navigation with Liquid Morphing Effects
 * Smart scroll behavior, magnetic links, and animated indicators
 */
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeIndicator, setActiveIndicator] = useState({ left: 0, width: 0 });
  const location = useLocation();
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const linksRef = useRef([]);
  const isScrolledRef = useRef(false);

  const navLinks = [
    { path: '/', label: 'Home', icon: '01' },
    { path: '/about', label: 'About', icon: '02' },
    { path: '/skills', label: 'Skills', icon: '03' },
    { path: '/projects', label: 'Projects', icon: '04' },
    { path: '/certificates', label: 'Certificates', icon: '05' },
    { path: '/education', label: 'Education', icon: '06' },
    { path: '/contact', label: 'Contact', icon: '07' },
  ];

  // Handle scroll effect
  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const nextScrolled = window.scrollY > 50;
        if (nextScrolled !== isScrolledRef.current) {
          isScrolledRef.current = nextScrolled;
          setIsScrolled(nextScrolled);
        }
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Update active indicator position
  useEffect(() => {
    const updateIndicator = () => {
      const activeIndex = navLinks.findIndex(link => link.path === location.pathname);
      if (activeIndex !== -1 && linksRef.current[activeIndex] && navRef.current) {
        const link = linksRef.current[activeIndex];
        const linkRect = link.getBoundingClientRect();
        const navRect = navRef.current.getBoundingClientRect();
        
        // Calculate position relative to the nav container
        // Since nav is fixed, we need offsetLeft relative to parent
        const parentRect = link.offsetParent?.getBoundingClientRect();
        let left = link.offsetLeft + link.offsetWidth / 2;
        
        // Fallback to getBoundingClientRect calculation
        if (!parentRect) {
          left = linkRect.left - navRect.left + linkRect.width / 2;
        }
        
        setActiveIndicator({
          left: left,
          width: link.offsetWidth || linkRect.width
        });
      }
    };

    // Multiple delays to ensure DOM is fully ready after route change
    const timer1 = setTimeout(updateIndicator, 50);
    const timer2 = setTimeout(updateIndicator, 150);
    const timer3 = setTimeout(updateIndicator, 300);
    
    window.addEventListener('resize', updateIndicator);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [location.pathname, navLinks]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Magnetic effect for nav links
  const handleMouseMove = (e, index) => {
    const link = linksRef.current[index];
    if (!link) return;

    const rect = link.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(link, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = (index) => {
    const link = linksRef.current[index];
    if (!link) return;

    gsap.to(link, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        className={`navigation ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: isScrolled ? '0.75rem 0' : '1.25rem 0',
          background: isScrolled 
            ? 'rgba(10, 14, 26, 0.85)' 
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
          transition: 'all 0.3s ease'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to="/" className="nav-logo" style={{ position: 'relative', zIndex: 10 }}>
            <motion.div
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                background: 'linear-gradient(90deg, #00d4ff, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <span style={{ 
                width: '10px', 
                height: '10px', 
                background: '#00d4ff', 
                borderRadius: '50%',
                display: 'inline-block'
              }} />
              DS
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div 
            className="desktop-nav"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              position: 'relative'
            }}
          >
            {/* Animated Background Indicator */}
            <motion.div
              ref={indicatorRef}
              style={{
                position: 'absolute',
                height: '36px',
                background: 'rgba(0, 212, 255, 0.1)',
                borderRadius: '9999px',
                border: '1px solid rgba(0, 212, 255, 0.2)',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none'
              }}
              animate={{
                left: activeIndicator.left,
                width: activeIndicator.width,
                opacity: activeIndicator.width > 0 ? 1 : 0
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />

            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                ref={el => linksRef.current[index] = el}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: location.pathname === link.path ? '#00d4ff' : '#94a3b8',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  borderRadius: '9999px',
                  transition: 'color 0.3s ease'
                }}
              >
                <span 
                  className="nav-link-number"
                  style={{
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-mono)',
                    opacity: 0.5,
                    color: location.pathname === link.path ? '#00d4ff' : 'inherit'
                  }}
                >
                  {link.icon}
                </span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <motion.a
            href="/contact"
            className="btn btn-primary magnetic"
            style={{ 
              fontSize: '0.875rem',
              padding: '0.625rem 1.5rem',
              display: 'none'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Hire Me
          </motion.a>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              zIndex: 1001
            }}
          >
            <motion.div
              style={{ width: '24px', height: '20px', position: 'relative' }}
              animate={isMobileMenuOpen ? 'open' : 'closed'}
            >
              <motion.span
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '2px',
                  background: '#fff',
                  borderRadius: '2px'
                }}
                variants={{
                  closed: { top: '0%', rotate: 0 },
                  open: { top: '50%', rotate: 45, translateY: '-50%' }
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '2px',
                  background: '#fff',
                  borderRadius: '2px',
                  top: '50%',
                  translateY: '-50%'
                }}
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '2px',
                  background: '#fff',
                  borderRadius: '2px'
                }}
                variants={{
                  closed: { bottom: '0%', rotate: 0 },
                  open: { bottom: '50%', rotate: -45, translateY: '50%' }
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(10, 14, 26, 0.98)',
              backdropFilter: 'blur(20px)',
              zIndex: 999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <motion.nav
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                textAlign: 'center'
              }}
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    style={{
                      fontSize: '2rem',
                      fontWeight: 600,
                      color: location.pathname === link.path ? '#00d4ff' : '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '1rem'
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span style={{ 
                      fontSize: '0.875rem', 
                      fontFamily: 'var(--font-mono)',
                      opacity: 0.5 
                    }}>
                      {link.icon}
                    </span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
