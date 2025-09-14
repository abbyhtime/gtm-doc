import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ArrowLeft, ArrowRight, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ParentTileModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const ParentTileModal: React.FC<ParentTileModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Don't prevent body scroll for parent modal - only child modal does that
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      {/* Backdrop with lighter blur for parent */}
      <div 
        className="absolute inset-0 bg-background/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal content - elevated but not as much as child modal */}
      <div className={cn(
        "relative w-[90vw] h-[85vh] max-w-6xl animate-scale-in",
        "flex flex-col",
        "transform translate-y-2 scale-[1.02]", // Slight elevation
        className
      )}>
        <Card className="h-full shadow-xl border border-primary/20 bg-background/95 backdrop-blur-sm">
          <CardHeader className="flex-shrink-0 border-b bg-gradient-to-r from-primary/5 to-primary/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Maximize2 className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle className="text-xl">{title}</CardTitle>
                  {description && (
                    <CardDescription className="text-base mt-1">
                      {description}
                    </CardDescription>
                  )}
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Close
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-auto p-6">
            <div className="h-full">
              {children}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};