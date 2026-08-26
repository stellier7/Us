/**
 * Home screen - Main entry point after splash
 */

'use client';

import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/PageTransition';
import { PrimaryButton } from '@/components/PrimaryButton';
import { getRandomQuote } from '@/lib/quotes';
import { createSession, getLatestDraft, resumeDraft } from '@/lib/storage';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();
  const [quote, setQuote] = useState('');
  const [draft, setDraft] = useState<ReturnType<typeof getLatestDraft>>(null);

  useEffect(() => {
    setQuote(getRandomQuote());
    setDraft(getLatestDraft());
  }, []);

  const handleStartConflict = () => {
    createSession();
    router.push('/conflict/what-happened');
  };

  const handleResumeDraft = () => {
    if (!draft) return;
    resumeDraft(draft.id);
    router.push('/conflict/ai-reflection');
  };

  return (
    <PageTransition className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-background via-background to-calm-blue/5">
      <div className="max-w-2xl w-full space-y-12 text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-body-large text-accent italic leading-relaxed text-balance"
        >
          &ldquo;{quote}&rdquo;
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <PrimaryButton onClick={handleStartConflict} size="large" className="mx-auto">
            I need us
          </PrimaryButton>

          {draft && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <button
                onClick={handleResumeDraft}
                className="text-accent hover:text-foreground transition-colors text-sm underline underline-offset-4"
              >
                Continue where you left off
              </button>
            </motion.div>
          )}
        </motion.div>

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
