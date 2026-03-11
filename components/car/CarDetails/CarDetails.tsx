import Image from 'next/image';
import type { Car } from '@/types/car';
import { formatMileage, parseAddress } from '@/utils/format';
import { getSafeImage } from '@/utils/image';
import styles from './CarDetails.module.css';

interface CarDetailsProps {
  car: Car;
}

export const CarDetails: React.FC<CarDetailsProps> = ({ car }) => {
  const { city, country } = parseAddress(car.address);

  const mileage = formatMileage(car.mileage);

  const imageSrc = getSafeImage(car.img);

  return (
    <div className={styles.details}>
      <div className={styles.imageContainer}>
        <Image
          src={imageSrc}
          alt={`${car.brand} ${car.model}`}
          width={640}
          height={420}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {car.brand} {car.model}
          </h1>

          <span className={styles.price}>€ {car.rentalPrice} / day</span>
        </div>

        <div className={styles.basicInfo}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Year</span>
            <span className={styles.value}>{car.year}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.label}>Type</span>
            <span className={styles.value}>{car.type}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.label}>Mileage</span>
            <span className={styles.value}>{mileage} km</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.label}>Location</span>
            <span className={styles.value}>
              {city}, {country}
            </span>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Description</h3>
          <p className={styles.description}>{car.description}</p>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Engine & Fuel</h3>

          <div className={styles.specs}>
            <div className={styles.spec}>
              <span className={styles.specLabel}>Engine Size</span>
              <span>{car.engineSize}</span>
            </div>

            <div className={styles.spec}>
              <span className={styles.specLabel}>Fuel Consumption</span>
              <span>{car.fuelConsumption}</span>
            </div>
          </div>
        </div>

        {car.accessories?.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Accessories</h3>

            <ul className={styles.list}>
              {car.accessories.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {car.functionalities?.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Functionalities</h3>

            <ul className={styles.list}>
              {car.functionalities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {car.rentalConditions?.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Rental Conditions</h3>

            <ul className={styles.list}>
              {car.rentalConditions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {car.rentalCompany && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Rental Company</h3>

            <p className={styles.company}>{car.rentalCompany}</p>
          </div>
        )}
      </div>
    </div>
  );
};
