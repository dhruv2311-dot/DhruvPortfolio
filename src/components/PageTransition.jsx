import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const STRIPS       = 7;      // number of horizontal bars
const IN_DUR       = 0.35;   // seconds — each strip slides IN
const OUT_DUR      = 0.32;   // seconds — each strip slides OUT
const STAGGER_S    = 0.045;  // seconds between consecutive strip starts
const HOLD_MS      = 50;     // ms to hold fully covered before revealing

// Total time (ms) for all strips to finish sliding in / out
const COVER_MS  = (IN_DUR  + (STRIPS - 1) * STAGGER_S) * 1000 + 20;
const REVEAL_MS = (OUT_DUR + (STRIPS - 1) * STAGGER_S) * 1000 + 20;

// Cinematic ease
const EASE = [0.76, 0, 0.24, 1];

// ─── ROUTE META ───────────────────────────────────────────────────────────────
const ROUTE_LABELS = {
  '/':            'Home',
  '/about':       'About',
  '/skills':      'Skills',
  '/projects':    'Projects',
  '/certificates':'Certificates',
  '/education':   'Education',
  '/contact':     'Contact',
};

const ROUTE_ACCENTS = {
  '/':            '#00d4ff',
  '/about':       '#8b5cf6',
  '/skills':      '#06b6d4',
  '/projects':    '#00d4ff',
  '/certificates':'#f59e0b',
  '/education':   '#8b5cf6',
  '/contact':     '#10b981',
};

const STRIP_COLORS = [
  '#0a0e1a',
  '#0d1224',
  '#0a0e1a',
  '#0f1428',
  '#0a0e1a',
  '#0d1224',
  '#0a0e1a',
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const PageTransition = ({ children }) => {
  const location = useLocation();

  const [shown,      setShown]      = useState(location);
  const [phase,      setPhase]      = useState('idle');
  const [targetPath, setTargetPath] = useState(location.pathname);
  const timers = useRef([]);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const after = (fn, ms) => { const id = setTimeout(fn, ms); timers.current.push(id); };

  useEffect(() => {
    if (location.pathname === shown.pathname) return;

    clearTimers();
    setTargetPath(location.pathname);
    setPhase('covering');

    after(() => {
      setShown({ ...location });
      setPhase('covered');

      after(() => {
        setPhase('revealing');

        after(() => {
          setPhase('idle');
        }, REVEAL_MS);

      }, HOLD_MS);
    }, COVER_MS);

    return clearTimers;
  }, [location.pathname]);

  const accent = ROUTE_ACCENTS[targetPath] ?? '#00d4ff';
  const label  = ROUTE_LABELS[targetPath]  ?? '';
  const isActive = phase !== 'idle';

  return (
    <>
      {/* ── STAIRCASE OVERLAY ─────────────────────────────────────── */}
      {isActive && (
        <div
          style={{
            position:      'fixed',
            inset:         0,
            zIndex:        9500,
            pointerEvents: 'all',
            overflow:      'hidden',
          }}
        >
          {Array.from({ length: STRIPS }, (_, i) => {
            const coverDelay  = i * STAGGER_S;
            const revealDelay = (STRIPS - 1 - i) * STAGGER_S;

            return (
              <motion.div
                key={`strip-${i}`}
                initial={{ x: '-101%' }}
                animate={{
                  x: (phase === 'covering' || phase === 'covered')
                    ? '0%'
                    : '101%',
                }}
                transition={{
                  duration: phase === 'revealing' ? OUT_DUR : IN_DUR,
                  ease:     EASE,
                  delay:    phase === 'covering'  ? coverDelay
                          : phase === 'revealing' ? revealDelay
                          : 0,
                }}
                style={{
                  position:   'absolute',
                  left:       0,
                  top:        `${(i / STRIPS) * 100}%`,
                  width:      '100%',
                  height:     `${(1 / STRIPS) * 100}%`,
                  background: STRIP_COLORS[i] ?? '#0a0e1a',
                  borderBottom: `1px solid ${accent}18`,
                  transformOrigin: 'left center',
                }}
              />
            );
          })}

          {/* ── Route label — appears when fully covered ── */}
          <AnimatePresence>
            {phase === 'covered' && (
              <motion.div
                key="stair-label"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                style={{
                  position:       'absolute',
                  inset:          0,
                  display:        'flex',
                  flexDirection:  'column',
                  alignItems:     'center',
                  justifyContent: 'center',
                  gap:            '0.65rem',
                  pointerEvents:  'none',
                  zIndex:         1,
                }}
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{
                    width:           '40px',
                    height:          '2px',
                    background:      accent,
                    transformOrigin: 'left',
                    boxShadow:       `0 0 12px ${accent}`,
                  }}
                />

                <span style={{
                  fontSize:      'clamp(1.8rem, 5vw, 3rem)',
                  fontWeight:    800,
                  color:         '#fff',
                  letterSpacing: '0.05em',
                  textShadow:    `0 0 40px ${accent}66`,
                  lineHeight:    1.1,
                }}>
                  {label}
                </span>

                <span style={{
                  fontSize:      '0.62rem',
                  color:         'rgba(255,255,255,0.25)',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  fontFamily:    'monospace',
                }}>
                  — loading —
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ── PAGE CONTENT ─────────────────────────────────────────── */}
      <div
        style={{
          width:         '100%',
          minHeight:     'auto',
          opacity:        isActive ? 0 : 1,
          pointerEvents:  isActive ? 'none' : 'auto',
          transition:     isActive ? 'none' : 'opacity 0.3s ease',
        }}
      >
        {children}
      </div>
    </>
  );
};

export default PageTransition;
