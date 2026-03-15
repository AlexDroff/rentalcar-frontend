import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import styles from './BackButton.module.css';

export const BackButton: React.FC = () => {
  return (
    <Link href={ROUTES.CATALOG} className={styles.back}>
      <svg
        className={styles.backIcon}
        aria-hidden="true"
        focusable="false"
      >
        <use href="/images/sprite.svg#icon-arrow_left" />
      </svg>
      Back to catalog
    </Link>
  );
};
