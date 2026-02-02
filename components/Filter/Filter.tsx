"use client";

import { ChangeEvent, useState } from "react";
import { useCarStore } from "@/lib/store/carStore";
import css from "./Filter.module.css";

export default function Filters() {
  const setFilters = useCarStore((s) => s.setFilters);
  const getCars = useCarStore((s) => s.getCars);

  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [mileageFrom, setMileageFrom] = useState("");
  const [mileageTo, setMileageTo] = useState("");

  const handleSearch = () => {
    setFilters({
      brand,
      price,
      mileageFrom: mileageFrom ? Number(mileageFrom) : undefined,
      mileageTo: mileageTo ? Number(mileageTo) : undefined,
    });

    getCars();
  };

  return (
    <div className={css.wrapper}>
      {/* BRAND */}
      <div className={css.field}>
        <label>Car brand</label>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option value="">Choose a brand</option>
          <option value="BMW">BMW</option>
          <option value="Audi">Audi</option>
          <option value="Tesla">Tesla</option>
        </select>
      </div>

      {/* PRICE */}
      <div className={css.field}>
        <label>Price / hour</label>
        <select value={price} onChange={(e) => setPrice(e.target.value)}>
          <option value="">Choose a price</option>
          <option value="30">30$</option>
          <option value="50">50$</option>
          <option value="70">70$</option>
        </select>
      </div>

      {/* MILEAGE */}
      <div className={css.field}>
        <label>Car mileage / km</label>
        <div className={css.range}>
          <input
            type="number"
            placeholder="From"
            value={mileageFrom}
            onChange={(e) => setMileageFrom(e.target.value)}
          />
          <input
            type="number"
            placeholder="To"
            value={mileageTo}
            onChange={(e) => setMileageTo(e.target.value)}
          />
        </div>
      </div>

      <button className={css.searchBtn} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
