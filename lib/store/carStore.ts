import { create } from "zustand";
import { Car, Filters } from "@/types/car";
import { fetchCars, fetchBrands, fetchPrices } from "@/lib/api/serverApi";

interface CarsState {
  cars: Car[];
  brands: string[];
  prices: number[];

  filters: Filters;

  page: number;
  limit: number;
  hasMore: boolean;

  isLoading: boolean;
  error: string | null;

  setFilters: (filters: Filters) => void;
  getCars: () => Promise<void>;
  loadMore: () => Promise<void>;
  getBrands: () => Promise<void>;
  getPrices: () => Promise<void>;
}

export const useCarStore = create<CarsState>((set, get) => ({
  cars: [],
  brands: [],
  prices: [],
  filters: {},

  page: 1,
  limit: 12,
  hasMore: true,

  isLoading: false,
  error: null,

  getBrands: async () => {
    const brands = await fetchBrands();
    set({ brands });
  },

  getPrices: async () => {
    const prices = await fetchPrices();
    set({ prices });
  },

  setFilters: (filters) => {
    set({ filters, page: 1, cars: [], hasMore: true });
    get().getCars();
  },

  getCars: async () => {
    const { filters, page, limit } = get();
    const cars = await fetchCars({ ...filters, page, limit });
    set({ cars, hasMore: cars.length === limit });
  },

  loadMore: async () => {
    const { filters, page, limit, cars } = get();
    const nextPage = page + 1;
    const moreCars = await fetchCars({
      ...filters,
      page: nextPage,
      limit,
    });

    set({
      cars: [...cars, ...moreCars],
      page: nextPage,
      hasMore: moreCars.length === limit,
    });
  },
}));
