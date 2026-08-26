/**
 * Reflection — steps 4–7 of the conflict flow
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/PageTransition';
import { PrimaryButton } from '@/components/PrimaryButton';
import { TextArea } from '@/components/TextArea';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { updateSession, getCurrentSession, inferNeedFromReflection } from '@/lib/storage';
import { motion, AnimatePresence } from 'framer-motion';
import { slideIn } from '@/lib/animations';

const TOTAL_STEPS = 7;

const questions = [
  {
    key: 'whatHurt' as const,
    step: 4,
    question: 'What hurt you?',
    placeholder: 'Take your time…',
  },
  {
    key: 'partnerMeant' as const,
    step: 5,
    question: 'What do you think they meant?',
    placeholder: 'Try to see their perspective…',
  },
  {
    key: 'whatINeed' as const,
    step: 6,
    question: 'What do you need from them?',
    placeholder: 'What would help right now?',
  },
  {
    key: 'whatTheyShouldUnderstand' as const,
    step: 7,
    question: 'What do you want them to understand?',
    placeholder: 'What matters most for them to hear?',
  },
];

export default function ReflectionPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    whatHurt: '',
    partnerMeant: '',
    whatINeed: '',
    whatTheyShouldUnderstand: '',
  });

  useEffect(() => {
    const session = getCurrentSession();
    if (session?.reflection) {
      setAnswers({
        whatHurt: session.reflection.whatHurt || '',
        partnerMeant: session.reflection.partnerMeant || '',
        whatINeed: session.reflection.whatINeed || '',
        whatTheyShouldUnderstand: session.reflection.whatTheyShouldUnderstand || '',
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
      const need = inferNeedFromReflection(answers);
      updateSession({ need, reflection: answers });
      router.push('/conflict/ai-reflection');
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
        <div className="flex justify-center">
          <ProgressIndicator current={currentQuestion.step} total={TOTAL_STEPS} />
        </div>

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

        <div className="flex gap-4 pt-4">
          {currentStep > 0 && (
            <PrimaryButton onClick={handleBack} variant="ghost" className="flex-1">
              Back
            </PrimaryButton>
          )}
          <PrimaryButton onClick={handleNext} className="flex-1">
            {currentStep === questions.length - 1 ? 'Continue' : 'Next'}
          </PrimaryButton>
        </div>

        <p className="text-center text-accent-light text-sm">
          {currentQuestion.step} of {TOTAL_STEPS}
        </p>
      </div>
    </PageTransition>
  );
}
