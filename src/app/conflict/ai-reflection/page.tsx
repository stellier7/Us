/**
 * AI Reflection — "Here's what I'm hearing..."
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/PageTransition';
import { PrimaryButton } from '@/components/PrimaryButton';
import { TextArea } from '@/components/TextArea';
import { getCurrentSession, updateSession, saveForLater } from '@/lib/storage';
import { generateAiReflection } from '@/lib/ai-reflection';
import { motion } from 'framer-motion';

export default function AiReflectionPage() {
  const router = useRouter();
  const [reflection, setReflection] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const session = getCurrentSession();
    if (!session) {
      router.push('/home');
      return;
    }

    if (session.aiReflection) {
      setReflection(session.aiReflection);
    } else {
      const generated = generateAiReflection(session);
      setReflection(generated);
      updateSession({ aiReflection: generated });
    }
  }, [router]);

  const handleSaveEdit = () => {
    updateSession({ aiReflection: reflection });
    setIsEditing(false);
  };

  const handleReady = () => {
    updateSession({ status: 'ready', aiReflection: reflection });
    router.push('/conflict/ready');
  };

  const handleSaveForLater = () => {
    updateSession({ aiReflection: reflection, status: 'draft' });
    saveForLater();
    router.push('/home');
  };

  return (
    <PageTransition className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <span className="text-2xl">✨</span>
          <h1 className="text-heading font-semibold">AI reflection</h1>
          <p className="text-body text-accent">Here&apos;s what I&apos;m hearing…</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-border bg-calm-blue/10 p-6 space-y-4"
        >
          {isEditing ? (
            <>
              <TextArea value={reflection} onChange={setReflection} />
              <PrimaryButton onClick={handleSaveEdit} variant="secondary" className="w-full">
                Save changes
              </PrimaryButton>
            </>
          ) : (
            <p className="text-body leading-relaxed whitespace-pre-wrap">{reflection}</p>
          )}
        </motion.div>

        {!isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex justify-center"
          >
            <PrimaryButton onClick={() => setIsEditing(true)} variant="ghost">
              Edit
            </PrimaryButton>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35 }}
          className="space-y-4 pt-4"
        >
          <PrimaryButton onClick={handleReady} size="large" className="w-full">
            ❤️ Ready to talk
          </PrimaryButton>

          <div className="text-center">
            <button
              onClick={handleSaveForLater}
              className="text-accent hover:text-foreground transition-colors text-sm underline underline-offset-4"
            >
              Not ready to talk? Save for later
            </button>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
