import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Loader.css';

/**
 * Ultra-Premium Morphing Ambient Blob + Mask Reveal Preloader
 */
const Loader = ({ onLoadComplete }) => {
  const containerRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const progressRef = useRef(null);
  const progressBarRef = useRef(null);
  
  const [progressCounter, setProgressCounter] = useState(0);

  useEffect(() => {
    // 1. Wrap name characters for overflow-hidden smooth reveal
    const nameText = nameRef.current.innerText;
    nameRef.current.innerHTML = nameText
      .split('')
      .map(char => {
        if (char === ' ') {
          return `<span class="char-wrap" style="display:inline-block; overflow:hidden; vertical-align: top;"><span class="char" style="display:inline-block;">&nbsp;</span></span>`;
        }
        return `<span class="char-wrap" style="display:inline-block; overflow:hidden; vertical-align: top;"><span class="char" style="display:inline-block;">${char}</span></span>`;
      })
      .join('');

    const chars = nameRef.current.querySelectorAll('.char');

    // 2. Control entire loader timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Grand Exit: Loader slides up to beautifully unveil the website under it
        gsap.to(containerRef.current, {
          yPercent: -100,
          ease: "expo.inOut",
          duration: 1.2,
          onComplete: () => {
            onLoadComplete();
          }
        });
      }
    });

    // Reset properties for smooth from-to behavior
    gsap.set(chars, { yPercent: 100 });
    gsap.set(subtitleRef.current, { opacity: 0, y: 15 });
    gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(progressRef.current, { opacity: 0 });

    // Stagger slide-up reveal of the Name Characters (Mask Reveal)
    tl.to(chars, {
      yPercent: 0,
      stagger: 0.04,
      duration: 1.0,
      ease: "power4.out"
    })
    // Subtitle fade in sleekly
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6")
    // Fade in numeric counter
    .to(progressRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.4")
    // Sleek progress bar filling & GSAP tracking the value for React State
    .to({ value: 0 }, {
      value: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: function() {
        const val = Math.round(this.targets()[0].value);
        setProgressCounter(val);
        gsap.set(progressBarRef.current, { scaleX: val / 100 });
      }
    }, "-=0.2")
    // Short dramatic hold at 100%
    .to({}, { duration: 0.4 })
    // Fade all texts/bars out cleanly right before sliding
    .to([nameRef.current, subtitleRef.current, progressRef.current, progressBarRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.6,
      stagger: 0.05,
      ease: "power2.inOut"
    });

    return () => {
      tl.kill();
    };
  }, [onLoadComplete]);

  return (
    <div className="premium-loader" ref={containerRef}>
      {/* Elegantly placed ambient background glowing orbs */}
      <div className="ambient-blob ambient-blob-1"></div>
      <div className="ambient-blob ambient-blob-2"></div>

      <div className="loader-center">
        <h1 className="loader-title" ref={nameRef}>DHRUV SONAGRA</h1>
        <p className="loader-sub" ref={subtitleRef}>Crafting Digital Experiences</p>
      </div>

      <div className="loader-footer">
        <div className="progress-container">
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" ref={progressBarRef}></div>
          </div>
          <div className="progress-text" ref={progressRef}>
            {progressCounter.toString().padStart(3, '0')}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;

