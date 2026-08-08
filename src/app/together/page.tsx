/**
 * Together hub - shared connection exercises to do with your partner,
 * live on one device or via a link.
 */

'use client';

import { motion } from 'framer-motion';
import { PageTransition } from '@/components/PageTransition';
import { AppNav } from '@/components/AppNav';
import { ExerciseCard } from '@/components/ExerciseCard';
import { exercises } from '@/lib/together';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { Link2 } from 'lucide-react';

export default function TogetherPage() {
  return (
    <PageTransition className="min-h-screen flex flex-col items-center p-8 bg-gradient-to-br from-background via-background to-calm-blue/5">
      <AppNav current="together" />

      <div className="max-w-2xl w-full space-y-10 pt-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <h1 className="text-heading font-semibold">Together</h1>
          <p className="text-body text-accent max-w-lg mx-auto">
            A great relationship isn’t about being the same — it’s about understanding each
            other. Pick an exercise, answer honestly, then compare your answers side by side.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-border bg-calm-blue/10 p-5 flex items-start gap-3"
        >
          <Link2 className="w-5 h-5 text-calm-blue-dark flex-shrink-0 mt-0.5" />
          <p className="text-sm text-accent">
            Start one on your own, then choose to do it together right now on this device, or
            send your partner a link to answer on theirs — whenever they’re ready.
          </p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-4">
          {exercises.map((exercise) => (
            <motion.div key={exercise.id} variants={staggerItem}>
              <ExerciseCard exercise={exercise} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
}
