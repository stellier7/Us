/**
 * Conflict Flow - Question 1: What happened?
 * Enhanced with live voice transcript display
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/PageTransition';
import { PrimaryButton } from '@/components/PrimaryButton';
import { TextArea } from '@/components/TextArea';
import { VoiceInput } from '@/components/VoiceInput';
import { updateSession, getCurrentSession } from '@/lib/storage';
import { motion, AnimatePresence } from 'framer-motion';

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
    // Save final text (including any interim transcript)
    const finalText = interimTranscript ? `${text} ${interimTranscript}`.trim() : text;
    updateSession({ whatHappened: finalText });
    router.push('/conflict/intensity');
  };

  const handleVoiceTranscript = (transcript: string, isFinal: boolean) => {
    if (isFinal) {
      // Add final transcript to the text
      setText((prev) => {
        const newText = prev ? `${prev} ${transcript}` : transcript;
        return newText;
      });
      setInterimTranscript(''); // Clear interim when we get final
    } else {
      // Show interim transcript separately (live)
      setInterimTranscript(transcript);
    }
  };

  const handleListeningChange = (listening: boolean) => {
    setIsRecording(listening);
    if (!listening) {
      // When recording stops, add any remaining interim to text
      if (interimTranscript) {
        setText((prev) => (prev ? `${prev} ${interimTranscript}` : interimTranscript));
        setInterimTranscript('');
      }
    }
  };

  // Combined display text
  const displayText = interimTranscript ? `${text} ${interimTranscript}` : text;

  return (
    <PageTransition className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-heading font-semibold text-center mb-3"
        >
          What happened?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="text-center text-sm text-accent-light mb-8"
        >
          Naming what happened, without judgment, is the first step therapists use to help
          your nervous system settle.
        </motion.p>

        {/* Text display with live transcript */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {/* Recording status banner */}
          <AnimatePresence>
            {isRecording && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 border border-red-200 rounded-xl p-4 text-center"
              >
                <p className="text-sm text-red-600 font-medium">
                  🎤 Recording... Speak freely, press Stop when done
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Textarea or live transcript display */}
          {isRecording ? (
            <div className="relative w-full min-h-[200px] rounded-xl border-2 border-red-200 bg-red-50/50 px-6 py-4">
              <div className="text-body whitespace-pre-wrap">
                {/* Final text */}
                {text && <span className="text-foreground">{text}</span>}
                {text && interimTranscript && <span> </span>}
                {/* Interim text (live) */}
                {interimTranscript && (
                  <motion.span
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-red-600 italic"
                  >
                    {interimTranscript}
                  </motion.span>
                )}
                {!text && !interimTranscript && (
                  <span className="text-accent-light italic">
                    Start speaking... your words will appear here
                  </span>
                )}
              </div>
            </div>
          ) : (
            <TextArea
              value={text}
              onChange={setText}
              placeholder="Type here or use voice recording below..."
              autoFocus={!text}
            />
          )}

          {/* Voice input */}
          <div className="flex justify-center">
            <VoiceInput
              onTranscript={handleVoiceTranscript}
              onListeningChange={handleListeningChange}
            />
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
          {isRecording
            ? 'Press Stop Recording or Continue when you\'re ready to move on'
            : 'This is just for you. Take your time or skip ahead.'}
        </motion.p>
      </div>
    </PageTransition>
  );
}
