'use client';

import { useCallback, useEffect } from 'react';
import { useCarsStore } from '@/lib/store/cars.store';
import type { CarsFilters } from '@/types/car';

export const useCars = () => {
  const cars = useCarsStore((state) => state.cars);
  const filters = useCarsStore((state) => state.filters);
  const loading = useCarsStore((state) => state.loading);
  const page = useCarsStore((state) => state.page);
  const totalPages = useCarsStore((state) => state.totalPages);
  const brands = useCarsStore((state) => state.brands);
  const error = useCarsStore((state) => state.error);

  const fetchCars = useCarsStore((state) => state.fetchCars);
  const fetchBrands = useCarsStore((state) => state.fetchBrands);
  const loadMoreCars = useCarsStore((state) => state.loadMoreCars);
  const setStoreFilters = useCarsStore((state) => state.setFilters);
  const loadFavorites = useCarsStore((state) => state.loadFavorites);

  useEffect(() => {
    fetchBrands();
    loadFavorites();
  }, [fetchBrands, loadFavorites]);

  const setFilters = useCallback(
    async (newFilters: CarsFilters) => {
      setStoreFilters(newFilters);
      await fetchCars(1);
    },
    [setStoreFilters, fetchCars]
  );

  return {
    cars,
    filters,
    loading,
    page,
    totalPages,
    brands,
    error,
    fetchCars,
    loadMoreCars,
    setFilters,
  };
};
