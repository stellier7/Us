/**
 * Together exercise flow - answer questions solo, then do it together
 * either live on one device or async via a shareable link, and compare
 * answers side by side at the end.
 */

'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition } from '@/components/PageTransition';
import { PrimaryButton } from '@/components/PrimaryButton';
import { TextArea } from '@/components/TextArea';
import { RadioCard } from '@/components/RadioCard';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { ShareLinkCard } from '@/components/ShareLinkCard';
import { CompareAnswers } from '@/components/CompareAnswers';
import { getExerciseById } from '@/lib/together';
import { decodePayload, buildShareUrl } from '@/lib/share';
import { getName, setName as persistName } from '@/lib/settings';
import { saveConnectionResult } from '@/lib/storage';
import type { ExercisePayload, ExerciseParticipant, ConnectionExercise } from '@/lib/types';
import { slideIn } from '@/lib/animations';
import { ArrowLeft, Users, Link2, Sparkles } from 'lucide-react';

type Step =
  | 'loading'
  | 'intro'
  | 'joined-intro'
  | 'name-a'
  | 'answering-a'
  | 'handoff'
  | 'name-b'
  | 'answering-b'
  | 'share'
  | 'results';

function NameCapture({
  title,
  description,
  initialValue,
  onSubmit,
}: {
  title: string;
  description: string;
  initialValue: string;
  onSubmit: (name: string) => void;
}) {
  const [value, setValue] = useState(initialValue);

  return (
    <motion.div variants={slideIn} initial="initial" animate="animate" className="space-y-6 w-full">
      <h1 className="text-heading font-semibold text-center">{title}</h1>
      <p className="text-body text-accent text-center">{description}</p>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Your name"
        autoFocus
        maxLength={40}
        className="w-full rounded-xl border border-border bg-background px-6 py-4 text-body text-center focus:outline-none focus:ring-2 focus:ring-calm-blue-dark focus:border-transparent"
      />
      <PrimaryButton
        onClick={() => onSubmit(value.trim() || 'Partner')}
        className="w-full"
      >
        Continue
      </PrimaryButton>
    </motion.div>
  );
}

function QuestionFlow({
  exercise,
  onComplete,
}: {
  exercise: ConnectionExercise;
  onComplete: (answers: Record<string, string>) => void;
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const question = exercise.questions[index];
  const isLast = index === exercise.questions.length - 1;

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const handleNext = () => {
    if (isLast) {
      onComplete(answers);
    } else {
      setIndex((i) => i + 1);
    }
  };

  const handleBack = () => {
    if (index > 0) setIndex((i) => i - 1);
  };

  const currentAnswer = answers[question.id] || '';

  return (
    <div className="w-full space-y-8">
      <div className="flex justify-center">
        <ProgressIndicator current={index + 1} total={exercise.questions.length} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={question.id} variants={slideIn} initial="initial" animate="animate" exit="exit" className="space-y-6">
          <h2 className="text-heading font-semibold text-center leading-snug">{question.prompt}</h2>

          {question.type === 'text' ? (
            <TextArea
              value={currentAnswer}
              onChange={handleAnswer}
              placeholder={question.placeholder}
              maxLength={question.maxLength || 300}
              autoFocus
            />
          ) : (
            <div className="space-y-3">
              {question.options?.map((option) => (
                <RadioCard
                  key={option.value}
                  label={option.label}
                  value={option.value}
                  selected={currentAnswer === option.value}
                  onSelect={() => handleAnswer(option.value)}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-4">
        {index > 0 && (
          <PrimaryButton onClick={handleBack} variant="ghost" className="flex-1">
            Back
          </PrimaryButton>
        )}
        <PrimaryButton
          onClick={handleNext}
          disabled={question.type === 'choice' && !currentAnswer}
          className="flex-1"
        >
          {isLast ? 'Finish' : 'Next'}
        </PrimaryButton>
      </div>

      <p className="text-center text-accent-light text-sm">
        {index + 1} of {exercise.questions.length}
      </p>
    </div>
  );
}

function TogetherExerciseFlow() {
  const router = useRouter();
  const params = useParams<{ exerciseId: string }>();
  const searchParams = useSearchParams();
  const exercise = getExerciseById(params.exerciseId);

  const [step, setStep] = useState<Step>('loading');
  const [fromParticipant, setFromParticipant] = useState<ExerciseParticipant | null>(null);
  const [participantA, setParticipantA] = useState<ExerciseParticipant | null>(null);
  const [participantB, setParticipantB] = useState<ExerciseParticipant | null>(null);
  const [pendingName, setPendingName] = useState('');
  const savedResultRef = useRef(false);

  useEffect(() => {
    if (!exercise) return;

    const bothParam = searchParams.get('both');
    const fromParam = searchParams.get('from');

    const bothPayload = decodePayload<ExercisePayload>(bothParam);
    if (bothPayload?.a && bothPayload.b) {
      setParticipantA(bothPayload.a);
      setParticipantB(bothPayload.b);
      setStep('results');
      return;
    }

    const fromPayload = decodePayload<ExercisePayload>(fromParam);
    if (fromPayload?.a) {
      setFromParticipant(fromPayload.a);
      setStep('joined-intro');
      return;
    }

    setStep('intro');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercise]);

  useEffect(() => {
    if (step === 'results' && participantA && participantB && exercise && !savedResultRef.current) {
      savedResultRef.current = true;
      saveConnectionResult({
        id: `${exercise.id}-${Date.now()}`,
        exerciseId: exercise.id,
        timestamp: Date.now(),
        a: participantA,
        b: participantB,
      });
    }
  }, [step, participantA, participantB, exercise]);

  if (!exercise) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <p className="text-body text-accent">We couldn’t find that exercise.</p>
        <PrimaryButton onClick={() => router.push('/together')} className="mt-6">
          Back to Together
        </PrimaryButton>
      </div>
    );
  }

  const handleBackToHub = () => router.push('/together');

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-gradient-to-br from-background via-background to-calm-blue/5">
      <div className="max-w-2xl w-full space-y-10 pt-4 pb-16">
        <button
          onClick={handleBackToHub}
          className="flex items-center gap-2 text-sm text-accent hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Together
        </button>

        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div key="intro" variants={slideIn} initial="initial" animate="animate" exit="exit" className="space-y-6 text-center">
              <h1 className="text-heading font-semibold">{exercise.title}</h1>
              <p className="text-body-large text-accent">{exercise.tagline}</p>
              <p className="text-body text-foreground/90 leading-relaxed text-left">{exercise.intro}</p>
              <PrimaryButton onClick={() => setStep('name-a')} size="large" className="w-full">
                Start
              </PrimaryButton>
            </motion.div>
          )}

          {step === 'joined-intro' && fromParticipant && (
            <motion.div key="joined-intro" variants={slideIn} initial="initial" animate="animate" exit="exit" className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-calm-blue/30 flex items-center justify-center">
                  <Users className="w-7 h-7 text-calm-blue-dark" />
                </div>
              </div>
              <h1 className="text-heading font-semibold">
                {fromParticipant.name} started “{exercise.title}”
              </h1>
              <p className="text-body text-accent">
                They’ve already answered. Add your own answers, then you’ll see them side by side.
              </p>
              <PrimaryButton onClick={() => setStep('name-b')} size="large" className="w-full">
                Add my answers
              </PrimaryButton>
            </motion.div>
          )}

          {step === 'name-a' && (
            <motion.div key="name-a">
              <NameCapture
                title="What’s your name?"
                description="So your partner knows whose answers are whose."
                initialValue={getName()}
                onSubmit={(name) => {
                  persistName(name);
                  setPendingName(name);
                  setStep('answering-a');
                }}
              />
            </motion.div>
          )}

          {step === 'answering-a' && (
            <motion.div key="answering-a">
              <QuestionFlow
                exercise={exercise}
                onComplete={(answers) => {
                  setParticipantA({ name: pendingName, answers });
                  setStep('handoff');
                }}
              />
            </motion.div>
          )}

          {step === 'handoff' && (
            <motion.div key="handoff" variants={slideIn} initial="initial" animate="animate" exit="exit" className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-success" />
                </div>
              </div>
              <h1 className="text-heading font-semibold">Nicely done, {pendingName}</h1>
              <p className="text-body text-accent">How would you like to do this together?</p>
              <div className="space-y-4">
                <PrimaryButton onClick={() => setStep('name-b')} className="w-full flex items-center justify-center gap-2">
                  <Users className="w-4 h-4" />
                  We’re together right now
                </PrimaryButton>
                <PrimaryButton
                  onClick={() => setStep('share')}
                  variant="secondary"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Link2 className="w-4 h-4" />
                  Send a link to finish later
                </PrimaryButton>
              </div>
            </motion.div>
          )}

          {step === 'share' && participantA && (
            <motion.div key="share" variants={slideIn} initial="initial" animate="animate" exit="exit" className="space-y-6 text-center">
              <h1 className="text-heading font-semibold">Send this to your partner</h1>
              <p className="text-body text-accent">
                When they open it, they’ll be invited to answer the same questions on their own
                device. You’ll both get to compare answers once they’re done.
              </p>
              <ShareLinkCard
                url={buildShareUrl(exercise.id, 'from', {
                  v: 1,
                  exerciseId: exercise.id,
                  a: participantA,
                  ts: Date.now(),
                })}
                shareTitle={exercise.title}
                shareText={`${pendingName} invited you to do "${exercise.title}" together on US`}
              />
              <button
                onClick={() => setStep('name-b')}
                className="text-sm text-accent-light hover:text-accent transition-colors"
              >
                Actually, let’s do it together right now instead
              </button>
            </motion.div>
          )}

          {step === 'name-b' && (
            <motion.div key="name-b">
              <NameCapture
                title={fromParticipant ? 'And your name?' : 'What’s your partner’s name?'}
                description="Just so we can label your answers correctly."
                initialValue=""
                onSubmit={(name) => {
                  setPendingName(name);
                  setStep('answering-b');
                }}
              />
            </motion.div>
          )}

          {step === 'answering-b' && (
            <motion.div key="answering-b">
              <QuestionFlow
                exercise={exercise}
                onComplete={(answers) => {
                  const b: ExerciseParticipant = { name: pendingName, answers };
                  if (fromParticipant) {
                    setParticipantA(fromParticipant);
                  }
                  setParticipantB(b);
                  setStep('results');
                }}
              />
            </motion.div>
          )}

          {step === 'results' && participantA && participantB && (
            <motion.div key="results" variants={slideIn} initial="initial" animate="animate" exit="exit" className="space-y-8">
              <div className="text-center space-y-3">
                <h1 className="text-heading font-semibold">Your answers, side by side</h1>
                <p className="text-body text-accent">{exercise.insight}</p>
              </div>

              <CompareAnswers exercise={exercise} a={participantA} b={participantB} />

              {fromParticipant && (
                <div className="space-y-3 pt-2">
                  <p className="text-center text-sm text-accent-light">
                    Send this back so {fromParticipant.name} can see it too
                  </p>
                  <ShareLinkCard
                    url={buildShareUrl(exercise.id, 'both', {
                      v: 1,
                      exerciseId: exercise.id,
                      a: participantA,
                      b: participantB,
                      ts: Date.now(),
                    })}
                    shareTitle={exercise.title}
                    shareText={`Here's how we both answered "${exercise.title}" on US`}
                  />
                </div>
              )}

              <PrimaryButton onClick={handleBackToHub} variant="ghost" className="w-full">
                Back to Together
              </PrimaryButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function TogetherExercisePage() {
  return (
    <PageTransition>
      <Suspense fallback={<div className="min-h-screen" />}>
        <TogetherExerciseFlow />
      </Suspense>
    </PageTransition>
  );
}
