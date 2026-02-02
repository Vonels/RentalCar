"use client";

import { useCarStore } from "@/lib/store/carStore";
import CarCard from "../CarCard/CarCard";
import css from "./CarList.module.css";

export default function CarList() {
  const cars = useCarStore((s) => s.cars);

  return (
    <div className={css.list}>
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
