'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CarFilters } from '@/components/catalog/CarFilters/CarFilters';
import { CarList } from '@/components/catalog/CarList/CarList';
import { LoadMoreButton } from '@/components/catalog/LoadMoreButton/LoadMoreButton';
import { ErrorState } from '@/components/ui/ErrorState/ErrorState';
import { carsService } from '@/lib/api/cars.service';
import type { Car, CarsFilters } from '@/types/car';

const ITEMS_PER_PAGE = 12;

export default function CatalogPageClient() {
  const [cars, setCars] = useState<Car[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [filters, setFilters] = useState<CarsFilters>({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef(0);

  const resetCatalogState = useCallback(() => {
    // Clear the current list and restart pagination before a fresh query.
    setCars([]);
    setPage(1);
    setTotalPages(1);
  }, []);

  const fetchCatalogCars = useCallback(
    async (nextFilters: CarsFilters, pageNum: number, replaceCars: boolean) => {
      const requestId = ++requestIdRef.current;

      try {
        setLoading(true);
        setError(null);
        // Keep the active query in state immediately so "Load more" always uses
        // the latest filters after search/reset.
        setFilters(nextFilters);

        const response = await carsService.getCars(
          nextFilters,
          pageNum,
          ITEMS_PER_PAGE
        );

        if (requestId !== requestIdRef.current) {
          return;
        }

        setCars((prev) =>
          replaceCars ? response.cars : [...prev, ...response.cars]
        );
        // Root cause: pagination state was tied to async response values while
        // "Load more" derives the next request from React state. Advancing the
        // page from the previous local value keeps the UI and the request flow
        // in sync after search/reset and avoids stale page state.
        setPage((prev) => (replaceCars ? 1 : prev + 1));
        setTotalPages(response.totalPages);
      } catch (fetchError) {
        if (requestId !== requestIdRef.current) {
          return;
        }

        setError(
          fetchError instanceof Error
            ? fetchError.message
            : 'Failed to fetch cars'
        );
      } finally {
        if (requestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    },
    []
  );

  const fetchBrands = useCallback(async () => {
    try {
      const response = await carsService.getBrands();
      setBrands(response);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error ? fetchError.message : 'Failed to fetch brands'
      );
    }
  }, []);

  const handleSearch = useCallback(
    async (nextFilters: CarsFilters) => {
      // A new search must restart from page 1 and replace the current results.
      resetCatalogState();
      await fetchCatalogCars(nextFilters, 1, true);
    },
    [fetchCatalogCars, resetCatalogState]
  );

  const handleReset = useCallback(async () => {
    // Reset returns the catalog to the default dataset and restarts pagination.
    resetCatalogState();
    await fetchCatalogCars({}, 1, true);
  }, [fetchCatalogCars, resetCatalogState]);

  const handleLoadMore = useCallback(async () => {
    if (loading || page >= totalPages) {
      return;
    }

    const nextPage = page + 1;

    // Pagination should request the next page for the active filters and append
    // the new results instead of replacing the current list.
    await fetchCatalogCars(filters, nextPage, false);
  }, [fetchCatalogCars, filters, loading, page, totalPages]);

  useEffect(() => {
    fetchBrands();
    fetchCatalogCars({}, 1, true);
  }, [fetchBrands, fetchCatalogCars]);

  return (
    <div className="container catalogPage">
      <CarFilters
        brands={brands}
        onSearch={handleSearch}
        onReset={handleReset}
      />
 
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
        onLoadMore={handleLoadMore}
        isVisible={page < totalPages}
        isLoading={loading && cars.length > 0}
      />
    </div>
  );
}
