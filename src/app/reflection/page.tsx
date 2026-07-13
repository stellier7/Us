/**
 * Reflection screen with three sequential questions
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/PageTransition';
import { PrimaryButton } from '@/components/PrimaryButton';
import { TextArea } from '@/components/TextArea';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { updateSession, getCurrentSession } from '@/lib/storage';
import { motion, AnimatePresence } from 'framer-motion';
import { slideIn } from '@/lib/animations';

const questions = [
  {
    key: 'whatHurt' as const,
    question: 'What hurt me?',
    placeholder: 'Take your time...',
  },
  {
    key: 'partnerMeant' as const,
    question: 'What do I think my partner meant?',
    placeholder: 'Try to see their perspective...',
  },
  {
    key: 'whatINeed' as const,
    question: 'What do I need?',
    placeholder: 'What would help right now?',
  },
];

export default function ReflectionPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    whatHurt: '',
    partnerMeant: '',
    whatINeed: '',
  });

  useEffect(() => {
    const session = getCurrentSession();
    if (session?.reflection) {
      setAnswers({
        whatHurt: session.reflection.whatHurt || '',
        partnerMeant: session.reflection.partnerMeant || '',
        whatINeed: session.reflection.whatINeed || '',
      });
    }
  }, []);

  const currentQuestion = questions[currentStep];
  const currentAnswer = answers[currentQuestion.key];

  const handleAnswerChange = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.key]: value };
    setAnswers(newAnswers);
    updateSession({ reflection: newAnswers });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/guide');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <PageTransition className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Progress */}
        <div className="flex justify-center">
          <ProgressIndicator current={currentStep + 1} total={questions.length} />
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={slideIn}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-8"
          >
            <h1 className="text-heading font-semibold text-center">
              {currentQuestion.question}
            </h1>

            <TextArea
              value={currentAnswer}
              onChange={handleAnswerChange}
              placeholder={currentQuestion.placeholder}
              autoFocus
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-4 pt-4">
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
            {currentStep === questions.length - 1 ? 'Continue' : 'Next'}
          </PrimaryButton>
        </div>

        {/* Helper text */}
        <p className="text-center text-accent-light text-sm">
          {currentStep + 1} of {questions.length}
        </p>
      </div>
    </PageTransition>
  );
}
