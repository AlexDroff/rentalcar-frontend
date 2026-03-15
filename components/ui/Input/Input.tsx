import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hideLabel?: boolean;
}

export const Input = ({
  label,
  error,
  className,
  id,
  hideLabel = false,
  ...props
}: InputProps) => {
  const classes = [styles.input, error ? styles.error : '', className ?? '']
    .filter(Boolean)
    .join(' ');

  const errorId = id && error ? `${id}-error` : undefined;

  return (
    <div className={styles.wrapper}>
      {label && (
        <label
          className={hideLabel ? styles.visuallyHidden : styles.label}
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={classes}
        aria-describedby={errorId}
        {...(error ? { 'aria-invalid': 'true' } : {})}
        {...props}
      />

      {error && (
        <span
          id={errorId}
          className={styles.errorMessage}
          role="alert"
          aria-live="polite"
        >
          {error}
        </span>
      )}
    </div>
  );
};
