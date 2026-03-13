import Image from 'next/image';
import type { Car } from '@/types/car';
import { formatMileage, parseAddress } from '@/utils/format';
import { getSafeImage } from '@/utils/image';
import { RentForm } from '../RentForm/RentForm';
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
      <div className={styles.left}>
        <Image
          src={imageSrc}
          alt={`${car.brand} ${car.model}`}
          width={640}
          height={512}
          className={styles.image}
        />

        <RentForm carId={car.id} />
      </div>

      <div className={styles.right}>
        <div className={styles.titleBlock}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>
              {car.brand} <span className={styles.model}>{car.model}</span>,{' '}
              {car.year}
            </h1>

            <span className={styles.id}>
              id: {parseInt(car.id.slice(-6), 16)}
            </span>
          </div>

          <div className={styles.meta}>
            <span className={styles.location}>
              <svg className={styles.locationIcon}>
                <use href="/images/sprite.svg#icon-Location" />
              </svg>
              {city}, {country}
            </span>

            <span>Mileage: {mileage} km</span>
          </div>

          <div className={styles.price}>${car.rentalPrice}</div>

          <p className={styles.description}>{car.description}</p>
        </div>

        <div className={styles.specsBlock}>
          {car.rentalConditions?.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Rental Conditions:</h3>

              <ul className={styles.list}>
                {car.rentalConditions.map((item, index) => (
                  <li key={index} className={styles.checkItem}>
                    <svg className={styles.checkIcon}>
                      <use href="/images/sprite.svg#icon-check-circle" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Car Specifications:</h3>

            <ul className={styles.list}>
              <li className={styles.specItem}>
                <svg className={styles.specIcon}>
                  <use href="/images/sprite.svg#icon-calendar" />
                </svg>
                Year: {car.year}
              </li>

              <li className={styles.specItem}>
                <svg className={styles.specIcon}>
                  <use href="/images/sprite.svg#icon-car" />
                </svg>
                Type: {car.type}
              </li>

              <li className={styles.specItem}>
                <svg className={styles.specIcon}>
                  <use href="/images/sprite.svg#icon-fuel-pump" />
                </svg>
                Fuel Consumption: {car.fuelConsumption}
              </li>

              <li className={styles.specItem}>
                <svg className={styles.specIcon}>
                  <use href="/images/sprite.svg#icon-gear" />
                </svg>
                Engine Size: {car.engineSize}
              </li>
            </ul>
          </div>

          {(car.accessories?.length || car.functionalities?.length) && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                Accessories and functionalities:
              </h3>

              <ul className={styles.list}>
                {car.accessories?.map((item, index) => (
                  <li key={index} className={styles.checkItem}>
                    <svg className={styles.checkIcon}>
                      <use href="/images/sprite.svg#icon-check-circle" />
                    </svg>
                    {item}
                  </li>
                ))}

                {car.functionalities?.map((item, index) => (
                  <li key={`f-${index}`} className={styles.checkItem}>
                    <svg className={styles.checkIcon}>
                      <use href="/images/sprite.svg#icon-check-circle" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
