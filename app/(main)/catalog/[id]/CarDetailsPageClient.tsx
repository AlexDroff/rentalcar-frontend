'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CarDetails } from '@/components/car/CarDetails/CarDetails';
import { ErrorState } from '@/components/ui/ErrorState/ErrorState';
import { BackButton } from '@/components/ui/BackButton/BackButton';
import { Loader } from '@/components/ui/Loader/Loader';
import { useCarDetailsStore } from '@/lib/store/car-details.store';
import styles from './page.module.css';

export default function CarDetailsPageClient() {
  const params = useParams();
  const carId = params.id as string;

  const selectedCar = useCarDetailsStore((state) => state.selectedCar);
  const loading = useCarDetailsStore((state) => state.loading);
  const error = useCarDetailsStore((state) => state.error);
  const fetchCarById = useCarDetailsStore((state) => state.fetchCarById);
  const reset = useCarDetailsStore((state) => state.reset);

  useEffect(() => {
    if (carId) {
      fetchCarById(carId);
    }

    return () => {
      reset();
    };
  }, [carId, fetchCarById, reset]);

  if (loading) {
    return <Loader fullScreen size="large" />;
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <BackButton />
          <ErrorState
            title="Unable to load car details"
            message={error}
          />
        </div>
      </div>
    );
  }

  if (!selectedCar) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <BackButton />
        <CarDetails car={selectedCar} />
      </div>
    </div>
  );
}
