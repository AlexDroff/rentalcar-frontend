'use client';

import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import styles from './RentForm.module.css';

interface RentFormData {
  name: string;
  email: string;
  comment: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  bookingRange?: string;
}

type FormField = keyof RentFormData;

const formatDate = (date?: Date) => {
  if (!date) {
    return '';
  }

  const timezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - timezoneOffset).toISOString().split('T')[0];
};

const formatRangeLabel = (range?: DateRange) => {
  if (!range?.from && !range?.to) {
    return 'Booking period';
  }

  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  if (range.from && !range.to) {
    return `${formatter.format(range.from)} - Select end date`;
  }

  if (range.from && range.to) {
    return `${formatter.format(range.from)} - ${formatter.format(range.to)}`;
  }

  return 'Booking period';
};

interface RentFormProps {
  carId: string;
}

export const RentForm = ({ carId }: RentFormProps) => {
  const [formData, setFormData] = useState<RentFormData>({
    name: '',
    email: '',
    comment: '',
  });
  const [range, setRange] = useState<DateRange | undefined>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const calendarTriggerRef = useRef<HTMLButtonElement>(null);
  const calendarDialogRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, []);

  useEffect(() => {
    if (!isCalendarOpen) {
      return;
    }

    calendarDialogRef.current?.focus();
  }, [isCalendarOpen]);

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
        fieldName === 'name' || fieldName === 'email'
          ? undefined
          : prev[fieldName as keyof FormErrors],
    }));
  };

  const handleRangeSelect = (selectedRange: DateRange | undefined) => {
    setRange(selectedRange);
    setErrors((prev) => ({
      ...prev,
      bookingRange: undefined,
    }));

    if (selectedRange?.from && selectedRange?.to) {
      setIsCalendarOpen(false);
      calendarTriggerRef.current?.focus();
    }
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

    if (range?.from || range?.to) {
      if (!range?.from || !range?.to) {
        newErrors.bookingRange = 'Select both start and end date';
      } else {
        const startDate = new Date(range.from);
        const endDate = new Date(range.to);

        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);

        if (startDate < today) {
          newErrors.bookingRange = 'Start date cannot be in the past';
        } else if (endDate < startDate) {
          newErrors.bookingRange = 'End date must be later than start date';
        }
      }
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
          bookingStartDate: formatDate(range?.from),
          bookingEndDate: formatDate(range?.to),
          bookingDate:
            range?.from && range?.to
              ? `${formatDate(range.from)} - ${formatDate(range.to)}`
              : '',
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
        comment: '',
      });
      setRange(undefined);
      setIsCalendarOpen(false);

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
        label="Name"
        hideLabel
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
        label="Email"
        hideLabel
        placeholder="Email*"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        autoComplete="email"
        disabled={isSubmitting}
      />

      <div className={styles.calendarSection}>
        <div className={styles.calendarField} ref={calendarRef}>
          <button
            ref={calendarTriggerRef}
            type="button"
            className={`${styles.calendarTrigger} ${
              errors.bookingRange ? styles.calendarTriggerError : ''
            }`}
            onClick={() => setIsCalendarOpen((prev) => !prev)}
            aria-haspopup="dialog"
            aria-controls="booking-period-calendar"
            aria-describedby={errors.bookingRange ? 'booking-range-error' : undefined}
            aria-label={
              range?.from || range?.to
                ? `Booking date, selected period ${formatRangeLabel(range)}`
                : 'Booking date'
            }
            {...(errors.bookingRange ? { 'aria-invalid': 'true' } : {})}
            disabled={isSubmitting}
          >
            <span
              className={`${styles.calendarValue} ${
                !range?.from && !range?.to ? styles.calendarPlaceholder : ''
              }`}
            >
              {range?.from || range?.to ? formatRangeLabel(range) : 'Booking date'}
            </span>
          </button>

          {isCalendarOpen && (
            <div
              id="booking-period-calendar"
              ref={calendarDialogRef}
              role="dialog"
              aria-modal="false"
              aria-label="Booking date range picker"
              tabIndex={-1}
              className={`${styles.calendarWrapper} ${
                errors.bookingRange ? styles.calendarWrapperError : ''
              }`}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  setIsCalendarOpen(false);
                  calendarTriggerRef.current?.focus();
                }
              }}
            >
              <DayPicker
                mode="range"
                selected={range}
                onSelect={handleRangeSelect}
                numberOfMonths={2}
                disabled={{ before: today }}
              />
            </div>
          )}
        </div>

        {errors.bookingRange && (
          <span
            id="booking-range-error"
            className={styles.errorMessage}
            role="alert"
            aria-live="polite"
          >
            {errors.bookingRange}
          </span>
        )}
      </div>

      <label htmlFor="booking-comment" className={styles.visuallyHidden}>
        Comment
      </label>

      <textarea
        id="booking-comment"
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
