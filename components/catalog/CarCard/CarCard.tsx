'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { useCarsStore } from '@/lib/store/cars.store';
import { formatMileage, parseAddress } from '@/utils/format';
import { getSafeImage } from '@/utils/image';
import type { Car } from '@/types/car';
import buttonStyles from '@/components/ui/Button/Button.module.css';
import styles from './CarCard.module.css';

interface CarCardProps {
  car: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const toggleFavorite = useCarsStore((state) => state.toggleFavorite);
  const favorite = useCarsStore((state) => state.favorites.includes(car.id));

  const { city, country } = parseAddress(car.address);
  const mileage = formatMileage(car.mileage);
  const imageSrc = getSafeImage(car.img);

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageSrc}
          alt={`${car.brand} ${car.model}`}
          fill
          className={styles.image}
        />

        <button
          type="button"
          onClick={() => toggleFavorite(car.id)}
          className={styles.favorite}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          {...{ 'aria-pressed': favorite ? 'true' : 'false' }}
        >
          {favorite ? (
            <svg className={styles.favoriteIconFilled}>
              <use href="/images/sprite.svg#icon-favorite_active" />
            </svg>
          ) : (
            <svg className={styles.favoriteIconOutlined}>
              <use href="/images/sprite.svg#icon-favorite_nonactive" />
            </svg>
          )}
        </button>
      </div>

      <div className={styles.info}>
        <div className={styles.row}>
          <h3 className={styles.title}>
            {car.brand} <span className={styles.model}>{car.model}</span>,{' '}
            {car.year}
          </h3>

          <span className={styles.price}>${car.rentalPrice}</span>
        </div>

        <p className={styles.meta}>
          <span>{city}</span>
          <span>{country}</span>
          <span>{car.rentalCompany}</span>
        </p>

        <p className={styles.meta}>
          <span>{car.type.toUpperCase()}</span>
          <span>{mileage} km</span>
        </p>

        <Link
          href={ROUTES.CAR_DETAILS(car.id)}
          className={`${buttonStyles.button} ${buttonStyles.primary} ${buttonStyles.large} ${buttonStyles.fullWidth}`}
        >
          Read more
        </Link>
      </div>
    </article>
  );
};
