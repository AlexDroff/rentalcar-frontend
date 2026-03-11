'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/Input/Input';
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

  const handleReset = () => {
    const empty: CarsFilters = {};

    setFilters(empty);

    onFilter(empty);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.form}>
        <div className={styles.group}>
          <label htmlFor="brand-select" className={styles.label}>
            Brand
          </label>

          <select
            id="brand-select"
            value={filters.brand || ''}
            onChange={handleBrandChange}
            className={styles.select}
          >
            <option value="">All Brands</option>

            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.group}>
          <label htmlFor="price-select" className={styles.label}>
            Price
          </label>

          <select
            id="price-select"
            value={filters.rentalPrice || ''}
            onChange={handlePriceChange}
            className={styles.select}
          >
            <option value="">Any Price</option>

            <option value="30">Up to 30</option>
            <option value="40">Up to 40</option>
            <option value="50">Up to 50</option>
            <option value="60">Up to 60</option>
            <option value="70">Up to 70</option>
            <option value="80">Up to 80</option>
          </select>
        </div>

        <div className={styles.group}>
          <Input
            type="number"
            placeholder="Min Mileage"
            value={filters.minMileage || ''}
            onChange={handleMinMileageChange}
          />
        </div>

        <div className={styles.group}>
          <Input
            type="number"
            placeholder="Max Mileage"
            value={filters.maxMileage || ''}
            onChange={handleMaxMileageChange}
          />
        </div>

        <div className={styles.actions}>
          <Button
            type="button"
            variant="outlined"
            fullWidth
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};
