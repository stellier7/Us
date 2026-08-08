/**
 * Home screen - Main entry point after splash
 */

'use client';

import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/PageTransition';
import { PrimaryButton } from '@/components/PrimaryButton';
import { AppNav } from '@/components/AppNav';
import { getRandomQuote } from '@/lib/quotes';
import { createSession } from '@/lib/storage';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { BookOpen, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
    <PageTransition className="min-h-screen flex flex-col items-center p-8 bg-gradient-to-br from-background via-background to-calm-blue/5">
      <AppNav current="home" />

      <div className="max-w-2xl w-full space-y-12 text-center pt-8 pb-16">
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
          className="space-y-3"
        >
          <PrimaryButton
            onClick={handleStartConflict}
            size="large"
            className="mx-auto"
          >
            I need us
          </PrimaryButton>
          <p className="text-sm text-accent-light">
            For when things feel tense and you need to slow down first
          </p>
        </motion.div>

        {/* Explore together */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="space-y-4 pt-6"
        >
          <p className="text-sm uppercase tracking-wide text-accent-light font-medium">
            Or, when things are calm
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            <Link href="/skills">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="h-full rounded-2xl border-2 border-border bg-background p-6 space-y-3 hover:border-accent transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-calm-blue/30 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-calm-blue-dark" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-accent-light" />
                </div>
                <div>
                  <p className="text-body font-semibold text-foreground">Learn a skill</p>
                  <p className="text-sm text-accent">Short, therapist-informed lessons for the two of you</p>
                </div>
              </motion.div>
            </Link>

            <Link href="/together">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="h-full rounded-2xl border-2 border-border bg-background p-6 space-y-3 hover:border-accent transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-success" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-accent-light" />
                </div>
                <div>
                  <p className="text-body font-semibold text-foreground">Do an exercise together</p>
                  <p className="text-sm text-accent">Answer a few questions each, then compare — send her the link</p>
                </div>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* App name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-accent-light text-sm"
        >
          US
        </motion.div>
      </div>
    </PageTransition>
  );
}
