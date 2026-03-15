'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import styles from './RentForm.module.css';

interface RentFormData {
  name: string;
  email: string;
  bookingDate: string;
  comment: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  bookingDate?: string;
}

type FormField = keyof RentFormData;

const getLocalDateString = () => {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - timezoneOffset).toISOString().split('T')[0];
};

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
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = getLocalDateString();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const fieldName = e.target.name as FormField;
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [fieldName]:
        fieldName === 'name' ||
        fieldName === 'email' ||
        fieldName === 'bookingDate'
          ? undefined
          : prev[fieldName as keyof FormErrors],
    }));

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (formData.bookingDate && formData.bookingDate < today) {
      newErrors.bookingDate = 'Booking date cannot be in the past';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

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
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;

        throw new Error(data?.error || 'Failed to send booking');
      }

      setFormData({
        name: '',
        email: '',
        bookingDate: '',
        comment: '',
      });

      toast.success('Your booking request has been sent.');
    } catch (error) {
      console.error('Booking request failed:', error);
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to send booking request';

      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <header className={styles.header}>
        <h3 className={styles.title}>Book your car now</h3>
        <p className={styles.subtitle}>
          Stay connected! We are always ready to help you.
        </p>
      </header>

      <Input
        type="text"
        id="booking-name"
        name="name"
        placeholder="Name*"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        autoComplete="name"
        disabled={isSubmitting}
      />

      <Input
        type="email"
        id="booking-email"
        name="email"
        placeholder="Email*"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        autoComplete="email"
        disabled={isSubmitting}
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
          className={`${styles.dateInput} ${
            formData.bookingDate ? styles.dateInputFilled : ''
          } ${errors.bookingDate ? styles.dateInputError : ''}`}
          aria-describedby={errors.bookingDate ? 'bookingDate-error' : undefined}
          min={today}
          disabled={isSubmitting}
          {...(errors.bookingDate ? { 'aria-invalid': 'true' } : {})}
        />

        {errors.bookingDate && (
          <span
            id="bookingDate-error"
            className={styles.errorMessage}
            role="alert"
            aria-live="polite"
          >
            {errors.bookingDate}
          </span>
        )}
      </div>

      <textarea
        name="comment"
        placeholder="Comment"
        value={formData.comment}
        onChange={handleChange}
        className={styles.textarea}
        disabled={isSubmitting}
      />

      <div className={styles.buttonWrapper}>
        <Button type="submit" variant="primary" size="small" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </form>
  );
};
