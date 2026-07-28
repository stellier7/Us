/**
 * Home screen - Main entry point after splash
 */

'use client';

import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/PageTransition';
import { PrimaryButton } from '@/components/PrimaryButton';
import { getRandomQuote } from '@/lib/quotes';
import { createSession } from '@/lib/storage';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();
  const [quote, setQuote] = useState('');

  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  const handleStartConflict = () => {
    // Create new session
    createSession();
    router.push('/conflict/what-happened');
  };

  return (
    <PageTransition className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-background via-background to-calm-blue/5">
      <div className="max-w-2xl w-full space-y-12 text-center">
        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-body-large text-accent italic leading-relaxed text-balance"
        >
          &ldquo;{quote}&rdquo;
        </motion.blockquote>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <PrimaryButton
            onClick={handleStartConflict}
            size="large"
            className="mx-auto"
          >
            I need us
          </PrimaryButton>
        </motion.div>

        {/* App name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-accent-light text-sm"
        >
          US
        </motion.div>
      </div>
    </PageTransition>
  );
}
