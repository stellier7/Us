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
