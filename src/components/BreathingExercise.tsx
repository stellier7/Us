/**
 * Interactive breathing exercise with animated orb and phase labels
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BreathingOrb } from './BreathingOrb';
import { PrimaryButton } from './PrimaryButton';
import type { BreathingPattern } from '@/lib/types';

interface BreathingExerciseProps {
  onComplete: () => void;
  onSkip?: () => void;
  defaultPattern?: BreathingPattern;
}

const PATTERNS: { value: BreathingPattern; label: string; description: string }[] = [
  { value: 'gentle', label: 'Gentle', description: '4s in, 4s out' },
  { value: '4-7-8', label: '4-7-8', description: 'Calming breath' },
  { value: 'box', label: 'Box', description: '4s each phase' },
];

const PHASE_LABELS: Record<BreathingPattern, string[]> = {
  gentle: ['Breathe in…', 'Breathe out…'],
  '4-7-8': ['Inhale…', 'Hold…', 'Exhale…'],
  box: ['Inhale…', 'Hold…', 'Exhale…', 'Hold…'],
};

const PHASE_DURATIONS: Record<BreathingPattern, number[]> = {
  gentle: [4000, 4000],
  '4-7-8': [4000, 7000, 8000],
  box: [4000, 4000, 4000, 4000],
};

export function BreathingExercise({
  onComplete,
  onSkip,
  defaultPattern = 'gentle',
}: BreathingExerciseProps) {
  const [pattern, setPattern] = useState<BreathingPattern>(defaultPattern);
  const [started, setStarted] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const targetCycles = 3;

  useEffect(() => {
    if (!started) return;

    const durations = PHASE_DURATIONS[pattern];
    const timer = setTimeout(() => {
      const nextPhase = (phaseIndex + 1) % durations.length;
      if (nextPhase === 0) {
        const newCycles = cyclesCompleted + 1;
        setCyclesCompleted(newCycles);
        if (newCycles >= targetCycles) {
          onComplete();
          return;
        }
      }
      setPhaseIndex(nextPhase);
    }, durations[phaseIndex]);

    return () => clearTimeout(timer);
  }, [started, phaseIndex, pattern, cyclesCompleted, onComplete]);

  const handleStart = (selected: BreathingPattern) => {
    setPattern(selected);
    setPhaseIndex(0);
    setCyclesCompleted(0);
    setStarted(true);
  };

  if (!started) {
    return (
      <div className="w-full space-y-6">
        <p className="text-body text-accent text-center">
          Your body might need a moment before going deeper. Pick a breath:
        </p>
        <div className="grid gap-3">
          {PATTERNS.map((p) => (
            <motion.button
              key={p.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleStart(p.value)}
              className="w-full rounded-2xl border border-border bg-background px-6 py-4 text-left hover:border-calm-blue-dark hover:bg-calm-blue/10 transition-colors"
            >
              <span className="font-medium">{p.label}</span>
              <span className="text-sm text-accent ml-2">— {p.description}</span>
            </motion.button>
          ))}
        </div>
        {onSkip && (
          <div className="flex justify-center pt-2">
            <PrimaryButton onClick={onSkip} variant="ghost">
              Skip for now
            </PrimaryButton>
          </div>
        )}
      </div>
    );
  }

  const phaseLabel = PHASE_LABELS[pattern][phaseIndex];

  return (
    <div className="w-full space-y-8">
      <BreathingOrb pattern={pattern} />

      <AnimatePresence mode="wait">
        <motion.p
          key={phaseLabel}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="text-heading font-medium text-center"
        >
          {phaseLabel}
        </motion.p>
      </AnimatePresence>

      <p className="text-center text-accent-light text-sm">
        {cyclesCompleted + 1} of {targetCycles} cycles
      </p>

      {onSkip && (
        <div className="flex justify-center">
          <PrimaryButton onClick={onSkip} variant="ghost" size="default">
            I&apos;m ready to continue
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}
