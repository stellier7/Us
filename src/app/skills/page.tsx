/**
 * Skills library - psychology-informed relationship skills to learn together
 */

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '@/components/PageTransition';
import { AppNav } from '@/components/AppNav';
import { SkillCard } from '@/components/SkillCard';
import { skills } from '@/lib/skills';
import { getSkillReflections } from '@/lib/storage';
import { staggerContainer, staggerItem } from '@/lib/animations';

export default function SkillsPage() {
  const [practicedIds, setPracticedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setPracticedIds(new Set(Object.keys(getSkillReflections())));
  }, []);

  return (
    <PageTransition className="min-h-screen flex flex-col items-center p-8 bg-gradient-to-br from-background via-background to-calm-blue/5">
      <AppNav current="skills" />

      <div className="max-w-2xl w-full space-y-10 pt-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <h1 className="text-heading font-semibold">Relationship Skills</h1>
          <p className="text-body text-accent max-w-lg mx-auto">
            Short, therapist-informed lessons — the same ideas from couples therapy,
            broken into a few minutes each. Learn one together, or on your own.
          </p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-4">
          {skills.map((skill) => (
            <motion.div key={skill.id} variants={staggerItem}>
              <SkillCard skill={skill} practiced={practicedIds.has(skill.id)} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
}
