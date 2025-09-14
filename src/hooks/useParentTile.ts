import { useState, useCallback } from 'react';

export interface ParentTileItem {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
}

interface UseParentTileProps {
  item?: ParentTileItem;
}

export const useParentTile = ({ item }: UseParentTileProps = {}) => {
  const [isParentOpen, setIsParentOpen] = useState(false);
  const [parentItem, setParentItem] = useState<ParentTileItem | null>(item || null);

  const openParentTile = useCallback((tileItem?: ParentTileItem) => {
    if (tileItem) {
      setParentItem(tileItem);
    }
    setIsParentOpen(true);
  }, []);

  const closeParentTile = useCallback(() => {
    setIsParentOpen(false);
  }, []);

  return {
    isParentOpen,
    parentItem,
    openParentTile,
    closeParentTile
  };
};