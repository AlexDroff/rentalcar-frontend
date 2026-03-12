import styles from './Icon.module.css';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export const Icon = ({ name, size = 16, className }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      className={[styles.icon, className].filter(Boolean).join(' ')}
    >
      <use href={`/images/sprite.svg#${name}`} />{' '}
    </svg>
  );
};
