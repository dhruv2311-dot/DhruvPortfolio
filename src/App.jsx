import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Snowfall from 'react-snowfall';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import PageTransition from './components/PageTransition';
import useSmoothScroll from './hooks/useSmoothScroll';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Certificates from './pages/Certificates';
import Education from './pages/Education';
import Contact from './pages/Contact';

// Styles
import './index.css';

/**
 * Scroll to top on route change
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function SnowfallLayer({ snowflakeCount }) {
  if (snowflakeCount <= 0) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden',
        width: '100vw',
        height: '100vh'
      }}
    >
      <Snowfall
        color="#00d4ff"
        snowflakeCount={snowflakeCount}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
        radius={[0.4, 2]}
        speed={[0.8, 2.2]}
        wind={[-0.3, 0.5]}
      />
    </div>
  );
}

/**
 * Main App Component
 * Orchestrates all global features and routing
 */
function App() {
  const [isLoading, setIsLoading] = useState(true);
  useSmoothScroll();

  const shouldReduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const snowflakeCount = useMemo(() => {
    if (shouldReduceMotion) return 0;
    if (typeof window === 'undefined') return 70;

    const isMobile = window.innerWidth < 768;
    const lowCpu = (navigator.hardwareConcurrency || 8) <= 6;

    if (isMobile || lowCpu) return 20;
    return 70;
  }, [shouldReduceMotion]);

  // Initial loading animation
  useEffect(() => {
    // Simulate loading time for assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Refresh ScrollTrigger after loading
  useEffect(() => {
    if (!isLoading) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: '#0a0e1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        <div style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              background: 'linear-gradient(90deg, #00d4ff, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.5rem'
            }}
          >
            Dhruv Sonagra
          </motion.div>
          <div style={{
            width: '200px',
            height: '3px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #00d4ff, #8b5cf6)'
              }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        
        {/* Custom Cursor */}
        <Cursor />
        
        {/* Scroll Progress */}
        <ScrollProgress />
        
        <div className="app" style={{ minHeight: '100vh', position: 'relative' }}>
          {/* Snowfall Effect */}
          <SnowfallLayer snowflakeCount={snowflakeCount} />
          
          {/* Navigation */}
          <Navigation />
          
          {/* Main Content with Page Transitions */}
          <main style={{ position: 'relative', zIndex: 10, minHeight: '100vh' }}>
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/certificates" element={<Certificates />} />
                <Route path="/education" element={<Education />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </PageTransition>
          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
