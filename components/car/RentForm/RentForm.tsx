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

  const [errors, setErrors] = useState<{ email?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'email') {
      if (!validateEmail(value)) {
        setErrors({ email: 'Please enter a valid email address' });
      } else {
        setErrors({});
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    setSubmitted(true);
    setLoading(false);

    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        bookingDate: '',
        comment: '',
      });
      setSubmitted(false);
    }, 3000);
  };

  if (submitted) {
    return (
      <div className={styles.success}>
        <div className={styles.successIcon}>✓</div>

        <h3 className={styles.successTitle}>Booking Submitted!</h3>

        <p className={styles.successMessage}>
          Thank you for your booking request. We will contact you soon to
          confirm your reservation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3 className={styles.title}>Book This Car</h3>

      <Input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        label="Full Name"
        required
      />

      <Input
        type="email"
        name="email"
        placeholder="your@email.com"
        value={formData.email}
        onChange={handleChange}
        label="Email"
        error={errors.email}
        required
      />

      <Input
        type="date"
        name="bookingDate"
        value={formData.bookingDate}
        onChange={handleChange}
        label="Booking Date"
        required
      />

      <div className={styles.formGroup}>
        <label className={styles.label}>Additional Comments</label>

        <textarea
          name="comment"
          placeholder="Any special requests..."
          value={formData.comment}
          onChange={handleChange}
          className={styles.textarea}
          rows={4}
        />
      </div>

      <Button type="submit" variant="primary" fullWidth disabled={loading}>
        {loading ? 'Submitting...' : 'Request Booking'}
      </Button>
    </form>
  );
};
