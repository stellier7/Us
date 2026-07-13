/**
 * Conflict Flow - Question 1: What happened?
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/PageTransition';
import { PrimaryButton } from '@/components/PrimaryButton';
import { TextArea } from '@/components/TextArea';
import { VoiceInput } from '@/components/VoiceInput';
import { updateSession, getCurrentSession } from '@/lib/storage';
import { motion } from 'framer-motion';

export default function WhatHappenedPage() {
  const router = useRouter();
  const [text, setText] = useState('');

  useEffect(() => {
    const session = getCurrentSession();
    if (session?.whatHappened) {
      setText(session.whatHappened);
    }
  }, []);

  const handleContinue = () => {
    updateSession({ whatHappened: text });
    router.push('/conflict/intensity');
  };

  const handleVoiceTranscript = (transcript: string) => {
    setText((prev) => (prev ? `${prev} ${transcript}` : transcript));
  };

  return (
    <PageTransition className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-heading font-semibold text-center mb-12"
        >
          What happened?
        </motion.h1>

        {/* Text input */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <TextArea
            value={text}
            onChange={setText}
            placeholder="Optional - you can skip this if you'd like"
            autoFocus
          />

          {/* Voice input */}
          <div className="flex justify-center">
            <VoiceInput onTranscript={handleVoiceTranscript} />
          </div>
        </motion.div>

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center pt-4"
        >
          <PrimaryButton onClick={handleContinue}>
            Continue
          </PrimaryButton>
        </motion.div>

        {/* Helper text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-accent-light text-sm"
        >
          This is just for you. Take your time or skip ahead.
        </motion.p>
      </div>
    </PageTransition>
  );
}
