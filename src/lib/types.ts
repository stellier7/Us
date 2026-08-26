/**
 * Core type definitions for US app
 */

export type FeelingType = 'angry' | 'sad' | 'anxious' | 'disappointed' | 'frustrated' | 'numb';

export type NeedType = 'time' | 'heard' | 'reassurance' | 'space' | 'hug' | 'dont-know';

export type BreathingPattern = 'gentle' | '4-7-8' | 'box';

export type SessionStatus = 'in-progress' | 'draft' | 'ready' | 'shared' | 'completed';

export interface Reflection {
  whatHurt?: string;
  partnerMeant?: string;
  whatINeed?: string;
  whatTheyShouldUnderstand?: string;
}

export interface Session {
  id: string;
  coupleId: string;
  timestamp: number;
  status: SessionStatus;
  whatHappened?: string;
  intensity: number;
  feelings: FeelingType[];
  need: NeedType;
  pauseDuration?: number;
  breathingPattern?: BreathingPattern;
  didBreathing?: boolean;
  reflection: Reflection;
  aiReflection?: string;
  completed: boolean;
}

export interface StorageData {
  coupleId: string;
  sessions: Session[];
  drafts: Session[];
}

export interface SharedSessionPayload {
  sessionId: string;
  initiatorName: string;
  intensity: number;
  need: NeedType;
  feelings: FeelingType[];
  aiReflection: string;
  whatHappened?: string;
  reflection: Reflection;
}

export interface ExercisePayload {
  exerciseId: string;
  answers: Record<string, string>;
}
