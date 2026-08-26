/**
 * Feeling definitions and helpers
 */

import type { FeelingType } from './types';

export interface FeelingOption {
  value: FeelingType;
  emoji: string;
  label: string;
  intense: boolean;
}

export const FEELINGS: FeelingOption[] = [
  { value: 'angry', emoji: '😡', label: 'Angry', intense: true },
  { value: 'sad', emoji: '😔', label: 'Sad', intense: false },
  { value: 'anxious', emoji: '😰', label: 'Anxious', intense: true },
  { value: 'disappointed', emoji: '😞', label: 'Disappointed', intense: false },
  { value: 'frustrated', emoji: '😤', label: 'Frustrated', intense: true },
  { value: 'numb', emoji: '😶', label: 'Numb', intense: false },
];

export function getFeelingEmoji(feeling: FeelingType): string {
  return FEELINGS.find((f) => f.value === feeling)?.emoji ?? '😶';
}

export function getFeelingLabel(feeling: FeelingType): string {
  return FEELINGS.find((f) => f.value === feeling)?.label ?? feeling;
}

export function hasIntenseFeelings(feelings: FeelingType[]): boolean {
  const intenseSet = new Set(FEELINGS.filter((f) => f.intense).map((f) => f.value));
  return feelings.some((f) => intenseSet.has(f));
}

export function shouldOfferBreathing(intensity: number, feelings: FeelingType[]): boolean {
  return intensity >= 7 || hasIntenseFeelings(feelings);
}
