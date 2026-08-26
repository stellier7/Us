/**
 * Client-side reflection generator — simulates "Here's what I'm hearing..."
 * No API needed; uses session data to craft a compassionate summary.
 */

import type { Session } from './types';
import { getFeelingLabel } from './feelings';

const NEED_LABELS: Record<string, string> = {
  time: 'time to process',
  heard: 'to feel heard before trying to solve anything',
  reassurance: 'reassurance that you matter',
  space: 'some space right now',
  hug: 'physical comfort',
  'dont-know': 'something — you\'re still figuring it out',
};

export function generateAiReflection(session: Session): string {
  const parts: string[] = [];

  if (session.whatHappened) {
    parts.push(`Something happened — "${session.whatHappened.slice(0, 120)}${session.whatHappened.length > 120 ? '...' : ''}" — and it landed hard.`);
  } else {
    parts.push('Something happened, and it landed hard.');
  }

  if (session.feelings.length > 0) {
    const feelingLabels = session.feelings.map(getFeelingLabel).join(', ');
    parts.push(`You're feeling ${feelingLabels.toLowerCase()}, at an intensity of ${session.intensity} out of 10.`);
  } else {
    parts.push(`This feels like a ${session.intensity} out of 10 for you right now.`);
  }

  if (session.reflection.whatHurt) {
    parts.push(`What hurt most: ${session.reflection.whatHurt}`);
  }

  if (session.reflection.partnerMeant) {
    parts.push(`You think they might have meant: "${session.reflection.partnerMeant}"`);
  }

  if (session.reflection.whatINeed) {
    parts.push(`What you need from them: ${session.reflection.whatINeed}`);
  }

  if (session.reflection.whatTheyShouldUnderstand) {
    parts.push(`You want them to understand: ${session.reflection.whatTheyShouldUnderstand}`);
  }

  const needLabel = NEED_LABELS[session.need] || NEED_LABELS['dont-know'];
  parts.push(`Above all, you'd like ${needLabel}.`);

  return parts.join('\n\n');
}

export function generatePartnerPerspective(session: Session): string {
  const lines: string[] = [];

  lines.push("Here's a different way to look at this — not to dismiss what happened, but to help you both see more clearly.");

  if (session.reflection.partnerMeant) {
    lines.push(`Your partner believes they meant: "${session.reflection.partnerMeant}". Even if the impact was different, their intention matters to them.`);
  }

  if (session.reflection.whatTheyShouldUnderstand) {
    lines.push(`What they most want you to understand: "${session.reflection.whatTheyShouldUnderstand}"`);
  }

  if (session.intensity >= 7) {
    lines.push(`At ${session.intensity}/10 intensity, their nervous system is likely flooded. This isn't the best moment to problem-solve — listening first will go further.`);
  }

  lines.push('Try starting with: "I hear you. Tell me more about how that felt."');

  return lines.join('\n\n');
}

export function generateInitiatorPerspective(session: Session): string {
  const lines: string[] = [];

  lines.push("Before you talk, here's a gentle reframe — for you, not against them.");

  if (session.reflection.whatHurt) {
    lines.push(`You said "${session.reflection.whatHurt}" hurt. That's valid. And sometimes naming the hurt out loud — without blame — opens the door for repair.`);
  }

  if (session.reflection.partnerMeant) {
    lines.push(`You guessed they meant "${session.reflection.partnerMeant}". Hold that as a hypothesis, not a fact. Ask them directly: "Did you mean...?"`);
  }

  lines.push('When you\'re ready, lead with how you felt, not what they did wrong. It lands softer.');

  return lines.join('\n\n');
}
