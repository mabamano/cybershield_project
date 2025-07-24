
import React from 'react';
import { LucideIcon } from 'lucide-react';
import GlassContainer from '../../../ui-custom/GlassContainer';
import { cn } from '@/lib/utils';

interface TabButtonProps {
  icon: LucideIcon;
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

export const TabButton: React.FC<TabButtonProps> = ({
  icon: Icon,
  title,
  description,
  isActive,
  onClick
}) => {
  return (
    <GlassContainer 
      className={cn(
        "p-4 flex items-center",
        isActive ? 'border-cybershield-accent/50' : ''
      )}
      onClick={onClick}
      intensity="low"
    >
      <Icon className="w-5 h-5 text-cybershield-accent mr-3 shrink-0" />
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-xs text-cybershield-400">{description}</p>
      </div>
    </GlassContainer>
  );
};
