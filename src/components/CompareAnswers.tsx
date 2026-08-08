/**
 * Side-by-side comparison of two partners' answers to the same
 * connection exercise questions.
 */

'use client';

import { motion } from 'framer-motion';
import type { ConnectionExercise, ExerciseParticipant } from '@/lib/types';

interface CompareAnswersProps {
  exercise: ConnectionExercise;
  a: ExerciseParticipant;
  b: ExerciseParticipant;
}

function labelFor(exercise: ConnectionExercise, questionId: string, value: string): string {
  const question = exercise.questions.find((q) => q.id === questionId);
  if (!question) return value;
  if (question.type === 'choice') {
    return question.options?.find((o) => o.value === value)?.label || value;
  }
  return value;
}

export function CompareAnswers({ exercise, a, b }: CompareAnswersProps) {
  return (
    <div className="space-y-6 w-full">
      {exercise.questions.map((question, index) => {
        const aValue = a.answers[question.id] || '\u2014';
        const bValue = b.answers[question.id] || '\u2014';
        const isChoice = question.type === 'choice';
        const same = isChoice && aValue === bValue;

        return (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="rounded-2xl border border-border bg-background p-6 space-y-4"
          >
            <p className="text-body font-medium text-foreground">{question.prompt}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-calm-blue/10 p-4">
                <p className="text-xs uppercase tracking-wide text-calm-blue-dark font-semibold mb-1">
                  {a.name || 'You'}
                </p>
                <p className="text-body text-foreground whitespace-pre-wrap">
                  {labelFor(exercise, question.id, aValue)}
                </p>
              </div>
              <div className="rounded-xl bg-success/10 p-4">
                <p className="text-xs uppercase tracking-wide text-success font-semibold mb-1">
                  {b.name || 'Partner'}
                </p>
                <p className="text-body text-foreground whitespace-pre-wrap">
                  {labelFor(exercise, question.id, bValue)}
                </p>
              </div>
            </div>
            {isChoice && (
              <p className="text-sm text-accent-light">
                {same ? 'You matched on this one \u2728' : 'You saw this differently \u2014 worth talking about.'}
              </p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
