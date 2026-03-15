import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface FavoritesStore {
  favorites: string[];
  toggleFavorite: (carId: string) => void;
  isFavorite: (carId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (carId: string) => {
        const { favorites } = get();

        set({
          favorites: favorites.includes(carId)
            ? favorites.filter((id) => id !== carId)
            : [...favorites, carId],
        });
      },

      isFavorite: (carId: string) => get().favorites.includes(carId),
    }),
    {
      name: 'favorite-cars',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
