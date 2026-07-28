/**
 * Custom intensity slider with beautiful animations
 */

'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface IntensitySliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function IntensitySlider({
  value,
  onChange,
  min = 1,
  max = 10,
  className,
}: IntensitySliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  
  const percentage = ((value - min) / (max - min)) * 100;
  
  // Get color based on intensity
  const getColor = (val: number) => {
    if (val <= 3) return 'from-green-400 to-green-500';
    if (val <= 6) return 'from-yellow-400 to-yellow-500';
    if (val <= 8) return 'from-orange-400 to-orange-500';
    return 'from-red-400 to-red-500';
  };

  return (
    <div className={cn('w-full space-y-8', className)}>
      {/* Current value display */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <motion.div
          key={value}
          initial={{ scale: 1.2, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="text-display font-bold bg-gradient-to-r bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
          }}
        >
          <span className={cn('bg-gradient-to-r bg-clip-text text-transparent', getColor(value))}>
            {value}
          </span>
        </motion.div>
        <p className="text-body text-accent mt-2">
          {value <= 3 && 'Manageable'}
          {value > 3 && value <= 6 && 'Uncomfortable'}
          {value > 6 && value <= 8 && 'Very intense'}
          {value > 8 && 'Overwhelming'}
        </p>
      </motion.div>

      {/* Slider */}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="w-full h-3 bg-border rounded-full appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, var(--calm-blue-dark) ${percentage}%, var(--border) ${percentage}%)`,
          }}
        />
        
        {/* Number markers */}
        <div className="flex justify-between mt-4 px-1">
          {Array.from({ length: max - min + 1 }, (_, i) => i + min).map((num) => (
            <span
              key={num}
              className={cn(
                'text-sm transition-all',
                num === value ? 'text-foreground font-semibold scale-110' : 'text-accent-light'
              )}
            >
              {num}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--foreground);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          transition: transform 0.15s ease-out;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
        
        .slider::-webkit-slider-thumb:active {
          transform: scale(1.2);
        }
        
        .slider::-moz-range-thumb {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--foreground);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          transition: transform 0.15s ease-out;
        }
        
        .slider::-moz-range-thumb:hover {
          transform: scale(1.1);
        }
        
        .slider::-moz-range-thumb:active {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}
