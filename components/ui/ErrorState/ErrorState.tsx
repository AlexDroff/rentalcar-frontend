import styles from './ErrorState.module.css';

interface ErrorStateProps {
  title?: string;
  message: string;
}

export const ErrorState = ({
  title = 'Something went wrong',
  message,
}: ErrorStateProps) => {
  return (
    <div className={styles.container} role="alert">
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
    </div>
  );
};
