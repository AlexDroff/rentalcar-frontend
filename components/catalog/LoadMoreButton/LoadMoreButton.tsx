'use client';

import { Button } from '@/components/ui/Button/Button';
import styles from './LoadMoreButton.module.css';
import { Loader } from '@/components/ui/Loader/Loader';

interface LoadMoreButtonProps {
  onLoadMore: () => void;
  isVisible: boolean;
  isLoading: boolean;
}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  onLoadMore,
  isVisible,
  isLoading,
}) => {
  if (!isVisible) return null;

  return (
    <div className={styles.wrapper}>
      <Button
        onClick={onLoadMore}
        disabled={isLoading}
        variant="outlined"
        className={styles.button}
      >
        {isLoading ? <Loader size="small" /> : 'Load more'}
      </Button>
    </div>
  );
};
