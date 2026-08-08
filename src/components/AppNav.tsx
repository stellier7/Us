/**
 * Minimal top navigation between the main sections of the app.
 * Kept off the focused conflict/pause/reflection flow on purpose.
 */

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, BookOpen, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppNavProps {
  current: 'home' | 'skills' | 'together';
}

const items = [
  { key: 'home' as const, href: '/home', label: 'Home', icon: Home },
  { key: 'skills' as const, href: '/skills', label: 'Skills', icon: BookOpen },
  { key: 'together' as const, href: '/together', label: 'Together', icon: Users },
];

export function AppNav({ current }: AppNavProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex justify-center pt-6 pb-2"
    >
      <div className="flex items-center gap-1 rounded-full border border-border bg-background/80 backdrop-blur px-1.5 py-1.5 shadow-sm">
        {items.map(({ key, href, label, icon: Icon }) => (
          <Link key={key} href={href}>
            <span
              className={cn(
                'flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                current === key
                  ? 'bg-foreground text-background'
                  : 'text-accent hover:text-foreground hover:bg-foreground/5'
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </span>
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
