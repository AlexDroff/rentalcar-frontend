import type { Metadata } from 'next';
import { carsService } from '@/lib/api/cars.service';
import CarDetailsPage from './CarDetailsPageClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const car = await carsService.getCarById(id);

    return {
      title: `${car.brand} ${car.model}`,
      description: car.description,
      openGraph: {
        title: `${car.brand} ${car.model}`,
        description: car.description,
        images: [car.img],
      },
    };
  } catch {
    return {
      title: 'Car not found',
    };
  }
}

export default function Page() {
  return <CarDetailsPage />;
}
