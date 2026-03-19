'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { useFavoritesStore } from '@/lib/store/favorites.store';
import { formatMileage, parseAddress } from '@/utils/format';
import { getSafeImage } from '@/utils/image';
import type { Car } from '@/types/car';
import buttonStyles from '@/components/ui/Button/Button.module.css';
import styles from './CarCard.module.css';

interface CarCardProps {
  car: Car;
  isLcpCandidate?: boolean;
}

export const CarCard: React.FC<CarCardProps> = ({
  car,
  isLcpCandidate = false,
}) => {
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const favorite = useFavoritesStore((state) => state.isFavorite(car.id));

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
          // Root cause: the first visible catalog image can become the page LCP,
          // but it was still using the default lazy behavior. Load only that
          // above-the-fold image eagerly and keep the rest lazy.
          loading={isLcpCandidate ? 'eager' : 'lazy'}
          // The card image uses `fill`, so `sizes` must describe the grid width
          // for each breakpoint. This lets Next.js choose an appropriately sized
          // image instead of assuming a full-viewport width.
          sizes="(max-width: 599px) 100vw, (max-width: 899px) calc((100vw - 24px) / 2), (max-width: 1183px) calc((100vw - 48px) / 3), calc((100vw - 72px) / 4)"
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
