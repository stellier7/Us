/**
 * Framer Motion animation variants and configurations
 */

import { Variants, Transition } from 'framer-motion';

// Timing constants
export const TIMING = {
  fast: 0.15,
  normal: 0.25,
  slow: 0.4,
} as const;

// Easing functions
export const EASING = {
  easeOut: [0.16, 1, 0.3, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  spring: { type: 'spring' as const, stiffness: 300, damping: 30 },
} as const;

// Page transition variants
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: TIMING.normal, ease: EASING.easeOut }
  },
  exit: { 
    opacity: 0,
    transition: { duration: TIMING.fast }
  }
};

export const slideUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: TIMING.normal, ease: EASING.easeOut }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: TIMING.fast }
  }
};

export const slideIn: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: TIMING.normal, ease: EASING.easeOut }
  },
  exit: { 
    opacity: 0, 
    x: -20,
    transition: { duration: TIMING.fast }
  }
};

// Button press animation
export const scalePress: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: { duration: TIMING.fast }
  },
  tap: { 
    scale: 0.98,
    transition: { duration: TIMING.fast }
  }
};

// Breathing animation
export const breathe: Variants = {
  initial: { scale: 1, opacity: 0.6 },
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.6, 0.9, 0.6],
    transition: {
      duration: 4,
      ease: 'easeInOut',
      repeat: Infinity,
    }
  }
};

// Stagger children animation
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: TIMING.normal }
  }
};
