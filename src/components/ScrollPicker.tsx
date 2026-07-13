/**
 * iOS-style scroll picker for numbers
 */

'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ScrollPickerProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  label?: string;
  className?: string;
}

export function ScrollPicker({
  value,
  onChange,
  min,
  max,
  label,
  className,
}: ScrollPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = Array.from({ length: max - min + 1 }, (_, i) => i + min);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const index = value - min;
    const itemHeight = 48; // Height of each item
    const scrollTop = index * itemHeight - itemHeight * 2; // Center the selected item

    container.scrollTo({ top: scrollTop, behavior: 'smooth' });
  }, [value, min]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const itemHeight = 48;
    const scrollTop = container.scrollTop + itemHeight * 2;
    const index = Math.round(scrollTop / itemHeight);
    const newValue = Math.max(min, Math.min(max, index + min));

    if (newValue !== value) {
      onChange(newValue);
    }
  };

  return (
    <div className={cn('flex flex-col items-center', className)}>
      {label && (
        <div className="text-body text-accent mb-2">{label}</div>
      )}
      <div className="relative w-24 h-60 overflow-hidden">
        {/* Selection highlight */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-12 bg-calm-blue/30 rounded-lg pointer-events-none z-10" />
        
        {/* Gradient overlays */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none z-20" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />

        {/* Scrollable list */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="h-full overflow-y-scroll scrollbar-hide px-2"
          style={{ scrollSnapType: 'y mandatory' }}
        >
          {/* Top padding */}
          <div className="h-24" />
          
          {items.map((num) => (
            <div
              key={num}
              onClick={() => onChange(num)}
              className={cn(
                'h-12 flex items-center justify-center text-2xl font-medium cursor-pointer transition-all',
                'scroll-snap-align-center',
                num === value
                  ? 'text-foreground scale-110'
                  : 'text-accent-light hover:text-accent'
              )}
              style={{ scrollSnapAlign: 'center' }}
            >
              {num}
            </div>
          ))}
          
          {/* Bottom padding */}
          <div className="h-24" />
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
