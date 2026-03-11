'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/constants/routes';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <Link href={ROUTES.HOME} className={styles.logo}>
          <Image
            src="/images/logo.svg"
            alt="CarRental logo"
            width={120}
            height={40}
            className={styles.logoImage}
            priority
          />
        </Link>

        <nav className={styles.nav}>
          <Link href={ROUTES.HOME} className={styles.navLink}>
            Home
          </Link>

          <Link href={ROUTES.CATALOG} className={styles.navLink}>
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
};
