/**
 * Primary button component with smooth animations
 */

'use client';

import { motion } from 'framer-motion';
import { scalePress } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'default' | 'large';
}

export function PrimaryButton({
  children,
  onClick,
  disabled = false,
  className,
  variant = 'primary',
  size = 'default',
}: PrimaryButtonProps) {
  const baseStyles = 'rounded-2xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-foreground text-background hover:bg-foreground/90 focus:ring-foreground',
    secondary: 'bg-calm-blue text-calm-blue-dark hover:bg-calm-blue/80 focus:ring-calm-blue-dark border border-border',
    ghost: 'text-foreground hover:bg-foreground/5 focus:ring-foreground/20',
  };
  
  const sizeStyles = {
    default: 'px-8 py-4 text-lg',
    large: 'px-12 py-6 text-xl',
  };

  return (
    <motion.button
      variants={scalePress}
      initial="initial"
      whileHover={disabled ? undefined : "hover"}
      whileTap={disabled ? undefined : "tap"}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </motion.button>
  );
}
