import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Car, CarsFilters } from '@/types/car';
import { carsService } from '@/lib/api/cars.service';

interface CarsStore {
  cars: Car[];
  brands: string[];
  filters: CarsFilters;
  favorites: string[];

  page: number;
  totalPages: number;

  loading: boolean;
  error: string | null;

  fetchCars: (page?: number) => Promise<void>;
  fetchBrands: () => Promise<void>;

  setFilters: (filters: CarsFilters) => Promise<void>;

  loadMoreCars: () => Promise<void>;

  toggleFavorite: (carId: string) => void;
}

const ITEMS_PER_PAGE = 12;

export const useCarsStore = create<CarsStore>()(
  persist(
    (set, get) => ({
  cars: [],
  brands: [],
  filters: {},
  favorites: [],

  page: 1,
  totalPages: 1,

  loading: false,
  error: null,

  fetchCars: async (pageNum = 1) => {
    try {
      set({ loading: true, error: null });

      const { filters, cars } = get();

      const response = await carsService.getCars(
        filters,
        pageNum,
        ITEMS_PER_PAGE
      );

      const newCars =
        pageNum === 1 ? response.cars : [...cars, ...response.cars];

      set({
        cars: newCars,
        page: pageNum,
        totalPages: response.totalPages,
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch cars',
        loading: false,
      });
    }
  },

  fetchBrands: async () => {
    try {
      const brands = await carsService.getBrands();
      set({ brands });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to fetch brands',
      });
    }
  },

  setFilters: async (filters: CarsFilters) => {
    set({
      filters,
      page: 1,
      cars: [],
    });

    await get().fetchCars(1);
  },

  loadMoreCars: async () => {
    const { page, totalPages, loading } = get();

    if (loading) return;

    const nextPage = page + 1;

    if (nextPage > totalPages) return;

    await get().fetchCars(nextPage);
  },

  toggleFavorite: (carId: string) => {
    const { favorites } = get();

    let updated: string[];

    if (favorites.includes(carId)) {
      updated = favorites.filter((id) => id !== carId);
    } else {
      updated = [...favorites, carId];
    }

    set({ favorites: updated });
  },

    }),
    {
      name: 'cars-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        favorites: state.favorites,
      }),
    }
  )
);
