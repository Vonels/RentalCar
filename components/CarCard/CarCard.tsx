import Image from "next/image";
import Link from "next/link";
import { Car } from "@/types/car";
import css from "./CarCard.module.css";
import { useState } from "react";

interface CarCardProps {
  car: Car;
}

const Heartactive = () => (
  <svg width={24} height={24}>
    <use href="/svg-icons.svg#Love-blue"></use>
  </svg>
);

const Heartinactive = () => (
  <svg width={24} height={24}>
    <use href="/svg-icons.svg#Love"></use>
  </svg>
);

export default function CarCard({ car }: CarCardProps) {
  const [city, country] = car.address.split(", ").slice(-2);
  const [isFavorite, setIsFavorite] = useState(() => {
    if (typeof window === "undefined") return false;

    const stored = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    ) as string[];

    return stored.includes(car.id);
  });

  const toggleFavorite = () => {
    const stored = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    ) as string[];

    let updatedFavorites: string[];

    if (stored.includes(car.id)) {
      updatedFavorites = stored.filter((id) => id !== car.id);
      setIsFavorite(false);
    } else {
      updatedFavorites = [...stored, car.id];
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={274}
          height={180}
          className={css.image}
        />

        <button
          type="button"
          className={css.favorite}
          aria-label="Add to favorites"
          onClick={toggleFavorite}
        >
          {isFavorite ? <Heartactive /> : <Heartinactive />}
        </button>
      </div>

      <div className={css.content}>
        <div className={css.titleRow}>
          <h3 className={css.title}>
            {car.brand} <span>{car.model}</span>, {car.year}
          </h3>
          <span className={css.price}>${car.rentalPrice}</span>
        </div>

        <p className={css.meta}>
          {city} | {country} | {car.rentalCompany}
        </p>

        <p className={css.meta}>
          {car.type} | {car.mileage.toLocaleString("en-US")} km
        </p>

        <Link href={`/catalog/${car.id}`} className={css.button}>
          Read more
        </Link>
      </div>
    </div>
  );
}
