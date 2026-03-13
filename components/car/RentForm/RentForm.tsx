'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import styles from './RentForm.module.css';

interface RentFormData {
  name: string;
  email: string;
  bookingDate: string;
  comment: string;
}

interface RentFormProps {
  carId: string;
}

export const RentForm = ({ carId }: RentFormProps) => {
  const [formData, setFormData] = useState<RentFormData>({
    name: '',
    email: '',
    bookingDate: '',
    comment: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/book-car', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          carId,
          ...formData,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to send booking');
      }

      console.log('Booking request sent');

      setFormData({
        name: '',
        email: '',
        bookingDate: '',
        comment: '',
      });
    } catch (error) {
      console.error('Booking error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.header}>
        <h3 className={styles.title}>Book your car now</h3>
        <p className={styles.subtitle}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <Input
        type="text"
        name="name"
        placeholder="Name*"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <Input
        type="email"
        name="email"
        placeholder="Email*"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <div className={styles.dateWrapper}>
        {!formData.bookingDate && (
          <span className={styles.datePlaceholder}>Booking date</span>
        )}

        <label htmlFor="bookingDate" className={styles.visuallyHidden}>
          Booking date
        </label>

        <input
          id="bookingDate"
          type="date"
          name="bookingDate"
          value={formData.bookingDate}
          onChange={handleChange}
          className={styles.dateInput}
          required
        />
      </div>

      <textarea
        name="comment"
        placeholder="Comment"
        value={formData.comment}
        onChange={handleChange}
        className={styles.textarea}
      />

      <div className={styles.buttonWrapper}>
        <Button type="submit" variant="primary" size="small">
          Send
        </Button>
      </div>
    </form>
  );
};
