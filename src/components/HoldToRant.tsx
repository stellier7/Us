/**
 * Hold-to-rant voice button — press and hold to vent, release to stop
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HoldToRantProps {
  onTranscript: (text: string, isFinal: boolean) => void;
  onListeningChange?: (isListening: boolean) => void;
  className?: string;
}

export function HoldToRant({
  onTranscript,
  onListeningChange,
  className,
}: HoldToRantProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const isListeningRef = useRef(false);

  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        setIsSupported(true);
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }

          if (finalTranscript) {
            onTranscript(finalTranscript.trim(), true);
          }
          if (interimTranscript) {
            onTranscript(interimTranscript, false);
          }
        };

        recognitionInstance.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          if (event.error === 'no-speech' || event.error === 'audio-capture') return;
          setIsListening(false);
          onListeningChange?.(false);
        };

        recognitionInstance.onend = () => {
          if (isListeningRef.current) {
            try {
              recognitionInstance.start();
            } catch {
              setIsListening(false);
              onListeningChange?.(false);
            }
          }
        };

        setRecognition(recognitionInstance);
      }
    }
  }, [onTranscript, onListeningChange]);

  const startListening = useCallback(() => {
    if (!recognition) return;
    try {
      recognition.start();
      setIsListening(true);
      onListeningChange?.(true);
    } catch (e) {
      console.error('Failed to start recognition:', e);
    }
  }, [recognition, onListeningChange]);

  const stopListening = useCallback(() => {
    if (!recognition) return;
    try {
      recognition.stop();
      setIsListening(false);
      onListeningChange?.(false);
    } catch (e) {
      console.error('Failed to stop recognition:', e);
    }
  }, [recognition, onListeningChange]);

  if (!isSupported) {
    return (
      <p className="text-sm text-accent-light text-center">
        Voice not supported in this browser — type instead
      </p>
    );
  }

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <motion.button
        onPointerDown={(e) => {
          e.preventDefault();
          startListening();
        }}
        onPointerUp={stopListening}
        onPointerLeave={stopListening}
        onPointerCancel={stopListening}
        onContextMenu={(e) => e.preventDefault()}
        animate={isListening ? { scale: [1, 1.08, 1] } : { scale: 1 }}
        transition={isListening ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' } : {}}
        className={cn(
          'relative w-32 h-32 rounded-full flex flex-col items-center justify-center gap-2 select-none touch-none transition-colors',
          isListening
            ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
            : 'bg-calm-blue text-calm-blue-dark hover:bg-calm-blue/80'
        )}
        aria-label="Hold to rant"
      >
        <Mic className={cn('w-8 h-8', isListening && 'animate-pulse')} />
        <span className="text-xs font-medium">
          {isListening ? 'Release to stop' : 'Hold to rant'}
        </span>

        {isListening && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-red-300"
              animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-red-200"
              animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {isListening && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm text-red-500 font-medium"
          >
            🎙️ Listening… let it out
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
