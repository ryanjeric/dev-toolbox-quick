import { useState, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';

export interface FavoriteItem {
  name: string;
  path: string;
  icon?: any;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [showOnlyFavorites, setShowOnlyFavorites] = useState(() => {
    const saved = localStorage.getItem('showOnlyFavorites');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('showOnlyFavorites', JSON.stringify(showOnlyFavorites));
  }, [showOnlyFavorites]);

  const addFavorite = (item: FavoriteItem) => {
    setFavorites((prev) => [...prev, item]);
  };

  const removeFavorite = (path: string) => {
    setFavorites((prev) => prev.filter((item) => item.path !== path));
  };

  const isFavorite = (path: string) => {
    return favorites.some((item) => item.path === path);
  };

  const toggleFavoritesOnly = () => {
    setShowOnlyFavorites((prev) => !prev);
  };

  return {
    favorites,
    showOnlyFavorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavoritesOnly,
  };
}; 