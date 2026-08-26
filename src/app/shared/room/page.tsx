/**
 * Shared AI room — both partners see AI-guided perspectives
 */

'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PageTransition } from '@/components/PageTransition';
import { PrimaryButton } from '@/components/PrimaryButton';
import { getCurrentSession, completeSession } from '@/lib/storage';
import {
  generateAiReflection,
  generatePartnerPerspective,
  generateInitiatorPerspective,
} from '@/lib/ai-reflection';
import type { SharedSessionPayload, Session } from '@/lib/types';
import { motion } from 'framer-motion';

function RoomContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'initiator';
  const [perspective, setPerspective] = useState('');
  const [summary, setSummary] = useState('');
  const [partnerName, setPartnerName] = useState('');

  useEffect(() => {
    let sessionData: Session | SharedSessionPayload | null = null;

    if (role === 'partner') {
      try {
        const stored = sessionStorage.getItem('us-shared-session');
        if (stored) {
          sessionData = JSON.parse(stored) as SharedSessionPayload;
          setPartnerName(sessionData.initiatorName);
        }
      } catch {
        // fall through
      }
    } else {
      sessionData = getCurrentSession();
    }

    if (!sessionData) {
      router.push('/home');
      return;
    }

    const asSession: Session = {
      id: 'id' in sessionData ? sessionData.id : sessionData.sessionId,
      coupleId: '',
      timestamp: Date.now(),
      status: 'shared',
      intensity: sessionData.intensity,
      feelings: sessionData.feelings || [],
      need: sessionData.need,
      reflection: sessionData.reflection || {},
      aiReflection: sessionData.aiReflection,
      whatHappened: sessionData.whatHappened,
      completed: false,
    };

    setSummary(sessionData.aiReflection || generateAiReflection(asSession));

    if (role === 'partner') {
      setPerspective(generatePartnerPerspective(asSession));
    } else {
      setPerspective(generateInitiatorPerspective(asSession));
    }
  }, [role, router]);

  const handleComplete = () => {
    if (role === 'initiator') {
      completeSession();
    }
    router.push('/complete');
  };

  return (
    <PageTransition className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <span className="text-2xl">🤝</span>
          <h1 className="text-heading font-semibold">Shared AI room</h1>
          <p className="text-body text-accent">
            {role === 'partner'
              ? `${partnerName} shared this with you. Here's some context before you talk.`
              : "When your partner joins, they'll see their own perspective too."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-border bg-calm-blue/10 p-6 space-y-3"
        >
          <p className="text-sm text-accent font-medium uppercase tracking-wide">
            ✨ What we heard
          </p>
          <p className="text-body leading-relaxed whitespace-pre-wrap">{summary}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border bg-background p-6 space-y-3"
        >
          <p className="text-sm text-accent font-medium uppercase tracking-wide">
            {role === 'partner' ? '💡 For you' : '💡 Before you speak'}
          </p>
          <p className="text-body leading-relaxed whitespace-pre-wrap">{perspective}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="space-y-4 pt-4"
        >
          <PrimaryButton onClick={handleComplete} size="large" className="w-full">
            {role === 'partner' ? "I'm ready to talk" : 'We talked — finish up'}
          </PrimaryButton>
        </motion.div>
      </div>
    </PageTransition>
  );
}

export default function SharedRoomPage() {
  return (
    <Suspense fallback={null}>
      <RoomContent />
    </Suspense>
  );
}
