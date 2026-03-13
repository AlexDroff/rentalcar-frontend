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

const formatNumber = (value: string) => {
  const num = value.replace(/,/g, '');
  if (!num) return '';
  return Number(num).toLocaleString('en-US');
};

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
    const raw = e.target.value.replace(/,/g, '');

    setFilters((prev) => ({
      ...prev,
      minMileage: raw,
    }));
  };

  const handleMaxMileageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/,/g, '');

    setFilters((prev) => ({
      ...prev,
      maxMileage: raw,
    }));
  };

  return (
    <div className={styles.filters}>
      <div className={styles.form}>
        {/* BRAND */}
        <div className={styles.group}>
          <label htmlFor="brand-select" className={styles.label}>
            Car brand
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

        {/* PRICE */}
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

            {[30, 40, 50, 60, 70, 80].map((price) => {
              const priceStr = String(price);

              return (
                <option key={price} value={priceStr}>
                  {filters.rentalPrice === priceStr ? `To $${price}` : price}
                </option>
              );
            })}
          </select>
        </div>

        {/* MILEAGE */}
        <div className={styles.group}>
          <label className={styles.label}>Car mileage / km</label>

          <div className={styles.mileage}>
            <input
              type="text"
              placeholder="From"
              value={filters.minMileage ? formatNumber(filters.minMileage) : ''}
              onChange={handleMinMileageChange}
              className={styles.mileageInput}
            />

            <input
              type="text"
              placeholder="To"
              value={filters.maxMileage ? formatNumber(filters.maxMileage) : ''}
              onChange={handleMaxMileageChange}
              className={styles.mileageInput}
            />
          </div>
        </div>

        {/* BUTTON */}
        <div className={styles.actions}>
          <Button variant="primary" size="small">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};
