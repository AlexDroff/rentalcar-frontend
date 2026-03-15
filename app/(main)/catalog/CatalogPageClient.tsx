'use client';

import { useEffect } from 'react';
import { CarFilters } from '@/components/catalog/CarFilters/CarFilters';
import { CarList } from '@/components/catalog/CarList/CarList';
import { LoadMoreButton } from '@/components/catalog/LoadMoreButton/LoadMoreButton';
import { ErrorState } from '@/components/ui/ErrorState/ErrorState';
import { useCarsStore } from '@/lib/store/cars.store';
import type { CarsFilters } from '@/types/car';

export default function CatalogPageClient() {
  const cars = useCarsStore((state) => state.cars);
  const loading = useCarsStore((state) => state.loading);
  const page = useCarsStore((state) => state.page);
  const totalPages = useCarsStore((state) => state.totalPages);
  const brands = useCarsStore((state) => state.brands);

  const fetchBrands = useCarsStore((state) => state.fetchBrands);

  const loadMoreCars = useCarsStore((state) => state.loadMoreCars);
  const setFilters = useCarsStore((state) => state.setFilters);
  const error = useCarsStore((state) => state.error);

  const handleFilter = (filters: CarsFilters) => {
    setFilters(filters);
  };

  useEffect(() => {
    setFilters({});
    fetchBrands();
  }, [fetchBrands, setFilters]);

  return (
    <div className="container catalogPage">
      <CarFilters brands={brands} onFilter={handleFilter} />

      {error && cars.length === 0 && (
        <ErrorState
          title="Unable to load the catalog"
          message={error}
        />
      )}

      {error && cars.length > 0 && (
        <ErrorState
          title="Some content may be outdated"
          message={error}
        />
      )}

      <CarList cars={cars} loading={loading && cars.length === 0} />

      <LoadMoreButton
        onLoadMore={loadMoreCars}
        isVisible={page < totalPages}
        isLoading={loading && cars.length > 0}
      />
    </div>
  );
}
