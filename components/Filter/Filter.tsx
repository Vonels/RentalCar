"use client";

import { useEffect, useState } from "react";
import { useCarStore } from "@/lib/store/carStore";
import css from "./Filter.module.css";

type Option<T> = {
  value: T;
  label: string;
};

function CustomSelect<T>({
  label,
  placeholder,
  options,
  value,
  onChange,
  formatValue,
}: {
  label?: string;
  placeholder: string;
  options: Option<T>[];
  value: Option<T> | null;
  onChange: (opt: Option<T>) => void;
  formatValue?: (opt: Option<T>) => string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={css.selectWrapper}>
      {label && <label>{label}</label>}

      <button
        type="button"
        className={css.select}
        onClick={() => setOpen((p) => !p)}
      >
        <span className={css.value}>
          {value
            ? formatValue
              ? formatValue(value)
              : value.label
            : placeholder}
        </span>
        <svg
          width={16}
          height={16}
          className={`${css.chevron} ${open ? css.open : ""}`}
          aria-hidden
        >
          <use href="/svg-icons.svg#Up" />
        </svg>
      </button>

      {open && (
        <ul className={css.dropdown}>
          {options.map((opt) => (
            <li
              key={String(opt.value)}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Filters() {
  const setFilters = useCarStore((s) => s.setFilters);
  const brands = useCarStore((s) => s.brands);
  const getBrands = useCarStore((s) => s.getBrands);

  useEffect(() => {
    getBrands();
  }, [getBrands]);

  const [brand, setBrand] = useState<Option<string> | null>(null);
  const [price, setPrice] = useState<Option<number> | null>(null);
  const [from, setFrom] = useState<Option<number> | null>(null);
  const [to, setTo] = useState<Option<number> | null>(null);

  /* ===== OPTIONS ===== */

  const brandOptions: Option<string>[] = brands.map((b) => ({
    value: b,
    label: b,
  }));

  const priceOptions: Option<number>[] = [
    { value: 20, label: "To $20" },
    { value: 30, label: "To $30" },
    { value: 40, label: "To $40" },
    { value: 50, label: "To $50" },
  ];

  const mileageOptions: Option<number>[] = Array.from(
    { length: 21 },
    (_, i) => {
      const value = i * 5000;
      return { value, label: value.toLocaleString() };
    },
  );

  /* ===== HANDLER ===== */

  const handleSearch = () => {
    setFilters({
      brand: brand?.value,
      rentalPrice_lte: price?.value,
      mileage_gte: from?.value,
      mileage_lte: to?.value,
    });
  };

  return (
    <div className={css.wrapper}>
      <CustomSelect
        label="Car brand"
        placeholder="Choose a brand"
        options={brandOptions}
        value={brand}
        onChange={setBrand}
      />

      <CustomSelect
        label="Price / hour"
        placeholder="Choose a price"
        options={priceOptions}
        value={price}
        onChange={setPrice}
        formatValue={(o) => `To $${o.value}`}
      />

      <div className={css.mileageBlock}>
        <label>Car mileage / km</label>
        <div className={css.mileageGroup}>
          <CustomSelect
            placeholder="From"
            options={mileageOptions}
            value={from}
            onChange={setFrom}
          />
          <CustomSelect
            placeholder="To"
            options={mileageOptions}
            value={to}
            onChange={setTo}
          />
        </div>
      </div>

      <button className={css.searchBtn} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
