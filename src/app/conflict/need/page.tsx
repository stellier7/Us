/**
 * Conflict Flow - Question 3: What do you need?
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/PageTransition';
import { RadioCard } from '@/components/RadioCard';
import { updateSession, getCurrentSession } from '@/lib/storage';
import { NeedType } from '@/lib/types';
import { Clock, Ear, Heart, Space, Smile, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';

const needs = [
  { value: 'time' as NeedType, label: 'Time', icon: Clock },
  { value: 'heard' as NeedType, label: 'To feel heard', icon: Ear },
  { value: 'reassurance' as NeedType, label: 'Reassurance', icon: Heart },
  { value: 'space' as NeedType, label: 'Space', icon: Space },
  { value: 'hug' as NeedType, label: 'Hug', icon: Smile },
  { value: 'dont-know' as NeedType, label: "I don't know", icon: HelpCircle },
];

export default function NeedPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<NeedType>('dont-know');

  useEffect(() => {
    const session = getCurrentSession();
    if (session) {
      setSelected(session.need);
    }
  }, []);

  const handleSelect = (need: NeedType) => {
    setSelected(need);
    updateSession({ need });

    // Navigate based on selection
    setTimeout(() => {
      if (need === 'space') {
        router.push('/pause');
      } else {
        router.push('/reflection');
      }
    }, 400);
  };

  return (
    <PageTransition className="min-h-screen flex flex-col items-center justify-center p-8 py-16">
      <div className="max-w-2xl w-full space-y-8">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-heading font-semibold text-center mb-8"
        >
          What do you need most?
        </motion.h1>

        {/* Options */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-4"
        >
          {needs.map((need) => (
            <motion.div key={need.value} variants={staggerItem}>
              <RadioCard
                label={need.label}
                value={need.value}
                selected={selected === need.value}
                onSelect={() => handleSelect(need.value)}
                icon={need.icon}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
}
