'use client';

import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import buttonStyles from '@/components/ui/Button/Button.module.css';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <div className="container">
          <div className={styles.content}>
            <h1 className={styles.title}>Find Your Perfect Rental Car</h1>

            <p className={styles.subtitle}>
              Browse our wide selection of premium vehicles and book your ideal
              car today
            </p>

            <Link
              href={ROUTES.CATALOG}
              className={`${buttonStyles.button} ${buttonStyles.primary} ${buttonStyles.medium}`}
            >
              View Catalog
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
