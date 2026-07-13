/**
 * Splash screen - Entry point of the app
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  const handleSkip = () => {
    router.push('/home');
  };

  return (
    <motion.main
      variants={fadeIn}
      initial="initial"
      animate="animate"
      onClick={handleSkip}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-calm-blue/10 to-background p-8 cursor-pointer"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h1 className="text-display font-bold tracking-tight">US</h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-heading text-accent"
        >
          Same Team. Always.
        </motion.p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-12 text-body text-accent-light"
      >
        Tap anywhere to continue
      </motion.p>
    </motion.main>
  );
}
