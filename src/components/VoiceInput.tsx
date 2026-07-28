/**
 * Voice input button with Web Speech API support
 * Continuous recording with live transcript display
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Mic, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface VoiceInputProps {
  onTranscript: (text: string, isFinal: boolean) => void;
  onListeningChange?: (isListening: boolean) => void;
  className?: string;
}

export function VoiceInput({ onTranscript, onListeningChange, className }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Check if Web Speech API is supported
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        setIsSupported(true);
        const recognitionInstance = new SpeechRecognition();
        
        // CONTINUOUS RECORDING - don't stop on silence
        recognitionInstance.continuous = true;
        
        // INTERIM RESULTS - show live transcript
        recognitionInstance.interimResults = true;
        
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';

          // Process all results
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }

          // Send both interim and final transcripts
          if (finalTranscript) {
            onTranscript(finalTranscript.trim(), true);
          }
          if (interimTranscript) {
            onTranscript(interimTranscript, false);
          }
        };

        recognitionInstance.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          // Don't auto-stop on error unless it's a critical error
          if (event.error === 'no-speech' || event.error === 'audio-capture') {
            // These errors are recoverable, keep listening
            return;
          }
          setIsListening(false);
          onListeningChange?.(false);
        };

        recognitionInstance.onend = () => {
          // If we're supposed to be listening, restart (handles browser auto-stop)
          if (isListening) {
            try {
              recognitionInstance.start();
            } catch (e) {
              setIsListening(false);
              onListeningChange?.(false);
            }
          }
        };

        setRecognition(recognitionInstance);
      }
    }
  }, [onTranscript, isListening, onListeningChange]);

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
    return null; // Hide button if not supported
  }

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <AnimatePresence mode="wait">
        {!isListening ? (
          <motion.button
            key="start"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={startListening}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-calm-blue text-calm-blue-dark hover:bg-calm-blue/80 transition-colors"
            aria-label="Start recording"
          >
            <Mic className="w-5 h-5" />
            <span className="font-medium">Start Recording</span>
          </motion.button>
        ) : (
          <motion.button
            key="stop"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={stopListening}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-red-500 text-white hover:bg-red-600 transition-colors"
            aria-label="Stop recording"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Square className="w-5 h-5 fill-current" />
            </motion.div>
            <span className="font-medium">Stop Recording</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Recording indicator */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="flex items-center gap-2 text-red-500"
          >
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-3 h-3 rounded-full bg-red-500"
            />
            <span className="text-sm font-medium">Listening...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
