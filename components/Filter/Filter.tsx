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
  onClear,
  formatValue,
}: {
  label?: string;
  placeholder: string;
  options: Option<T>[];
  value: Option<T> | null;
  onChange: (opt: Option<T>) => void;
  onClear?: () => void;
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

        <span className={css.icons}>
          {value && onClear && (
            <span
              className={css.clear}
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
            >
              ✕
            </span>
          )}

          <svg
            width={16}
            height={16}
            className={`${css.chevron} ${open ? css.open : ""}`}
          >
            <use href="/svg-icons.svg#Down" />
          </svg>
        </span>
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
  const prices = useCarStore((s) => s.prices);
  const getBrands = useCarStore((s) => s.getBrands);
  const getPrices = useCarStore((s) => s.getPrices);

  useEffect(() => {
    getBrands();
    getPrices();
  }, [getBrands, getPrices]);

  const [brand, setBrand] = useState<Option<string> | null>(null);
  const [price, setPrice] = useState<Option<number> | null>(null);
  const [from, setFrom] = useState<number | null>(null);
  const [to, setTo] = useState<number | null>(null);

  const handleSearch = () => {
    const min = from && to && from > to ? to : from;
    const max = from && to && from > to ? from : to;

    setFilters({
      brand: brand?.value,
      rentalPrice: price?.value,
      minMileage: min ?? undefined,
      maxMileage: max ?? undefined,
    });
  };

  return (
    <div className={css.wrapper}>
      <CustomSelect
        label="Car brand"
        placeholder="Choose a brand"
        options={brands.map((b) => ({ value: b, label: b }))}
        value={brand}
        onChange={setBrand}
        onClear={() => {
          setBrand(null);
          setFilters({ brand: undefined });
        }}
      />

      <CustomSelect
        label="Price / hour"
        placeholder="Choose a price"
        options={prices.map((p) => ({ value: p, label: String(p) }))}
        value={price}
        onChange={setPrice}
        onClear={() => {
          setPrice(null);
          setFilters({ rentalPrice: undefined });
        }}
        formatValue={(o) => `To $${o.value}`}
      />

      <div className={css.mileageGroup}>
        <div className={css.mileageField}>
          <span className={css.prefix}>From</span>
          <input
            inputMode="numeric"
            className={css.mileageInput}
            value={from ? from.toLocaleString("en-US") : ""}
            onChange={(e) => {
              const num = Number(e.target.value.replace(/\D/g, ""));
              setFrom(num || null);
            }}
          />
        </div>

        <div className={css.mileageField}>
          <span className={css.prefix}>To</span>
          <input
            inputMode="numeric"
            className={css.mileageInput}
            value={to ? to.toLocaleString("en-US") : ""}
            onChange={(e) => {
              const num = Number(e.target.value.replace(/\D/g, ""));
              setTo(num || null);
            }}
          />
        </div>
      </div>

      <button className={css.searchBtn} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
