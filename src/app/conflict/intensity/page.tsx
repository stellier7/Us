/**
 * Conflict Flow - Step 2: Intensity level
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/PageTransition';
import { PrimaryButton } from '@/components/PrimaryButton';
import { IntensitySlider } from '@/components/IntensitySlider';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { updateSession, getCurrentSession } from '@/lib/storage';
import { motion } from 'framer-motion';

const TOTAL_STEPS = 7;

export default function IntensityPage() {
  const router = useRouter();
  const [intensity, setIntensity] = useState(5);

  useEffect(() => {
    const session = getCurrentSession();
    if (session) {
      setIntensity(session.intensity);
    }
  }, []);

  const handleContinue = () => {
    updateSession({ intensity });
    router.push('/conflict/feelings');
  };

  return (
    <PageTransition className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-10">
        <div className="flex justify-center">
          <ProgressIndicator current={2} total={TOTAL_STEPS} />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-heading font-semibold text-center"
        >
          How intense is it?
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <IntensitySlider value={intensity} onChange={setIntensity} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <PrimaryButton onClick={handleContinue}>Continue</PrimaryButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-accent-light text-sm"
        >
          1 ────────● 10
        </motion.p>
      </div>
    </PageTransition>
  );
}
