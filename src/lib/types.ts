/**
 * Core type definitions for US app
 */

export type NeedType = 'time' | 'heard' | 'reassurance' | 'space' | 'hug' | 'dont-know';

export type BreathingPattern = 'gentle' | '4-7-8' | 'box';

export interface Reflection {
  whatHurt?: string;
  partnerMeant?: string;
  whatINeed?: string;
}

export interface Session {
  id: string;
  coupleId: string;
  timestamp: number;
  whatHappened?: string;
  intensity: number;
  need: NeedType;
  pauseDuration?: number; // in minutes
  breathingPattern?: BreathingPattern;
  reflection: Reflection;
  completed: boolean;
}

export interface StorageData {
  coupleId: string;
  sessions: Session[];
}

/**
 * Skills library - psychoeducation & practice
 */
export interface SkillReflection {
  skillId: string;
  answers: Record<string, string>;
  timestamp: number;
}

/**
 * Together - shared connection exercises
 */
export type ExerciseQuestionType = 'text' | 'choice';

export interface ExerciseQuestion {
  id: string;
  prompt: string;
  type: ExerciseQuestionType;
  placeholder?: string;
  options?: { value: string; label: string }[];
  maxLength?: number;
}

export interface ConnectionExercise {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  minutes: number;
  category: 'connection' | 'differences' | 'appreciation';
  intro: string;
  questions: ExerciseQuestion[];
  insight: string;
}

export interface ExerciseParticipant {
  name: string;
  answers: Record<string, string>;
}

export interface ExercisePayload {
  v: 1;
  exerciseId: string;
  a: ExerciseParticipant;
  b?: ExerciseParticipant;
  ts: number;
}

export interface ConnectionExerciseResult {
  id: string;
  exerciseId: string;
  timestamp: number;
  a: ExerciseParticipant;
  b: ExerciseParticipant;
}
