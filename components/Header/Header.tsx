import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/constants/routes';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <Link href={ROUTES.HOME}>
          <Image
            src="/images/logo.svg"
            alt="RentalCar logo"
            width={104}
            height={16}
            priority
          />
        </Link>
        <nav aria-label="Main navigation">
          <ul className={styles.navigation}>
            <li>
              <Link href={ROUTES.HOME} className={styles.navigationLink}>
                Home
              </Link>
            </li>

            <li>
              <Link href={ROUTES.CATALOG} className={styles.navigationLink}>
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
