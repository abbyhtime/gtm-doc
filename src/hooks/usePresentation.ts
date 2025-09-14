import { useState, useCallback } from 'react';

export interface PresentationItem {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
  category?: string;
}

interface UsePresentationProps {
  items: PresentationItem[];
}

export const usePresentation = ({ items }: UsePresentationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentItem = items[currentIndex];
  const hasNext = currentIndex < items.length - 1;
  const hasPrevious = currentIndex > 0;

  const openPresentation = useCallback((itemId?: string) => {
    if (itemId) {
      const index = items.findIndex(item => item.id === itemId);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
    setIsOpen(true);
  }, [items]);

  const closePresentation = useCallback(() => {
    setIsOpen(false);
  }, []);

  const goToNext = useCallback(() => {
    if (hasNext) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [hasNext]);

  const goToPrevious = useCallback(() => {
    if (hasPrevious) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [hasPrevious]);

  const goToItem = useCallback((index: number) => {
    if (index >= 0 && index < items.length) {
      setCurrentIndex(index);
    }
  }, [items.length]);

  return {
    isOpen,
    currentItem,
    currentIndex,
    hasNext,
    hasPrevious,
    openPresentation,
    closePresentation,
    goToNext,
    goToPrevious,
    goToItem,
    totalItems: items.length
  };
};