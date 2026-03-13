'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CarDetails } from '@/components/car/CarDetails/CarDetails';
import { Loader } from '@/components/ui/Loader/Loader';
import { useCarsStore } from '@/lib/store/cars.store';
import styles from './page.module.css';

export default function CarDetailsPageClient() {
  const params = useParams();
  const carId = params.id as string;

  const selectedCar = useCarsStore((state) => state.selectedCar);
  const loading = useCarsStore((state) => state.loading);
  const fetchCarById = useCarsStore((state) => state.fetchCarById);

  useEffect(() => {
    if (carId) {
      fetchCarById(carId);
    }
  }, [carId, fetchCarById]);

  if (loading || !selectedCar) {
    return <Loader fullScreen size="large" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <CarDetails car={selectedCar} />
      </div>
    </div>
  );
}
