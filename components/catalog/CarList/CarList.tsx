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
  // Skeleton loading
  if (loading && cars.length === 0) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No cars found. Try adjusting your filters.</p>
      </div>
    );
  }

  // Normal render
  return (
    <div className={styles.grid}>
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};
