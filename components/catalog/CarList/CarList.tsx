'use client';

import { CarCard } from '../CarCard/CarCard';
import { SkeletonCard } from '../SkeletonCard/SkeletonCard';
import type { Car } from '@/types/car';
import styles from './CarList.module.css';

interface CarListProps {
  cars: Car[];
  loading?: boolean;
}

export const CarList: React.FC<CarListProps> = ({ cars, loading = false }) => {
  if (loading && cars.length === 0) {
    return (
      <ul className={styles.grid} aria-label="Cars loading">
        {Array.from({ length: 8 }).map((_, index) => (
          <li key={index} className={styles.item}>
            <SkeletonCard />
          </li>
        ))}
      </ul>
    );
  }

  if (cars.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No cars found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <ul className={styles.grid} aria-label="Cars catalog">
      {cars.map((car, index) => (
        <li key={car.id} className={styles.item}>
          <CarCard car={car} isLcpCandidate={index === 0} />
        </li>
      ))}
    </ul>
  );
};
