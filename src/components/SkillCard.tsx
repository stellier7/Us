/**
 * Card for a single relationship skill in the library list
 */

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import type { Skill } from '@/lib/skills';

interface SkillCardProps {
  skill: Skill;
  practiced?: boolean;
}

const categoryLabel: Record<Skill['category'], string> = {
  communication: 'Communication',
  'emotional-awareness': 'Emotional awareness',
  connection: 'Connection',
};

export function SkillCard({ skill, practiced }: SkillCardProps) {
  return (
    <Link href={`/skills/${skill.slug}`}>
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full rounded-2xl border-2 border-border bg-background p-6 text-left transition-colors hover:border-accent"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-calm-blue-dark font-semibold">
              <span>{categoryLabel[skill.category]}</span>
              {practiced && (
                <span className="flex items-center gap-1 text-success">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Practiced
                </span>
              )}
            </div>
            <h3 className="text-body-large font-semibold text-foreground">{skill.title}</h3>
            <p className="text-body text-accent">{skill.tagline}</p>
          </div>
          <ArrowRight className="w-5 h-5 text-accent-light flex-shrink-0 mt-1" />
        </div>
        <div className="flex items-center gap-1.5 text-sm text-accent-light mt-4">
          <Clock className="w-3.5 h-3.5" />
          {skill.minutes} min
        </div>
      </motion.div>
    </Link>
  );
}
