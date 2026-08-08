/**
 * Relationship skills library - short, evidence-informed psychoeducation
 * (drawing on Gottman Method, Nonviolent Communication, attachment theory,
 * and cognitive reframing) paired with a small private practice exercise.
 */

export interface SkillPoint {
  title: string;
  body: string;
}

export interface SkillField {
  key: string;
  label: string;
  placeholder: string;
}

export interface Skill {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  minutes: number;
  category: 'communication' | 'emotional-awareness' | 'connection';
  intro: string;
  points: SkillPoint[];
  practice: {
    title: string;
    description: string;
    fields: SkillField[];
  };
}

export const skills: Skill[] = [
  {
    id: 'active-listening',
    slug: 'active-listening',
    title: 'Active Listening',
    tagline: 'Hear what they mean, not just what they say',
    minutes: 4,
    category: 'communication',
    intro:
      'Most arguments aren’t about facts — they’re about feeling unheard. Active listening is a technique therapists teach couples to slow down and prove "I’m actually with you" before jumping to defend or fix.',
    points: [
      {
        title: 'Reflect before you respond',
        body: 'Paraphrase what you heard in your own words before adding your perspective: "So what I’m hearing is..."',
      },
      {
        title: 'Validate the feeling, not just the facts',
        body: 'You can validate an emotion without agreeing with the conclusion: "That makes sense you’d feel hurt by that."',
      },
      {
        title: 'Get curious instead of certain',
        body: 'Trade "That’s not true" for "Help me understand what that was like for you."',
      },
    ],
    practice: {
      title: 'Try it now',
      description: 'Think of something your partner said recently that you reacted to quickly.',
      fields: [
        { key: 'whatTheySaid', label: 'What did they say (or do)?', placeholder: 'In their words, as best you remember...' },
        { key: 'reflection', label: 'How would you reflect it back to them?', placeholder: '"So what I’m hearing is..."' },
      ],
    },
  },
  {
    id: 'four-horsemen',
    slug: 'four-horsemen',
    title: 'The Four Horsemen & Their Antidotes',
    tagline: 'Spot the patterns that predict disconnection',
    minutes: 5,
    category: 'communication',
    intro:
      'Relationship researcher Dr. John Gottman found four communication patterns — criticism, contempt, defensiveness, and stonewalling — that are the strongest predictors of a relationship struggling. Each one has a proven antidote.',
    points: [
      {
        title: 'Criticism → Gentle start-up',
        body: 'Instead of "You never help," try "I feel overwhelmed with the housework, could we split it differently?"',
      },
      {
        title: 'Contempt → Culture of appreciation',
        body: 'Contempt (eye-rolling, sarcasm, mockery) is the biggest predictor of disconnection. The antidote is naming what you appreciate, often.',
      },
      {
        title: 'Defensiveness → Take responsibility',
        body: 'Even owning 10% of the problem ("You’re right, I was short with you") de-escalates faster than explaining why you’re not wrong.',
      },
      {
        title: 'Stonewalling → Self-soothe & return',
        body: 'Shutting down usually means your body is flooded. Naming a pause ("I need 20 minutes, I’m not leaving") is healthier than going silent.',
      },
    ],
    practice: {
      title: 'Turn it around',
      description: 'Think of a recent criticism (something you said or wanted to say).',
      fields: [
        { key: 'criticism', label: 'What was the criticism?', placeholder: '"You always..." or "You never..."' },
        { key: 'genderStartUp', label: 'Rewrite it as a gentle start-up', placeholder: '"I feel ___ about ___, I need ___"' },
      ],
    },
  },
  {
    id: 'love-languages',
    slug: 'love-languages',
    title: 'Love Languages',
    tagline: 'You may be showing love in a language they don’t speak',
    minutes: 4,
    category: 'connection',
    intro:
      'Gary Chapman’s framework suggests people tend to feel most loved through one or two primary "languages": Words of Affirmation, Quality Time, Acts of Service, Physical Touch, and Receiving Gifts. Mismatches here are a common, fixable source of feeling unappreciated.',
    points: [
      {
        title: 'Words of Affirmation',
        body: 'Verbal appreciation, encouragement, and kind words land deepest.',
      },
      {
        title: 'Quality Time',
        body: 'Undivided attention — no phones, just presence — feels like love.',
      },
      {
        title: 'Acts of Service',
        body: 'Doing something helpful (dishes, errands, tasks) says "I see you and I’ve got you."',
      },
      {
        title: 'Physical Touch',
        body: 'Hugs, hand-holding, closeness communicate safety and affection.',
      },
      {
        title: 'Receiving Gifts',
        body: 'Thoughtful tokens show "I was thinking of you" — it’s the thought, not the price.',
      },
    ],
    practice: {
      title: 'Check in with yourself',
      description: 'There are no wrong answers — just notice what’s true for you right now.',
      fields: [
        { key: 'myLanguage', label: 'Which language makes you feel most loved lately?', placeholder: 'e.g. Quality Time' },
        { key: 'oneAsk', label: 'One small thing your partner could do this week', placeholder: 'Be specific and small...' },
      ],
    },
  },
  {
    id: 'attachment-styles',
    slug: 'attachment-styles',
    title: 'Attachment Styles',
    tagline: 'Understand your nervous system’s default in conflict',
    minutes: 5,
    category: 'emotional-awareness',
    intro:
      'Attachment theory describes patterns we learned early in life for handling closeness and separation. Neither style is a flaw — knowing your default (and your partner’s) helps you respond to each other with compassion instead of judgment.',
    points: [
      {
        title: 'Secure',
        body: 'Comfortable with closeness and independence; communicates needs fairly directly.',
      },
      {
        title: 'Anxious',
        body: 'Craves closeness and reassurance; conflict can trigger fear of abandonment or protest behavior.',
      },
      {
        title: 'Avoidant',
        body: 'Values independence; conflict can trigger a pull toward distance or shutting down.',
      },
      {
        title: 'Disorganized',
        body: 'A mix of wanting closeness and fearing it, often shifting between the two under stress.',
      },
    ],
    practice: {
      title: 'Notice your pattern',
      description: 'Be gentle with yourself — this is about awareness, not labeling.',
      fields: [
        { key: 'myPattern', label: 'When things feel tense, what do you tend to do?', placeholder: 'Seek closeness, need space, go quiet, get anxious...' },
        { key: 'whatHelps', label: 'What actually helps you feel safe again?', placeholder: 'Words, time, touch, a plan...' },
      ],
    },
  },
  {
    id: 'story-im-telling-myself',
    slug: 'story-im-telling-myself',
    title: 'The Story I’m Telling Myself',
    tagline: 'Separate the facts from the meaning you added',
    minutes: 4,
    category: 'emotional-awareness',
    intro:
      'Author and researcher Brené Brown popularized this reframe: our brains fill gaps in information with a "story" — often the worst-case one. Naming the story out loud (even just to yourself) takes away a lot of its power.',
    points: [
      {
        title: 'Facts are what a camera would see',
        body: 'No interpretation, no assumed intent — just what actually happened or was said.',
      },
      {
        title: 'The story is the meaning you added',
        body: '"They don’t care about me" is a story. "They didn’t text back for 3 hours" is a fact.',
      },
      {
        title: 'There’s always more than one possible story',
        body: 'Generating one alternative story loosens the grip of the first one you believed.',
      },
    ],
    practice: {
      title: 'Reframe a recent moment',
      description: 'Pick something small that still feels a little tender.',
      fields: [
        { key: 'facts', label: 'Just the facts', placeholder: 'What actually, observably happened?' },
        { key: 'story', label: 'The story I told myself', placeholder: 'What meaning did you add?' },
        { key: 'altStory', label: 'One kinder, equally possible story', placeholder: 'What else could explain it?' },
      ],
    },
  },
  {
    id: 'repair-attempts',
    slug: 'repair-attempts',
    title: 'Repair Attempts',
    tagline: 'Small bids that stop an argument from spiraling',
    minutes: 3,
    category: 'connection',
    intro:
      'Gottman found that happy couples don’t argue less — they repair better. A repair attempt is any small word, touch, or bit of humor meant to de-escalate tension before it boils over. Couples who have a shared "repair vocabulary" recover faster.',
    points: [
      {
        title: 'Humor (used gently)',
        body: 'A well-timed inside joke can break tension without dismissing the issue.',
      },
      {
        title: 'A physical gesture',
        body: 'Reaching for a hand or a hug signals "I’m still on your team" mid-conflict.',
      },
      {
        title: 'A simple phrase',
        body: 'Couples often invent their own — "Can we start over?" or "I’m on your side" works wonders.',
      },
    ],
    practice: {
      title: 'Build your repair kit',
      description: 'These work best when you both agree to them ahead of time, not mid-fight.',
      fields: [
        { key: 'repairPhrase', label: 'A phrase you could use to hit pause', placeholder: '"Can we start over?"' },
        { key: 'repairGesture', label: 'A gesture or action that helps you reconnect', placeholder: 'A hand squeeze, a specific word, a short break...' },
      ],
    },
  },
  {
    id: 'managing-flooding',
    slug: 'managing-flooding',
    title: 'Managing Flooding',
    tagline: 'When your body says fight, flee, or freeze',
    minutes: 4,
    category: 'emotional-awareness',
    intro:
      'Flooding is the physiological state of being overwhelmed — racing heart, tunnel vision, feeling unable to listen. It takes at least 20 minutes for your body to physically calm down, so pausing isn’t avoidance, it’s biology.',
    points: [
      {
        title: 'Know your body cues',
        body: 'Tight chest, clenched jaw, heat in your face — learning your early signs helps you pause sooner.',
      },
      {
        title: 'Name it without blame',
        body: '"I’m flooded, I need 20 minutes" protects the conversation instead of shutting your partner out.',
      },
      {
        title: 'Self-soothe on purpose',
        body: 'Walking, slow breathing, or distraction (not rehearsing the argument) actually lowers your heart rate.',
      },
    ],
    practice: {
      title: 'Make your calming plan',
      description: 'Decide this now, so it’s ready before you need it.',
      fields: [
        { key: 'bodyCue', label: 'How does your body tell you it’s flooded?', placeholder: 'Racing heart, tight jaw, going quiet...' },
        { key: 'calmingPlan', label: 'What actually helps you calm down?', placeholder: 'A walk, music, breathing, journaling...' },
      ],
    },
  },
];

export function getSkillBySlug(slug: string): Skill | undefined {
  return skills.find((s) => s.slug === slug);
}
