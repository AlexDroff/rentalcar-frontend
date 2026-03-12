'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { useDebounce } from '@/hooks/useDebounce';
import type { CarsFilters } from '@/types/car';
import styles from './CarFilters.module.css';

interface CarFiltersProps {
  brands: string[];
  onFilter: (filters: CarsFilters) => void;
}

export const CarFilters: React.FC<CarFiltersProps> = ({ brands, onFilter }) => {
  const [filters, setFilters] = useState<CarsFilters>({});

  const debouncedFilters = useDebounce(filters);

  useEffect(() => {
    onFilter(debouncedFilters);
  }, [debouncedFilters, onFilter]);

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value || undefined;

    setFilters((prev) => ({
      ...prev,
      brand: value,
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value || undefined;

    setFilters((prev) => ({
      ...prev,
      rentalPrice: value,
    }));
  };

  const handleMinMileageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || undefined;

    setFilters((prev) => ({
      ...prev,
      minMileage: value,
    }));
  };

  const handleMaxMileageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || undefined;

    setFilters((prev) => ({
      ...prev,
      maxMileage: value,
    }));
  };

  return (
    <div className={styles.filters}>
      {' '}
      <div className={styles.form}>
        {' '}
        <div className={styles.group}>
          {' '}
          <label htmlFor="brand-select" className={styles.label}>
            Car brand{' '}
          </label>
          <select
            id="brand-select"
            value={filters.brand || ''}
            onChange={handleBrandChange}
            className={styles.select}
          >
            <option value="">Choose a brand</option>

            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.group}>
          <label htmlFor="price-select" className={styles.label}>
            Price / 1 hour
          </label>

          <select
            id="price-select"
            value={filters.rentalPrice || ''}
            onChange={handlePriceChange}
            className={styles.select}
          >
            <option value="">Choose a price</option>

            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="60">60</option>
            <option value="70">70</option>
            <option value="80">80</option>
          </select>
        </div>
        <div className={styles.group}>
          <label className={styles.label}>Car mileage / km</label>

          <div className={styles.mileage}>
            <input
              type="number"
              placeholder="From"
              value={filters.minMileage || ''}
              onChange={handleMinMileageChange}
              className={styles.mileageInput}
            />

            <input
              type="number"
              placeholder="To"
              value={filters.maxMileage || ''}
              onChange={handleMaxMileageChange}
              className={styles.mileageInput}
            />
          </div>
        </div>
        <div className={styles.actions}>
          <Button variant="primary">Search</Button>
        </div>
      </div>
    </div>
  );
};
