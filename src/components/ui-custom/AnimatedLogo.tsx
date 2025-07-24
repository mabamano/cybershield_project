
import React from 'react';
import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

const AnimatedLogo = ({
  size = 'md',
  animated = true,
  className
}: AnimatedLogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      <div
        className={cn(
          'relative text-cybershield-accent',
          sizeClasses[size],
          animated && 'animate-pulse-slow'
        )}
      >
        <Shield className="w-full h-full" />
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
          CS
        </div>
      </div>
      {animated && (
        <div className="absolute inset-0 bg-cybershield-accent/20 rounded-full filter blur-xl animate-pulse opacity-70" />
      )}
    </div>
  );
};

export default AnimatedLogo;
