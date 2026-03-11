import { create } from 'zustand';
import type { Car, CarsFilters } from '@/types/car';
import { carsService } from '@/lib/api/cars.service';

interface CarsStore {
  cars: Car[];
  selectedCar: Car | null;
  brands: string[];
  filters: CarsFilters;
  favorites: string[];

  page: number;
  totalPages: number;

  loading: boolean;
  error: string | null;

  fetchCars: (page?: number) => Promise<void>;
  fetchCarById: (id: string) => Promise<void>;
  fetchBrands: () => Promise<void>;

  setFilters: (filters: CarsFilters) => void;
  loadMoreCars: () => Promise<void>;

  toggleFavorite: (carId: string) => void;
  isFavorite: (carId: string) => boolean;
  loadFavorites: () => void;
}

const ITEMS_PER_PAGE = 12;

export const useCarsStore = create<CarsStore>((set, get) => ({
  cars: [],
  selectedCar: null,
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

  fetchCarById: async (id: string) => {
    try {
      set({ loading: true, error: null, selectedCar: null });

      const car = await carsService.getCarById(id);

      set({
        selectedCar: car,
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch car',
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

  setFilters: (filters: CarsFilters) => {
    set({
      filters,
      page: 1,
      cars: [],
    });
  },

  loadMoreCars: async () => {
    const { page } = get();
    const nextPage = page + 1;

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

    localStorage.setItem('favorites', JSON.stringify(updated));

    set({ favorites: updated });
  },

  isFavorite: (carId: string) => {
    return get().favorites.includes(carId);
  },

  loadFavorites: () => {
    const stored = localStorage.getItem('favorites');

    if (!stored) return;

    try {
      const parsed: string[] = JSON.parse(stored);

      if (Array.isArray(parsed)) {
        set({ favorites: parsed });
      }
    } catch {
      set({ favorites: [] });
    }
  },
}));
