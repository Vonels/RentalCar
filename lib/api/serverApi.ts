import { api } from "./api";
import { Car } from "@/types/car";

/* ================== TYPES ================== */

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

/* ================== API ================== */

// 👉 ОСНОВНОЙ ЗАПРОС С ФИЛЬТРАЦИЕЙ (бекенд)
export const fetchCars = async (params: FetchCarsParams): Promise<Car[]> => {
  const { page, limit, rentalPrice_lte, ...rest } = params;

  const query = Object.fromEntries(
    Object.entries({
      ...rest,
      rentalPrice_lte:
        rentalPrice_lte !== undefined ? `$${rentalPrice_lte}` : undefined,
    }).filter(([, value]) => value !== undefined),
  );

  const { data } = await api.get<CarsResponse>("/cars", {
    params: { ...query, page, limit },
  });

  return data.cars;
};

// 👉 ПОЛУЧЕНИЕ ОДНОЙ МАШИНЫ
export const fetchCarById = async (id: string): Promise<Car> => {
  const { data } = await api.get<Car>(`/cars/${id}`);
  return data;
};

// 👉 СПРАВОЧНЫЕ ДАННЫЕ (БРЕНДЫ) — НЕ ФИЛЬТРАЦИЯ
export const fetchBrands = async (): Promise<string[]> => {
  const { data } = await api.get<Car[]>("/cars");

  return Array.from(new Set(data.map((car) => car.brand))).sort();
};
