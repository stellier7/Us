/**
 * Conversation guide - Mad Libs style guide for talking
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/PageTransition';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { getCurrentSession } from '@/lib/storage';
import { motion, AnimatePresence } from 'framer-motion';
import { slideIn } from '@/lib/animations';

export default function GuidePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [sentences, setSentences] = useState<string[]>([]);

  useEffect(() => {
    const session = getCurrentSession();
    if (session) {
      const { whatHappened, reflection } = session;
      
      const guideSentences = [
        whatHappened
          ? `When "${whatHappened}" happened...`
          : 'When this situation happened...',
        reflection.whatHurt
          ? `I felt ${reflection.whatHurt.toLowerCase()}`
          : 'I felt hurt',
        reflection.whatINeed
          ? `What I needed was ${reflection.whatINeed.toLowerCase()}`
          : 'What I need is understanding',
      ];

      setSentences(guideSentences);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < sentences.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/complete');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (sentences.length === 0) {
    return null;
  }

  return (
    <PageTransition className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-12">
        {/* Progress */}
        <div className="flex justify-center">
          <ProgressIndicator current={currentStep + 1} total={sentences.length} />
        </div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-body text-accent text-center"
        >
          When you're ready to talk, try saying:
        </motion.h2>

        {/* Sentence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={slideIn}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-[200px] flex items-center justify-center"
          >
            <p className="text-heading font-medium text-center leading-relaxed text-balance">
              {sentences[currentStep]}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-4">
          {currentStep > 0 && (
            <PrimaryButton
              onClick={handleBack}
              variant="ghost"
              className="flex-1"
            >
              Back
            </PrimaryButton>
          )}
          <PrimaryButton
            onClick={handleNext}
            className="flex-1"
          >
            {currentStep === sentences.length - 1 ? 'Ready to talk' : 'Next'}
          </PrimaryButton>
        </div>

        {/* Helper text */}
        <p className="text-center text-accent-light text-sm">
          {currentStep + 1} of {sentences.length}
        </p>
      </div>
    </PageTransition>
  );
}
