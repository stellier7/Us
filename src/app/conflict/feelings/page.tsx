/**
 * Conflict Flow - Step 3: What are you feeling?
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/PageTransition';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { updateSession, getCurrentSession } from '@/lib/storage';
import { FEELINGS, shouldOfferBreathing } from '@/lib/feelings';
import type { FeelingType } from '@/lib/types';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const TOTAL_STEPS = 7;

export default function FeelingsPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<FeelingType[]>([]);
  const [intensity, setIntensity] = useState(5);

  useEffect(() => {
    const session = getCurrentSession();
    if (session) {
      setSelected(session.feelings || []);
      setIntensity(session.intensity);
    }
  }, []);

  const toggleFeeling = (feeling: FeelingType) => {
    setSelected((prev) =>
      prev.includes(feeling) ? prev.filter((f) => f !== feeling) : [...prev, feeling]
    );
  };

  const handleContinue = () => {
    updateSession({ feelings: selected });

    if (shouldOfferBreathing(intensity, selected)) {
      router.push('/conflict/breathe');
    } else {
      router.push('/conflict/reflection');
    }
  };

  return (
    <PageTransition className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-10">
        <div className="flex justify-center">
          <ProgressIndicator current={3} total={TOTAL_STEPS} />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-heading font-semibold text-center"
        >
          What are you feeling?
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {FEELINGS.map((feeling) => {
            const isSelected = selected.includes(feeling.value);
            return (
              <motion.button
                key={feeling.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleFeeling(feeling.value)}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-2xl border-2 px-6 py-4 transition-all min-w-[100px]',
                  isSelected
                    ? 'border-calm-blue-dark bg-calm-blue/30 scale-105'
                    : 'border-border bg-background hover:border-calm-blue-dark/50'
                )}
              >
                <span className="text-4xl">{feeling.emoji}</span>
                <span className="text-sm text-accent">{feeling.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <PrimaryButton onClick={handleContinue} disabled={selected.length === 0}>
            Continue
          </PrimaryButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-accent-light text-sm"
        >
          Select all that apply
        </motion.p>
      </div>
    </PageTransition>
  );
}
