import api from './api';
import type { Car, CarsFilters } from '@/types/car';

interface GetCarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

type CarsQueryParams = {
  page: string;
  limit: string;
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
};

export const carsService = {
  async getCars(
    filters?: CarsFilters,
    page: number = 1,
    limit: number = 12
  ): Promise<GetCarsResponse> {
    const params: CarsQueryParams = {
      page: String(page),
      limit: String(limit),
    };

    if (filters?.brand) params.brand = filters.brand;
    if (filters?.rentalPrice) params.rentalPrice = filters.rentalPrice;
    if (filters?.minMileage) params.minMileage = filters.minMileage;
    if (filters?.maxMileage) params.maxMileage = filters.maxMileage;

    const response = await api.get<GetCarsResponse>('/cars', { params });

    return response.data;
  },

  async getCarById(id: string): Promise<Car> {
    const response = await api.get<Car>(`/cars/${id}`);
    return response.data;
  },

  async getBrands(): Promise<string[]> {
    const response = await api.get<string[]>('/brands');
    return response.data;
  },
};
