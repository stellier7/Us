/**
 * Local storage utilities for multi-couple session management
 */

import type { Session, StorageData } from './types';

const STORAGE_KEY = 'us-app-data';
const CURRENT_SESSION_KEY = 'us-current-session';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function getStorageData(): StorageData | null {
  if (typeof window === 'undefined') return null;

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    const parsed = JSON.parse(data) as StorageData;
    return {
      coupleId: parsed.coupleId,
      sessions: parsed.sessions || [],
      drafts: parsed.drafts || [],
    };
  } catch (error) {
    console.error('Error reading storage:', error);
    return null;
  }
}

function saveStorageData(data: StorageData): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving storage:', error);
  }
}

export function initCouple(): string {
  let data = getStorageData();

  if (!data) {
    const coupleId = generateId();
    data = {
      coupleId,
      sessions: [],
      drafts: [],
    };
    saveStorageData(data);
    return coupleId;
  }

  return data.coupleId;
}

export function createSession(): Session {
  const coupleId = initCouple();
  const session: Session = {
    id: generateId(),
    coupleId,
    timestamp: Date.now(),
    status: 'in-progress',
    intensity: 5,
    feelings: [],
    need: 'heard',
    reflection: {},
    completed: false,
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(session));
  }

  return session;
}

export function getCurrentSession(): Session | null {
  if (typeof window === 'undefined') return null;

  try {
    const data = localStorage.getItem(CURRENT_SESSION_KEY);
    if (!data) return null;
    const session = JSON.parse(data) as Session;
    return {
      ...session,
      feelings: session.feelings || [],
      status: session.status || 'in-progress',
    };
  } catch (error) {
    console.error('Error reading current session:', error);
    return null;
  }
}

export function updateSession(updates: Partial<Session>): void {
  const current = getCurrentSession();
  if (!current) return;

  const updated = { ...current, ...updates };

  if (typeof window !== 'undefined') {
    localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(updated));
  }
}

export function saveForLater(): void {
  const current = getCurrentSession();
  if (!current) return;

  const draft: Session = { ...current, status: 'draft' };
  const data = getStorageData();

  if (data) {
    const drafts = data.drafts.filter((d) => d.id !== draft.id);
    drafts.unshift(draft);
    saveStorageData({ ...data, drafts: drafts.slice(0, 5) });
  }

  if (typeof window !== 'undefined') {
    localStorage.removeItem(CURRENT_SESSION_KEY);
  }
}

export function getLatestDraft(): Session | null {
  const data = getStorageData();
  return data?.drafts[0] ?? null;
}

export function resumeDraft(draftId: string): Session | null {
  const data = getStorageData();
  if (!data) return null;

  const draft = data.drafts.find((d) => d.id === draftId);
  if (!draft) return null;

  if (typeof window !== 'undefined') {
    localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify({ ...draft, status: 'in-progress' }));
  }

  const drafts = data.drafts.filter((d) => d.id !== draftId);
  saveStorageData({ ...data, drafts });

  return draft;
}

export function deleteDraft(draftId: string): void {
  const data = getStorageData();
  if (!data) return;

  saveStorageData({
    ...data,
    drafts: data.drafts.filter((d) => d.id !== draftId),
  });
}

export function completeSession(): void {
  const current = getCurrentSession();
  if (!current) return;

  current.completed = true;
  current.status = 'completed';

  const data = getStorageData();
  if (data) {
    data.sessions.push(current);
    saveStorageData(data);
  }

  if (typeof window !== 'undefined') {
    localStorage.removeItem(CURRENT_SESSION_KEY);
  }
}

export function getSessions(): Session[] {
  const data = getStorageData();
  return data?.sessions || [];
}

export function getSessionsCount(): number {
  return getSessions().length;
}

export function inferNeedFromReflection(reflection: Session['reflection']): Session['need'] {
  const needText = (reflection.whatINeed || '').toLowerCase();
  if (needText.includes('hear') || needText.includes('listen')) return 'heard';
  if (needText.includes('space') || needText.includes('time alone')) return 'space';
  if (needText.includes('reassur') || needText.includes('comfort')) return 'reassurance';
  if (needText.includes('hug') || needText.includes('hold')) return 'hug';
  if (needText.includes('time')) return 'time';
  return 'heard';
}
