/**
 * "Together" connection exercises — short, interactive question sets
 * meant to be done by both partners (live on one device, or via a
 * shareable link) and then compared side by side.
 */

import type { ConnectionExercise } from './types';

export const exercises: ConnectionExercise[] = [
  {
    id: 'getting-to-know-you-again',
    slug: 'getting-to-know-you-again',
    title: 'Getting to Know You, Again',
    tagline: 'Inspired by the psychology of closeness-building questions',
    minutes: 8,
    category: 'connection',
    intro:
      'Psychologist Arthur Aron found that trading increasingly personal questions builds closeness fast — it’s the basis of the famous "36 Questions to Fall in Love" study. Here’s a short set to reconnect, even (especially) if you’ve been together a while.',
    questions: [
      { id: 'q1', type: 'text', prompt: 'What would be a "perfect day" for you right now?', placeholder: 'Be specific...', maxLength: 220 },
      { id: 'q2', type: 'text', prompt: 'What do you value most in a friendship?', placeholder: '...', maxLength: 220 },
      { id: 'q3', type: 'text', prompt: 'What’s something you’ve grown to appreciate about yourself recently?', placeholder: '...', maxLength: 220 },
      { id: 'q4', type: 'text', prompt: 'What’s one thing about us you’re grateful for that you don’t say out loud enough?', placeholder: '...', maxLength: 220 },
      { id: 'q5', type: 'text', prompt: 'If you could change one thing about how we handle stress together, what would it be?', placeholder: 'Be kind, but honest...', maxLength: 220 },
      { id: 'q6', type: 'text', prompt: 'What does feeling truly understood by someone look like for you?', placeholder: '...', maxLength: 220 },
    ],
    insight:
      'You don’t have to agree on everything here — the goal is just to see each other a little more clearly. Notice what surprised you.',
  },
  {
    id: 'understanding-our-differences',
    slug: 'understanding-our-differences',
    title: 'Understanding Our Differences',
    tagline: 'Turn your differences into data, not division',
    minutes: 6,
    category: 'differences',
    intro:
      'Every couple is a pairing of two different nervous systems, histories, and needs. Naming your differences out loud — without judgment — is one of the fastest ways to stop taking them personally.',
    questions: [
      { id: 'q1', type: 'text', prompt: 'When you’re stressed, do you want space or comfort first?', placeholder: 'Describe what actually helps...', maxLength: 200 },
      { id: 'q2', type: 'text', prompt: 'How do you prefer to spend an ideal weekend?', placeholder: '...', maxLength: 200 },
      { id: 'q3', type: 'text', prompt: 'What does "support" look like to you in practice?', placeholder: '...', maxLength: 200 },
      { id: 'q4', type: 'text', prompt: 'How were disagreements handled in the home you grew up in?', placeholder: '...', maxLength: 220 },
      { id: 'q5', type: 'text', prompt: 'What’s something about the way you process emotions that’s easy to misread?', placeholder: 'e.g. "I go quiet when I’m thinking, not when I’m mad"', maxLength: 220 },
    ],
    insight:
      'A great relationship isn’t two people who are the same — it’s two people who understand and respect each other’s different operating manual. Where you differ, get curious: "Tell me more about that."',
  },
  {
    id: 'love-language-check-in',
    slug: 'love-language-check-in',
    title: 'Love Language Check-in',
    tagline: 'Learn to speak the language they actually feel loved in',
    minutes: 3,
    category: 'appreciation',
    intro:
      'Based on Gary Chapman’s Five Love Languages. Pick your top language honestly — there’s no wrong answer, and it can change season to season.',
    questions: [
      {
        id: 'primary',
        type: 'choice',
        prompt: 'Which of these makes you feel most loved right now?',
        options: [
          { value: 'words', label: 'Words of Affirmation' },
          { value: 'time', label: 'Quality Time' },
          { value: 'service', label: 'Acts of Service' },
          { value: 'touch', label: 'Physical Touch' },
          { value: 'gifts', label: 'Receiving Gifts' },
        ],
      },
      {
        id: 'secondary',
        type: 'choice',
        prompt: 'And which one comes second?',
        options: [
          { value: 'words', label: 'Words of Affirmation' },
          { value: 'time', label: 'Quality Time' },
          { value: 'service', label: 'Acts of Service' },
          { value: 'touch', label: 'Physical Touch' },
          { value: 'gifts', label: 'Receiving Gifts' },
        ],
      },
      {
        id: 'ask',
        type: 'text',
        prompt: 'One small, specific thing your partner could do this week that would speak your language?',
        placeholder: 'Be specific and small...',
        maxLength: 200,
      },
    ],
    insight:
      'If you picked different languages, that’s completely normal — it just means the same gesture won’t always land the same way for both of you. Try showing love in their language this week, not just yours.',
  },
  {
    id: 'weekly-check-in',
    slug: 'weekly-check-in',
    title: 'Weekly Check-in',
    tagline: 'A quick relationship pulse-check, therapist-style',
    minutes: 4,
    category: 'connection',
    intro:
      'Many couples therapists recommend a short, regular check-in — separate from problem-solving — just to stay emotionally in sync. Try doing this once a week.',
    questions: [
      { id: 'connection', type: 'choice', prompt: 'How connected have you felt to each other this week?', options: [
        { value: '1', label: '1 — Distant' },
        { value: '2', label: '2' },
        { value: '3', label: '3 — Okay' },
        { value: '4', label: '4' },
        { value: '5', label: '5 — Very close' },
      ] },
      { id: 'appreciation', type: 'text', prompt: 'One thing you appreciated about your partner this week', placeholder: '...', maxLength: 200 },
      { id: 'request', type: 'text', prompt: 'One small request for the week ahead (not a complaint — a request)', placeholder: 'e.g. "Can we have one phone-free dinner this week?"', maxLength: 200 },
    ],
    insight:
      'Consistency matters more than intensity. A 5-minute check-in every week does more for a relationship than one long talk every few months.',
  },
];

export function getExerciseById(id: string): ConnectionExercise | undefined {
  return exercises.find((e) => e.id === id);
}
