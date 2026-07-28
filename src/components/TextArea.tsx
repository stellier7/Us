/**
 * Styled textarea component with auto-resize
 */

'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  autoFocus?: boolean;
}

export function TextArea({
  value,
  onChange,
  placeholder,
  className,
  maxLength = 500,
  autoFocus = false,
}: TextAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="relative w-full">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        autoFocus={autoFocus}
        className={cn(
          'w-full resize-none rounded-xl border border-border bg-background px-6 py-4',
          'text-body placeholder:text-accent-light',
          'focus:outline-none focus:ring-2 focus:ring-calm-blue-dark focus:border-transparent',
          'transition-all duration-200',
          'min-h-[120px]',
          className
        )}
      />
      {maxLength && (
        <div className="absolute bottom-3 right-4 text-sm text-accent-light">
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
}
