/**
 * Completion screen - Celebrate emotional regulation
 */

'use client';

import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/PageTransition';
import { PrimaryButton } from '@/components/PrimaryButton';
import { completeSession, getSessionsCount } from '@/lib/storage';
import { motion } from 'framer-motion';
import { Heart, BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CompletePage() {
  const router = useRouter();
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    // Complete the session
    completeSession();
    setSessionCount(getSessionsCount());
  }, []);

  const handleGoHome = () => {
    router.push('/home');
  };

  return (
    <PageTransition className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-background via-success/5 to-background">
      <div className="max-w-2xl w-full space-y-12 text-center">
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="w-24 h-24 rounded-full bg-success/20 flex items-center justify-center">
            <Heart className="w-12 h-12 text-success" fill="currentColor" />
          </div>
        </motion.div>

        {/* Main message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h1 className="text-heading font-semibold leading-relaxed text-balance">
            You chose your relationship over your reaction.
          </h1>
          <p className="text-body text-accent">
            That takes courage and love.
          </p>
        </motion.div>

        {/* Session count */}
        {sessionCount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-accent-light text-sm"
          >
            {sessionCount === 1 
              ? 'First time using US together'
              : `${sessionCount} times you've chosen each other`
            }
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-4"
        >
          <PrimaryButton onClick={handleGoHome} size="large">
            Back to home
          </PrimaryButton>
          <button
            onClick={() => router.push('/skills')}
            className="flex items-center gap-2 mx-auto text-sm text-accent-light hover:text-accent transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Build a skill for next time
          </button>
        </motion.div>

        {/* Closing message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-body-large text-accent italic"
        >
          Same team. Always.
        </motion.p>
      </div>
    </PageTransition>
  );
}
