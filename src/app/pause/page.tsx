/**
 * Pause screen with timer and breathing animation
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/PageTransition';
import { PrimaryButton } from '@/components/PrimaryButton';
import { BreathingOrb } from '@/components/BreathingOrb';
import { TimerDisplay } from '@/components/TimerDisplay';
import { ScrollPicker } from '@/components/ScrollPicker';
import { updateSession } from '@/lib/storage';
import { BreathingPattern } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

export default function PausePage() {
  const router = useRouter();
  const [showConfig, setShowConfig] = useState(true);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(20);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [breathingPattern, setBreathingPattern] = useState<BreathingPattern>('gentle');

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    const totalSeconds = hours * 3600 + minutes * 60;
    setTimeLeft(totalSeconds);
    setIsRunning(true);
    setShowConfig(false);
    updateSession({ pauseDuration: minutes + hours * 60, breathingPattern });
  };

  const continueNow = () => {
    router.push('/reflection');
  };

  const displayHours = Math.floor(timeLeft / 3600);
  const displayMinutes = Math.floor((timeLeft % 3600) / 60);
  const displaySeconds = timeLeft % 60;

  return (
    <PageTransition className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-background via-calm-blue/5 to-background">
      <AnimatePresence mode="wait">
        {showConfig ? (
          <motion.div
            key="config"
            variants={fadeIn}
            initial="initial"
            animate="animate"
            exit="exit"
            className="max-w-2xl w-full space-y-12"
          >
            {/* Heading */}
            <h1 className="text-heading font-semibold text-center">
              Take the time you need
            </h1>

            {/* Time pickers */}
            <div className="flex justify-center gap-8">
              <ScrollPicker
                value={hours}
                onChange={setHours}
                min={0}
                max={3}
                label="Hours"
              />
              <ScrollPicker
                value={minutes}
                onChange={setMinutes}
                min={1}
                max={60}
                label="Minutes"
              />
            </div>

            {/* Breathing pattern selector */}
            <div className="text-center space-y-3">
              <p className="text-sm text-accent-light">Breathing guide (optional)</p>
              <div className="flex justify-center gap-2">
                {(['gentle', '4-7-8', 'box'] as BreathingPattern[]).map((pattern) => (
                  <button
                    key={pattern}
                    onClick={() => setBreathingPattern(pattern)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      breathingPattern === pattern
                        ? 'bg-calm-blue-dark text-white'
                        : 'bg-calm-blue/20 text-accent hover:bg-calm-blue/40'
                    }`}
                  >
                    {pattern === '4-7-8' ? '4-7-8' : pattern.charAt(0).toUpperCase() + pattern.slice(1)}
                  </button>
                ))}
              </div>
              {breathingPattern === '4-7-8' && (
                <p className="text-xs text-accent-light">Inhale 4s • Hold 7s • Exhale 8s</p>
              )}
              {breathingPattern === 'box' && (
                <p className="text-xs text-accent-light">Inhale 4s • Hold 4s • Exhale 4s • Hold 4s</p>
              )}
            </div>

            {/* Buttons */}
            <div className="space-y-4">
              <PrimaryButton onClick={startTimer} className="w-full">
                Start Timer
              </PrimaryButton>
              <PrimaryButton onClick={continueNow} variant="ghost" className="w-full">
                Continue when ready
              </PrimaryButton>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="timer"
            variants={fadeIn}
            initial="initial"
            animate="animate"
            exit="exit"
            className="max-w-2xl w-full space-y-16 text-center"
          >
            {/* Breathing orb */}
            <BreathingOrb pattern={breathingPattern} />

            {/* Timer */}
            {timeLeft > 0 ? (
              <TimerDisplay
                hours={displayHours}
                minutes={displayMinutes}
                seconds={displaySeconds}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <PrimaryButton onClick={continueNow}>
                  Continue
                </PrimaryButton>
              </motion.div>
            )}

            {/* Reminders */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="space-y-6 text-body text-accent-light max-w-md mx-auto"
            >
              <p>My partner is not my enemy.</p>
              <p>I don't have to solve this right now.</p>
              <p>I will come back.</p>
            </motion.div>

            {/* Early exit option */}
            {timeLeft > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
              >
                <button
                  onClick={continueNow}
                  className="text-sm text-accent-light hover:text-accent transition-colors"
                >
                  Continue now
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
