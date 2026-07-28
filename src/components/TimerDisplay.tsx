/**
 * Large timer display component
 */

'use client';

import { motion } from 'framer-motion';

interface TimerDisplayProps {
  hours: number;
  minutes: number;
  seconds: number;
  className?: string;
}

export function TimerDisplay({ hours, minutes, seconds, className }: TimerDisplayProps) {
  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className={className}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center justify-center gap-2 text-display font-bold tabular-nums"
      >
        {hours > 0 && (
          <>
            <span>{formatNumber(hours)}</span>
            <span className="text-accent">:</span>
          </>
        )}
        <span>{formatNumber(minutes)}</span>
        <span className="text-accent">:</span>
        <span>{formatNumber(seconds)}</span>
      </motion.div>
    </div>
  );
}
