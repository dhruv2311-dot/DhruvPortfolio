import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Smooth scrolling using Lenis v1
 *
 * Critical requirements for Lenis to work:
 * 1. html/body must NOT have an intermediate element with overflow-x:hidden
 *    (that creates a secondary scroll container bypassing Lenis)
 * 2. No ancestor of page content should have overflow:hidden or a fixed height
 * 3. Lenis must be linked to GSAP ScrollTrigger via lenis.on('scroll', ...)
 */
const useSmoothScroll = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Sync Lenis scroll position → GSAP ScrollTrigger
    lenis.on('scroll', () => ScrollTrigger.update());

    // Drive Lenis from inside GSAP's tick so everything is frame-synced
    const rafFn = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(rafFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafFn);
      lenis.destroy();
    };
  }, []);
};

export default useSmoothScroll;
