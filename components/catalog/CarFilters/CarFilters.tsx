'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
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
  const [openDropdown, setOpenDropdown] = useState<'brand' | 'price' | null>(
    null
  );
  const formRef = useRef<HTMLFormElement>(null);
  const priceOptions = useMemo(() => [30, 40, 50, 60, 70, 80], []);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

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

  const handleBrandSelect = (value?: string) => {
    setFilters((prev) => ({
      ...prev,
      brand: value,
    }));
    setOpenDropdown(null);
  };

  const handlePriceSelect = (value?: string) => {
    setFilters((prev) => ({
      ...prev,
      rentalPrice: value,
    }));
    setOpenDropdown(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({});
    setOpenDropdown(null);
    onFilter({});
  };

  return (
    <section className={styles.filters} aria-label="Catalog filters">
      <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
        <div className={styles.group}>
          <label htmlFor="brand-trigger" className={styles.label}>
            Car brand
          </label>

          <div className={styles.dropdown}>
            <button
              id="brand-trigger"
              type="button"
              className={styles.trigger}
              onClick={() =>
                setOpenDropdown((prev) => (prev === 'brand' ? null : 'brand'))
              }
              aria-controls="brand-options"
            >
              <span
                className={
                  filters.brand ? styles.triggerValue : styles.placeholder
                }
              >
                {filters.brand || 'Choose a brand'}
              </span>

              <svg
                className={styles.selectIcon}
                aria-hidden="true"
                focusable="false"
              >
                <use
                  href={`/images/sprite.svg#${
                    openDropdown === 'brand'
                      ? 'icon-arrow_up'
                      : 'icon-arrow_down'
                  }`}
                />
              </svg>
            </button>

            {openDropdown === 'brand' && (
              <ul
                id="brand-options"
                className={styles.options}
                aria-label="Car brand options"
              >
                {brands.map((brand) => (
                  <li key={brand}>
                    <button
                      type="button"
                      className={`${styles.option} ${
                        filters.brand === brand ? styles.optionActive : ''
                      }`}
                      onClick={() => handleBrandSelect(brand)}
                    >
                      {brand}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className={styles.group}>
          <label htmlFor="price-trigger" className={styles.label}>
            Price / 1 hour
          </label>

          <div className={styles.dropdown}>
            <button
              id="price-trigger"
              type="button"
              className={styles.trigger}
              onClick={() =>
                setOpenDropdown((prev) => (prev === 'price' ? null : 'price'))
              }
              aria-controls="price-options"
            >
              <span
                className={
                  filters.rentalPrice ? styles.triggerValue : styles.placeholder
                }
              >
                {filters.rentalPrice
                  ? `To $${filters.rentalPrice}`
                  : 'Choose a price'}
              </span>

              <svg
                className={styles.selectIcon}
                aria-hidden="true"
                focusable="false"
              >
                <use
                  href={`/images/sprite.svg#${
                    openDropdown === 'price'
                      ? 'icon-arrow_up'
                      : 'icon-arrow_down'
                  }`}
                />
              </svg>
            </button>

            {openDropdown === 'price' && (
              <ul
                id="price-options"
                className={styles.options}
                aria-label="Price options"
              >
                {priceOptions.map((price) => {
                  const priceStr = String(price);

                  return (
                    <li key={price}>
                      <button
                        type="button"
                        className={`${styles.option} ${
                          filters.rentalPrice === priceStr
                            ? styles.optionActive
                            : ''
                        }`}
                        onClick={() => handlePriceSelect(priceStr)}
                      >
                        {price}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <div className={styles.group}>
          <span className={styles.label}>Car mileage / km</span>

          <div className={styles.mileage}>
            <label htmlFor="min-mileage" className={styles.visuallyHidden}>
              Minimum mileage
            </label>
            <div className={styles.mileageField}>
              <span className={styles.mileagePrefix}>From</span>
              <input
                id="min-mileage"
                type="text"
                inputMode="numeric"
                value={
                  filters.minMileage ? formatNumber(filters.minMileage) : ''
                }
                onChange={handleMinMileageChange}
                className={styles.mileageInput}
              />
            </div>

            <label htmlFor="max-mileage" className={styles.visuallyHidden}>
              Maximum mileage
            </label>
            <div className={styles.mileageField}>
              <span className={styles.mileagePrefix}>To</span>
              <input
                id="max-mileage"
                type="text"
                inputMode="numeric"
                value={
                  filters.maxMileage ? formatNumber(filters.maxMileage) : ''
                }
                onChange={handleMaxMileageChange}
                className={styles.mileageInput}
              />
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Button type="submit" variant="primary" size="small">
            Search
          </Button>
          {/* Added: reset button clears all filters and reuses existing filter flow */}
          <Button
            type="button"
            variant="outlined"
            size="small"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </form>
    </section>
  );
};
