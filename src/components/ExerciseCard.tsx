/**
 * Card for a single "Together" connection exercise in the hub list
 */

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Users2 } from 'lucide-react';
import type { ConnectionExercise } from '@/lib/types';

interface ExerciseCardProps {
  exercise: ConnectionExercise;
}

const categoryLabel: Record<ConnectionExercise['category'], string> = {
  connection: 'Connection',
  differences: 'Understanding differences',
  appreciation: 'Appreciation',
};

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <Link href={`/together/${exercise.id}`}>
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full rounded-2xl border-2 border-border bg-background p-6 text-left transition-colors hover:border-accent"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="text-xs uppercase tracking-wide text-calm-blue-dark font-semibold">
              {categoryLabel[exercise.category]}
            </div>
            <h3 className="text-body-large font-semibold text-foreground">{exercise.title}</h3>
            <p className="text-body text-accent">{exercise.tagline}</p>
          </div>
          <ArrowRight className="w-5 h-5 text-accent-light flex-shrink-0 mt-1" />
        </div>
        <div className="flex items-center gap-4 text-sm text-accent-light mt-4">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {exercise.minutes} min
          </span>
          <span className="flex items-center gap-1.5">
            <Users2 className="w-3.5 h-3.5" />
            Do it together
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
