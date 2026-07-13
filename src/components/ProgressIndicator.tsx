/**
 * Minimal progress indicator for multi-step flows
 */

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  current: number;
  total: number;
  className?: string;
}

export function ProgressIndicator({ current, total, className }: ProgressIndicatorProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {Array.from({ length: total }, (_, i) => i + 1).map((step) => (
        <motion.div
          key={step}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: step === current ? 1 : 0.8,
            opacity: step === current ? 1 : step < current ? 0.6 : 0.3,
          }}
          className={cn(
            'h-2 rounded-full transition-all',
            step === current ? 'w-8 bg-calm-blue-dark' : 'w-2 bg-accent'
          )}
        />
      ))}
    </div>
  );
}
