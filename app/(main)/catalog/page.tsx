import type { Metadata } from 'next';
import CatalogPageClient from './CatalogPageClient';

export const metadata: Metadata = {
  title: 'Car Catalog',
  description:
    'Explore our catalog of available rental cars. Filter by brand, price, and mileage to find the perfect vehicle.',
};

export default function CatalogPage() {
  return <CatalogPageClient />;
}
