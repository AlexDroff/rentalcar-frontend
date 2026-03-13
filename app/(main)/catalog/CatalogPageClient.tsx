'use client';

import { useEffect } from 'react';
import { CarFilters } from '@/components/catalog/CarFilters/CarFilters';
import { CarList } from '@/components/catalog/CarList/CarList';
import { LoadMoreButton } from '@/components/catalog/LoadMoreButton/LoadMoreButton';
import { useCarsStore } from '@/lib/store/cars.store';

export default function CatalogPageClient() {
  const cars = useCarsStore((state) => state.cars);
  const loading = useCarsStore((state) => state.loading);
  const page = useCarsStore((state) => state.page);
  const totalPages = useCarsStore((state) => state.totalPages);
  const brands = useCarsStore((state) => state.brands);

  const fetchCars = useCarsStore((state) => state.fetchCars);
  const fetchBrands = useCarsStore((state) => state.fetchBrands);

  const loadMoreCars = useCarsStore((state) => state.loadMoreCars);
  const setFilters = useCarsStore((state) => state.setFilters);
  const error = useCarsStore((state) => state.error);

  useEffect(() => {
    fetchCars(1);
    fetchBrands();
  }, [fetchCars, fetchBrands]);

  return (
    <div className="container">
      <CarFilters brands={brands} onFilter={setFilters} />

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
