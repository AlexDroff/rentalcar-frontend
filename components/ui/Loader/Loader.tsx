import styles from './Loader.module.css';

interface LoaderProps {
  fullScreen?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const Loader = ({
  fullScreen = false,
  size = 'medium',
}: LoaderProps) => {
  const containerClass = fullScreen ? styles.fullScreen : styles.container;

  const spinnerClass = [styles.spinner, styles[size]].join(' ');

  return (
    <div className={containerClass}>
      <div className={spinnerClass} />
    </div>
  );
};
