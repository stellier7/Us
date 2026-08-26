/**
 * Conflict Flow - Step 1: What happened?
 * Hold to rant + optional typing
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/PageTransition';
import { PrimaryButton } from '@/components/PrimaryButton';
import { TextArea } from '@/components/TextArea';
import { HoldToRant } from '@/components/HoldToRant';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { updateSession, getCurrentSession } from '@/lib/storage';
import { motion, AnimatePresence } from 'framer-motion';

const TOTAL_STEPS = 7;

export default function WhatHappenedPage() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const session = getCurrentSession();
    if (session?.whatHappened) {
      setText(session.whatHappened);
    }
  }, []);

  const handleContinue = () => {
    const finalText = interimTranscript ? `${text} ${interimTranscript}`.trim() : text;
    updateSession({ whatHappened: finalText });
    router.push('/conflict/intensity');
  };

  const handleVoiceTranscript = (transcript: string, isFinal: boolean) => {
    if (isFinal) {
      setText((prev) => (prev ? `${prev} ${transcript}` : transcript));
      setInterimTranscript('');
    } else {
      setInterimTranscript(transcript);
    }
  };

  const handleListeningChange = (listening: boolean) => {
    setIsRecording(listening);
    if (!listening && interimTranscript) {
      setText((prev) => (prev ? `${prev} ${interimTranscript}` : interimTranscript));
      setInterimTranscript('');
    }
  };

  const displayText = interimTranscript ? `${text} ${interimTranscript}`.trim() : text;

  return (
    <PageTransition className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="flex justify-center">
          <ProgressIndicator current={1} total={TOTAL_STEPS} />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-heading font-semibold text-center"
        >
          What happened?
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <HoldToRant
            onTranscript={handleVoiceTranscript}
            onListeningChange={handleListeningChange}
          />

          <AnimatePresence>
            {isRecording && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded-xl border border-red-200 bg-red-50/50 dark:bg-red-950/20 px-6 py-4 min-h-[120px]"
              >
                <p className="text-body whitespace-pre-wrap">
                  {displayText || (
                    <span className="text-accent-light italic">Your words appear here…</span>
                  )}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {!isRecording && (
            <TextArea
              value={text}
              onChange={setText}
              placeholder="Or type here…"
              autoFocus={!text}
            />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center pt-2"
        >
          <PrimaryButton onClick={handleContinue}>Continue</PrimaryButton>
        </motion.div>

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
