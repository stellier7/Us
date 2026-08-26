/**
 * Conflict Flow - Optional breathing after intense feelings
 */

'use client';

import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/PageTransition';
import { BreathingExercise } from '@/components/BreathingExercise';
import { updateSession } from '@/lib/storage';
import { motion } from 'framer-motion';

export default function BreathePage() {
  const router = useRouter();

  const handleComplete = () => {
    updateSession({ didBreathing: true });
    router.push('/conflict/reflection');
  };

  const handleSkip = () => {
    router.push('/conflict/reflection');
  };

  return (
    <PageTransition className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-heading font-semibold text-center"
        >
          Let&apos;s slow down for a moment
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-body text-accent text-center"
        >
          That felt intense. A few breaths can help your body catch up before you go deeper.
        </motion.p>

        <BreathingExercise onComplete={handleComplete} onSkip={handleSkip} />
      </div>
    </PageTransition>
  );
}
