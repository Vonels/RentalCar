import { api } from "./api";
import { Car } from "@/types/car";

export interface FetchCarsParams {
  // фильтрация
  brand?: string;
  price?: number | null;

  mileageFrom?: number | null;
  mileageTo?: number | null;

  page: number;
  limit: number;
}

export interface CarsResponse {
  cars: Car[];
  total: number;
}

export const fetchCars = async (params: FetchCarsParams): Promise<Car[]> => {
  const { data } = await api.get<CarsResponse>("/cars", {
    params,
  });

  return data.cars;
};

export const fetchCarById = async (id: string): Promise<Car> => {
  const { data } = await api.get<Car>(`/cars/${id}`);
  return data;
};
