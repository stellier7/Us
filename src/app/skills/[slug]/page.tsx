/**
 * Skill detail - psychoeducation content + a short private practice exercise
 */

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition } from '@/components/PageTransition';
import { PrimaryButton } from '@/components/PrimaryButton';
import { TextArea } from '@/components/TextArea';
import { getSkillBySlug } from '@/lib/skills';
import { getSkillReflection, saveSkillReflection } from '@/lib/storage';
import { ArrowLeft, Clock, CheckCircle2, Lightbulb } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';

export default function SkillDetailPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const skill = getSkillBySlug(params.slug);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!skill) return;
    const existing = getSkillReflection(skill.id);
    if (existing) {
      setAnswers(existing.answers);
      setSaved(true);
    }
  }, [skill]);

  if (!skill) {
    return (
      <PageTransition className="min-h-screen flex flex-col items-center justify-center p-8">
        <p className="text-body text-accent">We couldn’t find that skill.</p>
        <PrimaryButton onClick={() => router.push('/skills')} className="mt-6">
          Back to Skills
        </PrimaryButton>
      </PageTransition>
    );
  }

  const handleFieldChange = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    saveSkillReflection(skill.id, answers);
    setSaved(true);
  };

  return (
    <PageTransition className="min-h-screen flex flex-col items-center p-8">
      <div className="max-w-2xl w-full space-y-10 pt-4 pb-16">
        {/* Back */}
        <button
          onClick={() => router.push('/skills')}
          className="flex items-center gap-2 text-sm text-accent hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          All skills
        </button>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-1.5 text-sm text-accent-light">
            <Clock className="w-3.5 h-3.5" />
            {skill.minutes} min read
          </div>
          <h1 className="text-heading font-semibold">{skill.title}</h1>
          <p className="text-body-large text-accent">{skill.tagline}</p>
        </motion.div>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-body text-foreground/90 leading-relaxed"
        >
          {skill.intro}
        </motion.p>

        {/* Points */}
        <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-4">
          {skill.points.map((point) => (
            <motion.div
              key={point.title}
              variants={staggerItem}
              className="rounded-2xl border border-border bg-calm-blue/5 p-5 space-y-1.5"
            >
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-calm-blue-dark mt-1 flex-shrink-0" />
                <div>
                  <p className="text-body font-semibold text-foreground">{point.title}</p>
                  <p className="text-body text-accent">{point.body}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Practice */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6 rounded-2xl border-2 border-border p-6"
        >
          <div className="space-y-1">
            <p className="text-body-large font-semibold text-foreground">{skill.practice.title}</p>
            <p className="text-body text-accent">{skill.practice.description}</p>
          </div>

          <div className="space-y-5">
            {skill.practice.fields.map((field) => (
              <div key={field.key} className="space-y-2">
                <label className="text-sm font-medium text-foreground">{field.label}</label>
                <TextArea
                  value={answers[field.key] || ''}
                  onChange={(value) => handleFieldChange(field.key, value)}
                  placeholder={field.placeholder}
                  maxLength={300}
                />
              </div>
            ))}
          </div>

          <PrimaryButton onClick={handleSave} className="w-full flex items-center justify-center gap-2">
            <AnimatePresence mode="wait">
              {saved ? (
                <motion.span
                  key="saved"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Saved privately
                </motion.span>
              ) : (
                <motion.span key="save" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  Save my reflection
                </motion.span>
              )}
            </AnimatePresence>
          </PrimaryButton>
          <p className="text-center text-accent-light text-sm">
            This stays private on your device — it’s just for you.
          </p>
        </motion.div>
      </div>
    </PageTransition>
  );
}
