'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import styles from './Header.module.css';

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className="container">
        <Link href={ROUTES.HOME} aria-label="RentalCar home page">
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
              <Link
                href={ROUTES.HOME}
                className={styles.navigationLink}
                aria-current={pathname === ROUTES.HOME ? 'page' : undefined}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href={ROUTES.CATALOG}
                className={styles.navigationLink}
                aria-current={
                  pathname.startsWith(ROUTES.CATALOG) ? 'page' : undefined
                }
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
