
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  intensity?: 'low' | 'medium' | 'high';
}

const GlassContainer = ({
  children,
  className,
  hoverEffect = true,
  intensity = 'medium',
  ...props
}: GlassContainerProps) => {
  const intensityClasses = {
    low: 'bg-white/5 backdrop-blur-sm border-white/10',
    medium: 'bg-white/10 backdrop-blur-md border-white/20',
    high: 'bg-white/20 backdrop-blur-lg border-white/30'
  };

  return (
    <div
      className={cn(
        'rounded-2xl border shadow-lg transition-all duration-300',
        intensityClasses[intensity],
        hoverEffect && 'hover:shadow-xl hover:border-white/30',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassContainer;
