'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import { ROUTES } from '@/constants/routes';
import { useCarsStore } from '@/lib/store/cars.store';
import { formatMileage, parseAddress } from '@/utils/format';
import { getSafeImage } from '@/utils/image';
import type { Car } from '@/types/car';
import styles from './CarCard.module.css';

interface CarCardProps {
  car: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const toggleFavorite = useCarsStore((state) => state.toggleFavorite);
  const isFavorite = useCarsStore((state) => state.isFavorite);

  const favorite = isFavorite(car.id);

  const { city, country } = parseAddress(car.address);
  const mileage = formatMileage(car.mileage);
  const imageSrc = getSafeImage(car.img);

  return (
    <div className={styles.card}>
      <button
        type="button"
        onClick={() => toggleFavorite(car.id)}
        className={styles.favorite}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorite ? '❤️' : '🤍'}
      </button>

      <div className={styles.imageWrapper}>
        <Image
          src={imageSrc}
          alt={`${car.brand} ${car.model}`}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>
          {car.brand} {car.model}
        </h3>

        <p className={styles.meta}>
          {car.year} • {car.type} • {city}, {country} • Mileage {mileage} km
        </p>

        <Link href={ROUTES.CAR_DETAILS(car.id)}>
          <Button variant="primary" size="small">
            Read More
          </Button>
        </Link>
      </div>
    </div>
  );
};
