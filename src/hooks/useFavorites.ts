import { useState, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';

interface FavoriteItem {
  name: string;
  path: string;
  iconName: string;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (item: { name: string; path: string; icon: LucideIcon }) => {
    setFavorites(prev => {
      if (!prev.some(fav => fav.path === item.path)) {
        return [...prev, {
          name: item.name,
          path: item.path,
          iconName: item.icon.name
        }];
      }
      return prev;
    });
  };

  const removeFavorite = (path: string) => {
    setFavorites(prev => prev.filter(item => item.path !== path));
  };

  const isFavorite = (path: string) => {
    return favorites.some(item => item.path === path);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  };
} 