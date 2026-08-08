/**
 * Conflict Flow - Question 2: Intensity level
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/PageTransition';
import { IntensitySlider } from '@/components/IntensitySlider';
import { updateSession, getCurrentSession } from '@/lib/storage';
import { motion } from 'framer-motion';

export default function IntensityPage() {
  const router = useRouter();
  const [intensity, setIntensity] = useState(5);
  const [hasSelected, setHasSelected] = useState(false);

  useEffect(() => {
    const session = getCurrentSession();
    if (session) {
      setIntensity(session.intensity);
    }
  }, []);

  const handleIntensityChange = (value: number) => {
    setIntensity(value);
    setHasSelected(true);
    updateSession({ intensity: value });

    // Auto-continue after a brief delay
    setTimeout(() => {
      router.push('/conflict/need');
    }, 800);
  };

  return (
    <PageTransition className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <h1 className="text-heading font-semibold text-center">
            How intense does this feel?
          </h1>
          <p className="text-center text-sm text-accent-light max-w-md mx-auto">
            Above a 7, your body may be &ldquo;flooded&rdquo; &mdash; that&apos;s a physiological
            state, not a character flaw. It&apos;s okay.
          </p>
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <IntensitySlider
            value={intensity}
            onChange={handleIntensityChange}
          />
        </motion.div>

        {/* Helper text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-accent-light text-sm"
        >
          Slide to adjust
        </motion.p>
      </div>
    </PageTransition>
  );
}
