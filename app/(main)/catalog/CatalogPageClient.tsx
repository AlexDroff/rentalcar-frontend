'use client';

import { useEffect, useRef } from 'react';
import { CarFilters } from '@/components/catalog/CarFilters/CarFilters';
import { CarList } from '@/components/catalog/CarList/CarList';
import { LoadMoreButton } from '@/components/catalog/LoadMoreButton/LoadMoreButton';
import { useCars } from '@/hooks/useCars';

export default function CatalogPageClient() {
  const hasFetched = useRef(false);

  const {
    cars = [],
    loading,
    page,
    totalPages,
    brands,
    fetchCars,
    loadMoreCars,
    setFilters,
    error,
  } = useCars();

  useEffect(() => {
    if (!hasFetched.current) {
      fetchCars();
      hasFetched.current = true;
    }
  }, [fetchCars]);

  return (
    <div className="container">
      <h1 className="pageTitle">Our Cars</h1>

      <CarFilters brands={brands} onFilter={setFilters} />

      {error && <div className="error">{error}</div>}

      {/* Skeleton loading */}
      <CarList cars={cars} loading={loading && cars.length === 0} />

      {/* Load more */}
      <LoadMoreButton
        onLoadMore={loadMoreCars}
        isVisible={page < totalPages}
        isLoading={loading && cars.length > 0}
      />
    </div>
  );
}
