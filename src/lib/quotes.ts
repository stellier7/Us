/**
 * Curated relationship quotes for the home screen
 */

export const quotes = [
  "In the middle of difficulty lies opportunity.",
  "The greatest relationships are the ones you never expected to be in.",
  "Love is not about how many days, months, or years you have been together. It's about how much you love each other every single day.",
  "A strong relationship requires choosing to love each other even in those moments when you struggle to like each other.",
  "The quality of your life is the quality of your relationships.",
  "We don't meet people by accident. They are meant to cross our path for a reason.",
  "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
  "Love recognizes no barriers. It jumps hurdles, leaps fences, penetrates walls to arrive at its destination full of hope.",
  "The best thing to hold onto in life is each other.",
  "To be fully seen by somebody and be loved anyhow—this is a human offering that can border on miraculous.",
  "A great relationship is about two things: appreciating the similarities and respecting the differences.",
  "The greatest healing therapy is friendship and love.",
  "We are most alive when we're in love.",
  "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.",
  "Love is friendship that has caught fire.",
] as const;

/**
 * Get a random quote
 */
export function getRandomQuote(): string {
  return quotes[Math.floor(Math.random() * quotes.length)];
}
