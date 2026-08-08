/**
 * Displays a shareable link with copy + native share support
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Share2 } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';

interface ShareLinkCardProps {
  url: string;
  shareTitle?: string;
  shareText?: string;
}

export function ShareLinkCard({ url, shareTitle = 'US', shareText }: ShareLinkCardProps) {
  const [copied, setCopied] = useState(false);
  const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title: shareTitle, text: shareText, url });
    } catch {
      // User cancelled or share failed - not an error worth surfacing
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-4"
    >
      <div className="rounded-xl border border-border bg-calm-blue/10 px-5 py-4 break-all text-sm text-accent">
        {url}
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        {canNativeShare && (
          <PrimaryButton onClick={handleNativeShare} className="flex-1 flex items-center justify-center gap-2">
            <Share2 className="w-4 h-4" />
            Share link
          </PrimaryButton>
        )}
        <PrimaryButton
          onClick={handleCopy}
          variant={canNativeShare ? 'secondary' : 'primary'}
          className="flex-1 flex items-center justify-center gap-2"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy link'}
        </PrimaryButton>
      </div>
    </motion.div>
  );
}
