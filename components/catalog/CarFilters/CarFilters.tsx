'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
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
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

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
    const numeric = raw.replace(/\D/g, '');

    setFilters((prev) => ({
      ...prev,
      minMileage: numeric,
    }));
  };

  const handleMaxMileageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/,/g, '');
    const numeric = raw.replace(/\D/g, '');

    setFilters((prev) => ({
      ...prev,
      maxMileage: numeric,
    }));
  };

  const handleSearch = () => {
    onFilter(filters);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <section className={styles.filters} aria-label="Catalog filters">
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* BRAND */}
        <div className={styles.group}>
          <label htmlFor="brand-select" className={styles.label}>
            Car brand
          </label>

          <div className={styles.selectWrapper}>
            <select
              id="brand-select"
              value={filters.brand || ''}
              onChange={handleBrandChange}
              onClick={() => setIsBrandOpen((prev) => !prev)}
              onBlur={() => setIsBrandOpen(false)}
              className={styles.select}
            >
              <option value="">Choose a brand</option>

              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>

            <svg
              className={styles.selectIcon}
              aria-hidden="true"
              focusable="false"
            >
              <use
                href={`/images/sprite.svg#${
                  isBrandOpen ? 'icon-arrow_up' : 'icon-arrow_down'
                }`}
              />
            </svg>
          </div>
        </div>

        {/* PRICE */}
        <div className={styles.group}>
          <label htmlFor="price-select" className={styles.label}>
            Price / 1 hour
          </label>

          <div className={styles.selectWrapper}>
            <select
              id="price-select"
              value={filters.rentalPrice || ''}
              onChange={handlePriceChange}
              onClick={() => setIsPriceOpen((prev) => !prev)}
              onBlur={() => setIsPriceOpen(false)}
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

            <svg
              className={styles.selectIcon}
              aria-hidden="true"
              focusable="false"
            >
              <use
                href={`/images/sprite.svg#${
                  isPriceOpen ? 'icon-arrow_up' : 'icon-arrow_down'
                }`}
              />
            </svg>
          </div>
        </div>

        {/* MILEAGE */}
        <div className={styles.group}>
          <span className={styles.label}>Car mileage / km</span>

          <div className={styles.mileage}>
            <label htmlFor="min-mileage" className={styles.visuallyHidden}>
              Minimum mileage
            </label>
            <input
              id="min-mileage"
              type="text"
              placeholder="From"
              value={filters.minMileage ? formatNumber(filters.minMileage) : ''}
              onChange={handleMinMileageChange}
              className={styles.mileageInput}
            />

            <label htmlFor="max-mileage" className={styles.visuallyHidden}>
              Maximum mileage
            </label>
            <input
              id="max-mileage"
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
          <Button type="submit" variant="primary" size="small">
            Search
          </Button>
        </div>
      </form>
    </section>
  );
};
