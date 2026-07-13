/**
 * Large selectable card for radio options
 */

'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RadioCardProps {
  label: string;
  value: string;
  selected: boolean;
  onSelect: () => void;
  icon?: LucideIcon;
  className?: string;
}

export function RadioCard({
  label,
  value,
  selected,
  onSelect,
  icon: Icon,
  className,
}: RadioCardProps) {
  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'w-full rounded-2xl p-6 text-left transition-all duration-200',
        'border-2 flex items-center gap-4',
        selected
          ? 'border-calm-blue-dark bg-calm-blue/20'
          : 'border-border bg-background hover:border-accent',
        className
      )}
    >
      {Icon && (
        <Icon 
          className={cn(
            'w-6 h-6 transition-colors',
            selected ? 'text-calm-blue-dark' : 'text-accent'
          )} 
        />
      )}
      <div className="flex-1">
        <div
          className={cn(
            'text-body-large font-medium transition-colors',
            selected ? 'text-foreground' : 'text-foreground/80'
          )}
        >
          {label}
        </div>
      </div>
      <div
        className={cn(
          'w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center',
          selected ? 'border-calm-blue-dark bg-calm-blue-dark' : 'border-accent'
        )}
      >
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-3 h-3 rounded-full bg-white"
          />
        )}
      </div>
    </motion.button>
  );
}
