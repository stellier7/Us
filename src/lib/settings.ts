/**
 * Lightweight local settings - your display name, no accounts needed
 */

const NAME_KEY = 'us-app-name';

export function getName(): string {
  if (typeof window === 'undefined') return '';
  try {
    return localStorage.getItem(NAME_KEY) || '';
  } catch {
    return '';
  }
}

export function setName(name: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(NAME_KEY, name.trim());
  } catch {
    // ignore
  }
}
