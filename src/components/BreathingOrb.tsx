/**
 * Animated breathing orb with configurable patterns
 */

'use client';

import { motion } from 'framer-motion';
import { BreathingPattern } from '@/lib/types';

interface BreathingOrbProps {
  pattern?: BreathingPattern;
  className?: string;
}

export function BreathingOrb({ pattern = 'gentle', className }: BreathingOrbProps) {
  // Animation configurations for different patterns
  const animations = {
    gentle: {
      scale: [1, 1.1, 1],
      opacity: [0.6, 0.9, 0.6],
      transition: {
        duration: 4,
        ease: 'easeInOut',
        repeat: Infinity,
      }
    },
    '4-7-8': {
      scale: [1, 1.15, 1.15, 1],
      opacity: [0.5, 0.9, 0.9, 0.5],
      transition: {
        duration: 19, // 4s inhale + 7s hold + 8s exhale
        times: [0, 0.21, 0.58, 1], // timing ratios: 4/19, 11/19, 19/19
        ease: 'easeInOut',
        repeat: Infinity,
      }
    },
    box: {
      scale: [1, 1.15, 1.15, 1, 1],
      opacity: [0.5, 0.9, 0.9, 0.5, 0.5],
      transition: {
        duration: 16, // 4s each phase
        times: [0, 0.25, 0.5, 0.75, 1],
        ease: 'linear',
        repeat: Infinity,
      }
    },
  };

  return (
    <div className={className}>
      <motion.div
        className="relative w-48 h-48 mx-auto"
        animate={animations[pattern]}
      >
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-calm-blue to-calm-blue-dark blur-2xl" />
        
        {/* Main orb */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-calm-blue to-calm-blue-dark" />
        
        {/* Inner highlight */}
        <div className="absolute inset-8 rounded-full bg-gradient-to-br from-white/40 to-transparent" />
      </motion.div>
    </div>
  );
}
