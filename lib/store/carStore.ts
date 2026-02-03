import { create } from "zustand";
import { Car, Filters } from "@/types/car";
import { fetchCars, fetchBrands } from "@/lib/api/serverApi";

interface CarsState {
  // данные
  cars: Car[];
  brands: string[];

  // фильтры (ТОЛЬКО параметры для бекенда)
  filters: Filters;

  // пагинация
  page: number;
  limit: number;
  hasMore: boolean;

  // состояние
  isLoading: boolean;
  error: string | null;

  // actions
  setFilters: (filters: Filters) => void;
  getCars: () => Promise<void>;
  loadMore: () => Promise<void>;
  getBrands: () => Promise<void>;
}

export const useCarStore = create<CarsState>((set, get) => ({
  /* ===== STATE ===== */
  cars: [],
  brands: [],
  filters: {},

  page: 1,
  limit: 12,
  hasMore: true,

  isLoading: false,
  error: null,

  /* ===== ACTIONS ===== */

  // 👉 справочные данные (бренды)
  getBrands: async () => {
    try {
      const brands = await fetchBrands();
      set({ brands });
    } catch {
      console.error("Failed to load brands");
    }
  },

  // 👉 установка фильтров (БЕЗ фильтрации данных)
  setFilters: (filters) => {
    set({
      filters,
      page: 1,
      cars: [],
      hasMore: true,
    });

    get().getCars();
  },

  // 👉 первая загрузка / обновление
  getCars: async () => {
    const { filters, page, limit } = get();

    set({ isLoading: true, error: null });

    try {
      const cars = await fetchCars({
        ...filters,
        page,
        limit,
      });

      set({
        cars,
        hasMore: cars.length === limit,
        isLoading: false,
      });
    } catch {
      set({
        error: "Failed to load cars",
        isLoading: false,
      });
    }
  },

  // 👉 пагинация
  loadMore: async () => {
    const { filters, page, limit, cars } = get();
    const nextPage = page + 1;

    set({ isLoading: true });

    try {
      const moreCars = await fetchCars({
        ...filters,
        page: nextPage,
        limit,
      });

      set({
        cars: [...cars, ...moreCars],
        page: nextPage,
        hasMore: moreCars.length === limit,
        isLoading: false,
      });
    } catch {
      set({
        error: "Failed to load more cars",
        isLoading: false,
      });
    }
  },
}));
