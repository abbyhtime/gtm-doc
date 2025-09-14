import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ArrowLeft, ArrowRight, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
  className?: string;
}

export const PresentationModal: React.FC<PresentationModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  onNext,
  onPrevious,
  hasNext = false,
  hasPrevious = false,
  className
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          if (hasNext && onNext) {
            event.preventDefault();
            onNext();
          }
          break;
        case 'ArrowLeft':
          if (hasPrevious && onPrevious) {
            event.preventDefault();
            onPrevious();
          }
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrevious, hasNext, hasPrevious]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with strong blur for child modal */}
      <div 
        className="absolute inset-0 bg-background/90 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className={cn(
        "relative w-[95vw] h-[90vh] max-w-7xl animate-scale-in",
        "flex flex-col",
        className
      )}>
        <Card className="h-full shadow-2xl border-2">
          <CardHeader className="flex-shrink-0 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Maximize2 className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle className="text-2xl">{title}</CardTitle>
                  {description && (
                    <CardDescription className="text-lg mt-1">
                      {description}
                    </CardDescription>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Navigation buttons */}
                {(hasPrevious || hasNext) && (
                  <div className="flex items-center gap-1 mr-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onPrevious}
                      disabled={!hasPrevious}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onNext}
                      disabled={!hasNext}
                      className="flex items-center gap-2"
                    >
                      Next
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                
                {/* Close button */}
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
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-auto p-8">
            <div className="h-full">
              {children}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};