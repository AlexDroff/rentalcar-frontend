import { create } from 'zustand';
import type { Car } from '@/types/car';
import { carsService } from '@/lib/api/cars.service';

interface CarDetailsStore {
  selectedCar: Car | null;
  loading: boolean;
  error: string | null;
  fetchCarById: (id: string) => Promise<void>;
  reset: () => void;
}

export const useCarDetailsStore = create<CarDetailsStore>((set) => ({
  selectedCar: null,
  loading: false,
  error: null,

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
        selectedCar: null,
        loading: false,
      });
    }
  },

  reset: () => {
    set({
      selectedCar: null,
      loading: false,
      error: null,
    });
  },
}));
