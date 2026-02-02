import { create } from "zustand";
import { Car, Filters } from "@/types/car";
import { fetchCars } from "@/lib/api/serverApi";
interface CarsState {
  cars: Car[];
  favorites: Car[];
  filters: Filters;
  page: number;
  limit: number;
  isLoading: boolean;
  error: string | null;
  setFilters: (filters: Partial<Filters>) => void;
  getCars: () => Promise<void>;
  loadMore: () => Promise<void>;
  toggleFavorite: (car: Car) => void;
}
const initialFilters: Filters = {
  brand: "",
  price: null,
  mileageFrom: null,
  mileageTo: null,
};
export const useCarStore = create<CarsState>((set, get) => ({
  cars: [],
  favorites: [],
  filters: initialFilters,
  page: 1,
  limit: 12,
  isLoading: false,
  error: null,
  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      page: 1,
      cars: [],
    }));
  },
  getCars: async () => {
    const { filters, page, limit } = get();
    set({ isLoading: true, error: null });
    try {
      const cars = await fetchCars({ ...filters, page, limit });
      set({ cars, isLoading: false });
    } catch {
      set({ error: "Failed to load cars", isLoading: false });
    }
  },

  loadMore: async () => {
    const { filters, page, limit, cars } = get();
    const nextPage = page + 1;
    set({ isLoading: true });
    try {
      const moreCars = await fetchCars({ ...filters, page: nextPage, limit });
      set({ cars: [...cars, ...moreCars], page: nextPage, isLoading: false });
    } catch {
      set({ error: "Failed to load more", isLoading: false });
    }
  },
  toggleFavorite: (car) => {
    set((state) => {
      const exists = state.favorites.some((item) => item.id === car.id);
      return {
        favorites: exists
          ? state.favorites.filter((i) => i.id !== car.id)
          : [...state.favorites, car],
      };
    });
  },
}));
