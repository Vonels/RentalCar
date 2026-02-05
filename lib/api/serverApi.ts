import { api } from "./api";
import { Car } from "@/types/car";

export interface FetchCarsParams {
  brand?: string;
  rentalPrice_lte?: number;
  mileage_gte?: number;
  mileage_lte?: number;
  page: number;
  limit: number;
}

export interface CarsResponse {
  cars: Car[];
  total: number;
}

export const fetchCars = async (params: FetchCarsParams): Promise<Car[]> => {
  console.log("FETCH PARAMS:", params);
  const { page, limit, ...rest } = params;

  const query = Object.fromEntries(
    Object.entries(rest).filter(([, v]) => v !== undefined),
  );

  const { data } = await api.get<CarsResponse>("/cars", {
    params: { ...query, page, limit },
  });

  return data.cars;
};

export const fetchCarById = async (id: string): Promise<Car> => {
  const { data } = await api.get<Car>(`/cars/${id}`);
  return data;
};

export const fetchBrands = async (): Promise<string[]> => {
  const { data } = await api.get<string[]>("/brands");
  return data;
};

export const fetchPrices = async (): Promise<number[]> => {
  const { data } = await api.get<CarsResponse>("/cars", {
    params: {
      page: 1,
      limit: 1000,
    },
  });

  const prices = data.cars
    .map((car) => Number(car.rentalPrice.replace("$", "")))
    .filter((price) => !Number.isNaN(price));

  return Array.from(new Set(prices)).sort((a, b) => a - b);
};
