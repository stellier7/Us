/**
 * URL-safe encoding for sharing "Together" exercise answers via a link.
 * No backend required - the data travels inside the link itself.
 */

import type { ExercisePayload } from './types';

/**
 * Encode an object into a compact, URL-safe base64 string.
 */
export function encodePayload(payload: object): string {
  const json = JSON.stringify(payload);
  const base64 =
    typeof window !== 'undefined'
      ? window.btoa(unescape(encodeURIComponent(json)))
      : Buffer.from(json, 'utf-8').toString('base64');

  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Decode a string produced by encodePayload back into an object.
 * Returns null if the string is missing or malformed.
 */
export function decodePayload<T = ExercisePayload>(value: string | null | undefined): T | null {
  if (!value) return null;

  try {
    let base64 = value.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }

    const json =
      typeof window !== 'undefined'
        ? decodeURIComponent(escape(window.atob(base64)))
        : Buffer.from(base64, 'base64').toString('utf-8');

    return JSON.parse(json) as T;
  } catch (error) {
    console.error('Error decoding shared link:', error);
    return null;
  }
}

/**
 * Build a shareable URL for a given exercise + encoded payload.
 */
export function buildShareUrl(exerciseId: string, paramName: 'from' | 'both', payload: object): string {
  const encoded = encodePayload(payload);
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}/together/${exerciseId}?${paramName}=${encoded}`;
}
