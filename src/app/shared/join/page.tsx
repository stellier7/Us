/**
 * Partner invite landing — what the partner sees when opening the share link
 */

'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PageTransition } from '@/components/PageTransition';
import { PrimaryButton } from '@/components/PrimaryButton';
import { decodePayload } from '@/lib/share';
import type { SharedSessionPayload } from '@/lib/types';
import { motion } from 'framer-motion';

const NEED_MESSAGES: Record<string, string> = {
  time: "They'd like some time to process before talking.",
  heard: "They'd like to feel heard before trying to solve it.",
  reassurance: "They'd like reassurance that they matter.",
  space: "They'd like some space right now.",
  hug: "They'd like physical comfort.",
  'dont-know': "They're still figuring out what they need.",
};

function JoinContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [payload, setPayload] = useState<SharedSessionPayload | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const invite = searchParams.get('invite');
    const decoded = decodePayload<SharedSessionPayload>(invite);
    if (decoded) {
      setPayload(decoded);
      sessionStorage.setItem('us-shared-session', JSON.stringify(decoded));
    } else {
      setError(true);
    }
  }, [searchParams]);

  const handleJoin = () => {
    router.push('/shared/room?role=partner');
  };

  if (error) {
    return (
      <PageTransition className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="max-w-md text-center space-y-6">
          <h1 className="text-heading font-semibold">Link expired or invalid</h1>
          <p className="text-body text-accent">Ask your partner to send a new link.</p>
          <PrimaryButton onClick={() => router.push('/home')}>Go home</PrimaryButton>
        </div>
      </PageTransition>
    );
  }

  if (!payload) return null;

  const needMessage = NEED_MESSAGES[payload.need] || NEED_MESSAGES.heard;

  return (
    <PageTransition className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <span className="text-4xl">💬</span>
          <h1 className="text-heading font-semibold">
            {payload.initiatorName} wants to talk about something
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-border bg-calm-blue/10 p-8 space-y-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-accent text-sm">Estimated intensity</span>
            <span className="text-heading font-bold">{payload.intensity}/10</span>
          </div>
          <p className="text-body text-accent leading-relaxed">{needMessage}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <PrimaryButton onClick={handleJoin} size="large" className="w-full">
            Enter shared AI room
          </PrimaryButton>
          <p className="text-center text-accent-light text-sm">
            The AI will help you both understand each other&apos;s perspective
          </p>
        </motion.div>
      </div>
    </PageTransition>
  );
}

export default function JoinPage() {
  return (
    <Suspense fallback={null}>
      <JoinContent />
    </Suspense>
  );
}
