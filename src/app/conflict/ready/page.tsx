/**
 * Ready to talk — share link with partner and enter shared room
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/PageTransition';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ShareLinkCard } from '@/components/ShareLinkCard';
import { getCurrentSession, updateSession } from '@/lib/storage';
import { getName, setName } from '@/lib/settings';
import { buildShareUrl } from '@/lib/share';
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

export default function ReadyPage() {
  const router = useRouter();
  const [name, setNameState] = useState('');
  const [shareUrl, setShareUrl] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [needMessage, setNeedMessage] = useState('');
  const [showNamePrompt, setShowNamePrompt] = useState(false);

  useEffect(() => {
    const session = getCurrentSession();
    if (!session) {
      router.push('/home');
      return;
    }

    const savedName = getName();
    setNameState(savedName);
    setIntensity(session.intensity);
    setNeedMessage(NEED_MESSAGES[session.need] || NEED_MESSAGES.heard);

    if (savedName) {
      buildShareLink(session, savedName);
    } else {
      setShowNamePrompt(true);
    }
  }, [router]);

  const buildShareLink = (session: NonNullable<ReturnType<typeof getCurrentSession>>, userName: string) => {
    const payload: SharedSessionPayload = {
      sessionId: session.id,
      initiatorName: userName,
      intensity: session.intensity,
      need: session.need,
      feelings: session.feelings,
      aiReflection: session.aiReflection || '',
      whatHappened: session.whatHappened,
      reflection: session.reflection,
    };

    const url = buildShareUrl(payload);
    setShareUrl(url);
    updateSession({ status: 'shared' });
  };

  const handleNameSubmit = () => {
    if (!name.trim()) return;
    setName(name.trim());
    setShowNamePrompt(false);
    const session = getCurrentSession();
    if (session) buildShareLink(session, name.trim());
  };

  const handleEnterRoom = () => {
    router.push('/shared/room?role=initiator');
  };

  return (
    <PageTransition className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h1 className="text-heading font-semibold">Start shared session</h1>
          <p className="text-body text-accent">
            Send this to your partner. The AI will help both of you see different perspectives.
          </p>
        </motion.div>

        {showNamePrompt ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <p className="text-body text-center">What should your partner call you?</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setNameState(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-xl border border-border bg-background px-5 py-4 text-body focus:outline-none focus:ring-2 focus:ring-calm-blue-dark"
              autoFocus
            />
            <PrimaryButton onClick={handleNameSubmit} className="w-full" disabled={!name.trim()}>
              Continue
            </PrimaryButton>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-border bg-background p-6 space-y-3"
            >
              <p className="text-sm text-accent font-medium uppercase tracking-wide">
                Partner will see
              </p>
              <p className="text-body leading-relaxed">
                <strong>{name || 'Your partner'}</strong> wants to talk about something.
              </p>
              <p className="text-body">
                Estimated intensity: <strong>{intensity}/10</strong>
              </p>
              <p className="text-body text-accent">{needMessage}</p>
            </motion.div>

            {shareUrl && (
              <ShareLinkCard
                url={shareUrl}
                shareTitle={`${name} wants to talk`}
                shareText={`${name} wants to talk about something (${intensity}/10). ${needMessage}`}
              />
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-3 pt-2"
            >
              <PrimaryButton onClick={handleEnterRoom} size="large" className="w-full">
                Enter shared AI room
              </PrimaryButton>
              <p className="text-center text-accent-light text-sm">
                You can enter now — your partner joins when they open the link
              </p>
            </motion.div>
          </>
        )}
      </div>
    </PageTransition>
  );
}
