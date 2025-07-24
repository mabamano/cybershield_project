
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TypingEffectProps {
  text?: string;
  phrases?: string[];
  typingSpeed?: number;
  className?: string;
  onComplete?: () => void;
}

const TypingEffect = ({
  text,
  phrases,
  typingSpeed = 50,
  className,
  onComplete
}: TypingEffectProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    // Initialize the current text based on input props
    if (text) {
      setCurrentText(text);
    } else if (phrases && phrases.length > 0) {
      setCurrentText(phrases[0]);
    }
  }, [text, phrases]);

  useEffect(() => {
    if (!currentText) return;

    if (currentIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + currentText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);
      
      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      if (phrases && phraseIndex < phrases.length - 1) {
        // Move to the next phrase
        const timeout = setTimeout(() => {
          setDisplayedText('');
          setCurrentIndex(0);
          setPhraseIndex(prev => prev + 1);
          setCurrentText(phrases[phraseIndex + 1]);
        }, 1500); // Pause between phrases
        
        return () => clearTimeout(timeout);
      } else {
        setIsComplete(true);
        onComplete?.();
      }
    }
  }, [currentIndex, currentText, typingSpeed, isComplete, onComplete, phrases, phraseIndex]);

  return (
    <span className={cn('inline-block', className)}>
      {displayedText}
      {!isComplete && (
        <span className="inline-block w-[2px] h-4 bg-current animate-blink ml-0.5" />
      )}
    </span>
  );
};

export default TypingEffect;
