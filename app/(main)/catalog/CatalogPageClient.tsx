'use client';

import { useEffect } from 'react';
import { CarFilters } from '@/components/catalog/CarFilters/CarFilters';
import { CarList } from '@/components/catalog/CarList/CarList';
import { LoadMoreButton } from '@/components/catalog/LoadMoreButton/LoadMoreButton';
import { useCarsStore } from '@/lib/store/cars.store';
import type { CarsFilters } from '@/types/car';

export default function CatalogPageClient() {
  const cars = useCarsStore((state) => state.cars);
  const loading = useCarsStore((state) => state.loading);
  const page = useCarsStore((state) => state.page);
  const totalPages = useCarsStore((state) => state.totalPages);
  const brands = useCarsStore((state) => state.brands);

  const fetchBrands = useCarsStore((state) => state.fetchBrands);
  const loadFavorites = useCarsStore((state) => state.loadFavorites);

  const loadMoreCars = useCarsStore((state) => state.loadMoreCars);
  const setFilters = useCarsStore((state) => state.setFilters);
  const error = useCarsStore((state) => state.error);

  const handleFilter = (filters: CarsFilters) => {
    setFilters(filters);
  };

  useEffect(() => {
    setFilters({});
    fetchBrands();
    loadFavorites();
  }, [fetchBrands, loadFavorites, setFilters]);

  return (
    <div className="container catalogPage">
      <CarFilters brands={brands} onFilter={handleFilter} />

      {error && <div className="error">{error}</div>}

      <CarList cars={cars} loading={loading && cars.length === 0} />

      <LoadMoreButton
        onLoadMore={loadMoreCars}
        isVisible={page < totalPages}
        isLoading={loading && cars.length > 0}
      />
    </div>
  );
}
