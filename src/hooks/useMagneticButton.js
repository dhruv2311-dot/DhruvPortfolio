import { useEffect, useRef } from 'react';
import { magneticButton } from '../utils/animations';

/**
 * Custom hook for magnetic button effect
 * Makes buttons follow the cursor with a magnetic attraction
 * @param {number} strength - Magnetic strength (0-1)
 */
const useMagneticButton = (strength = 0.5) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    const cleanup = magneticButton(buttonRef.current, strength);

    return cleanup;
  }, [strength]);

  return buttonRef;
};

export default useMagneticButton;
