import { Car } from "@/types/car";
import CarCard from "../CarCard/CarCard";
import css from "./CarList.module.css";

interface CarsListProps {
  cars: Car[];
}

export default function CarsList({ cars }: CarsListProps) {
  return (
    <ul className={css.list}>
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </ul>
  );
}
