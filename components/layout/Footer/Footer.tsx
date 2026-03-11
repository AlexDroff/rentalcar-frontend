import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <p>&copy; {currentYear} CarRental. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
