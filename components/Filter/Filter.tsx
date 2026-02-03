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
        {/* VALUE */}
        <span className={css.value}>
          {value
            ? formatValue
              ? formatValue(value)
              : value.label
            : placeholder}
        </span>

        {/* ICONS (FIXED) */}
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
            aria-hidden
          >
            <use href="/svg-icons.svg#Up" />
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
  const [from, setFrom] = useState<Option<number> | null>(null);
  const [to, setTo] = useState<Option<number> | null>(null);

  /* ===== OPTIONS ===== */

  const brandOptions: Option<string>[] = brands.map((b) => ({
    value: b,
    label: b,
  }));

  const priceOptions: Option<number>[] = prices.map((p) => ({
    value: p,
    label: String(p), // ✅ только число
  }));

  const handleSearch = () => {
    console.log("PRICE OPTION:", price);
    const mileageFrom = from?.value;
    const mileageTo = to?.value;

    const normalizedFrom =
      mileageFrom !== undefined &&
      mileageTo !== undefined &&
      mileageFrom > mileageTo
        ? mileageTo
        : mileageFrom;

    const normalizedTo =
      mileageFrom !== undefined &&
      mileageTo !== undefined &&
      mileageFrom > mileageTo
        ? mileageFrom
        : mileageTo;

    setFilters({
      brand: brand?.value,
      rentalPrice: price?.value,
      minMileage: normalizedFrom,
      maxMileage: normalizedTo,
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
        onClear={() => {
          setBrand(null);
          setFilters({ brand: undefined });
        }}
      />

      <CustomSelect
        label="Price / hour"
        placeholder="Choose a price"
        options={priceOptions}
        value={price}
        onChange={setPrice}
        onClear={() => {
          setPrice(null);
          setFilters({ rentalPrice: undefined });
        }}
        formatValue={(o) => `To $${o.value}`}
      />

      <div className={css.mileageGroup}>
        {/* FROM */}
        <div className={css.mileageInputWrapper}>
          <input
            className={css.mileageInput}
            placeholder="From"
            inputMode="numeric"
            value={
              from ? from.value.toLocaleString("en-US").replace(/,/g, " ") : ""
            }
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "");
              const num = digits ? Number(digits) : undefined;

              setFrom(num ? { value: num, label: String(num) } : null);
            }}
          />

          {from && (
            <span
              className={css.clear}
              onClick={() => {
                setFrom(null);
                setFilters({ minMileage: undefined });
              }}
            >
              ✕
            </span>
          )}
        </div>

        {/* TO */}
        <div className={css.mileageInputWrapper}>
          <input
            className={css.mileageInput}
            placeholder="To"
            inputMode="numeric"
            value={
              to ? to.value.toLocaleString("en-US").replace(/,/g, " ") : ""
            }
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "");
              const num = digits ? Number(digits) : undefined;

              setTo(num ? { value: num, label: String(num) } : null);
            }}
          />

          {to && (
            <span
              className={css.clear}
              onClick={() => {
                setTo(null);
                setFilters({ maxMileage: undefined });
              }}
            >
              ✕
            </span>
          )}
        </div>
      </div>

      <button className={css.searchBtn} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
