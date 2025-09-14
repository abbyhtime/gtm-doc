import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ClickableTileProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  hoverScale?: boolean;
  presentationMode?: boolean;
}

export const ClickableTile: React.FC<ClickableTileProps> = ({
  children,
  onClick,
  className,
  hoverScale = true,
  presentationMode = false
}) => {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-300",
        "hover:shadow-lg hover:shadow-primary/10",
        hoverScale && "hover:scale-[1.02] active:scale-[0.98]",
        presentationMode && "border-2 border-primary/20 shadow-lg",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Card>
  );
};