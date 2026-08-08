# US - Same Team. Always.

A calm companion for couples during emotionally difficult moments.

## Overview

US helps couples regulate emotions before trying to solve problems, and build the skills to
understand each other even when you're different. It combines a structured conflict
resolution flow (inspired by couples therapy techniques like the Gottman Method and
Nonviolent Communication) with a library of relationship skills and interactive
"Together" exercises you can do side by side with your partner — in person or via a
shared link.

## Features

### Skills Library
- Short, therapist-informed lessons: Active Listening, The Four Horsemen & Antidotes
  (Gottman), Love Languages, Attachment Styles, The Story I'm Telling Myself (cognitive
  reframing), Repair Attempts, and Managing Flooding
- Each skill pairs a few minutes of psychoeducation with a private practice exercise,
  saved only on your device

### Together
- Interactive "connection exercises" designed to be done by both partners: a short set
  of closeness-building questions, an "Understanding Our Differences" exercise, a Love
  Language check-in, and a Weekly Check-in
- Do it live on one device, or start it yourself and send a link so your partner can add
  their answers later on their own device — no account or backend needed, the exercise
  travels inside the link itself
- Once both of you have answered, see your answers compared side by side with a short
  insight on what your similarities and differences might mean

### Conflict Flow
- **What happened?** - Optional text/voice input to express the situation
- **Intensity slider** - Rate emotional intensity from 1-10
- **What do you need?** - Choose from Time, To feel heard, Reassurance, Space, Hug, or I don't know

### Pause Timer
- Configurable timer (hours and minutes)
- Breathing animations with multiple patterns (gentle, 4-7-8, box breathing)
- Calming reminders during the pause

### Reflection
- Three guided questions to process emotions
- Understanding your own feelings
- Considering your partner's perspective
- Identifying your needs

### Conversation Guide
- Mad Libs style sentence templates
- Built from your previous answers
- Helps start difficult conversations

### Completion
- Celebrates emotional regulation
- Tracks how many times you've used US together

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Local Storage** - Client-side session persistence

## Design Philosophy

- **Minimalist** - Inspired by Apple Journal, Calm, Notion, Linear
- **Calm** - Every interaction lowers emotional activation
- **Simple** - One screen, one decision, one action at a time
- **Private** - All data stored locally, no backend

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to use the app.

## Project Structure

```
/src
  /app              # Next.js App Router pages
    /conflict       # Three conflict flow questions
    /pause          # Timer with breathing animation
    /reflection     # Three reflection questions
    /guide          # Conversation guide
    /complete       # Completion screen
    /skills         # Relationship skills library + detail/practice pages
    /together       # Connection exercises hub + shared exercise flow
  /components       # Reusable UI components
  /lib              # Utilities and business logic
    storage.ts      # Local storage with multi-couple support
    animations.ts   # Framer Motion variants
    types.ts        # TypeScript types
    quotes.ts       # Relationship quotes
    skills.ts       # Skills library content
    together.ts     # Connection exercises content
    share.ts        # URL-safe encode/decode for shareable exercise links
    settings.ts     # Local display name
  /styles           # Global CSS
```

## How "Together" links work

There's no backend, so a shared exercise link carries its data inside the URL itself:

1. You answer the exercise questions and choose to send a link instead of finishing live.
2. Your answers are compactly encoded (base64) into a `?from=...` query parameter.
3. Your partner opens the link, sees you've started, and adds their own answers on their
   device.
4. You both immediately see the comparison. If they opened it via a link, they can send a
   `?both=...` link back so you can view the same comparison on your device too.

Because everything lives in the link, no data is ever sent to a server.

## Multi-Couple Support

The app automatically generates a unique couple ID on first use and stores all sessions separately. Each couple's data remains private in their browser's local storage.

## Future Enhancements

- Backend with authentication
- Real-time sync between partners (today, sync happens via shareable links)
- Progress dashboard
- Push notifications
- More breathing patterns
- Customizable reminders
- More skills and connection exercises

## License

Private project - Not for distribution
