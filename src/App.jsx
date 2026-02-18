import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Snowfall from 'react-snowfall';

// Hooks
import useSmoothScroll from './hooks/useSmoothScroll';

// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Background3D from './components/Background3D';
import Cursor from './components/Cursor'; // Import Cursor

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
 * Animated Routes Component
 * Handles page transitions with Framer Motion
 */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/education" element={<Education />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

function RouteScrollToTop() {
  const location = useLocation();

  // Keep this component lightweight: route change => reset scroll.
  // This avoids getting "stuck" mid-page when navigating away from long sections.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return null;
}

/**
 * Main App Component
 * Orchestrates all global features: loading, smooth scroll, cursor, 3D background, snowfall
 */
function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize smooth scrolling (must be called as a hook)
  useSmoothScroll();

  // Handle loading complete
  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <HelmetProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <RouteScrollToTop />
        <div className="app">
          {/* Custom Cursor Component - Always Rendered but handles its own visibility */}
          <Cursor />

          {/* Loading Screen */}
          {isLoading && <Loader onLoadComplete={handleLoadComplete} />}

          {/* Main Content */}
          {!isLoading && (
            <>
              {/* Global Background Effects */}
              <Background3D />
              <Snowfall
                color="#667eea"
                snowflakeCount={50}
                style={{
                  position: 'fixed',
                  width: '100vw',
                  height: '100vh',
                  zIndex: 0,
                }}
              />

              {/* Navigation */}
              <Navigation />

              {/* Page Content */}
              <AnimatedRoutes />

              {/* Footer */}
              <Footer />
            </>
          )}
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
