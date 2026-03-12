import type { Metadata } from 'next';
import { Hero } from '@/components/Hero/Hero';

export const metadata: Metadata = {
  title: 'Find Your Perfect Rental Car',
  description:
    'Browse our wide selection of premium rental cars and book your ideal vehicle today.',
  keywords: ['car rental', 'rent a car', 'vehicles', 'car booking'],
};

export default function Home() {
  return (
    <div className="container">
      <Hero />
    </div>
  );
}
