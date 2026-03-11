import styles from './SkeletonCard.module.css';

export const SkeletonCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.image}></div>
      <div className={styles.title}></div>
      <div className={styles.meta}></div>
    </div>
  );
};
