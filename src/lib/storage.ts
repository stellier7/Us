/**
 * Local storage utilities for multi-couple session management
 */

import type { Session, StorageData, NeedType, Reflection } from './types';

const STORAGE_KEY = 'us-app-data';
const CURRENT_SESSION_KEY = 'us-current-session';

/**
 * Generate a unique ID
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get storage data from localStorage
 */
function getStorageData(): StorageData | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading storage:', error);
    return null;
  }
}

/**
 * Save storage data to localStorage
 */
function saveStorageData(data: StorageData): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving storage:', error);
  }
}

/**
 * Initialize or get couple ID
 */
export function initCouple(): string {
  let data = getStorageData();
  
  if (!data) {
    const coupleId = generateId();
    data = {
      coupleId,
      sessions: [],
    };
    saveStorageData(data);
    return coupleId;
  }
  
  return data.coupleId;
}

/**
 * Create a new session
 */
export function createSession(): Session {
  const coupleId = initCouple();
  const session: Session = {
    id: generateId(),
    coupleId,
    timestamp: Date.now(),
    intensity: 5,
    need: 'dont-know',
    reflection: {},
    completed: false,
  };
  
  // Save as current session
  if (typeof window !== 'undefined') {
    localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(session));
  }
  
  return session;
}

/**
 * Get current session
 */
export function getCurrentSession(): Session | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const data = localStorage.getItem(CURRENT_SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading current session:', error);
    return null;
  }
}

/**
 * Update current session
 */
export function updateSession(updates: Partial<Session>): void {
  const current = getCurrentSession();
  if (!current) return;
  
  const updated = { ...current, ...updates };
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(updated));
  }
}

/**
 * Complete and save current session
 */
export function completeSession(): void {
  const current = getCurrentSession();
  if (!current) return;
  
  current.completed = true;
  
  const data = getStorageData();
  if (data) {
    data.sessions.push(current);
    saveStorageData(data);
  }
  
  // Clear current session
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CURRENT_SESSION_KEY);
  }
}

/**
 * Get all sessions for current couple
 */
export function getSessions(): Session[] {
  const data = getStorageData();
  return data?.sessions || [];
}

/**
 * Get sessions count
 */
export function getSessionsCount(): number {
  return getSessions().length;
}
