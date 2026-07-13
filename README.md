# US - Same Team. Always.

A calm companion for couples during emotionally difficult moments.

## Overview

US helps couples regulate emotions before trying to solve problems. The app guides users through a structured conflict resolution flow, encouraging emotional awareness, reflection, and calm communication.

## Features

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
  /components       # Reusable UI components
  /lib              # Utilities and business logic
    storage.ts      # Local storage with multi-couple support
    animations.ts   # Framer Motion variants
    types.ts        # TypeScript types
    quotes.ts       # Relationship quotes
  /styles           # Global CSS
```

## Multi-Couple Support

The app automatically generates a unique couple ID on first use and stores all sessions separately. Each couple's data remains private in their browser's local storage.

## Future Enhancements

- Backend with authentication
- Real-time sync between partners
- Progress dashboard
- Push notifications
- More breathing patterns
- Customizable reminders

## License

Private project - Not for distribution
