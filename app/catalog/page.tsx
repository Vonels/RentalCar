"use client";

import { useEffect } from "react";
import { useCarStore } from "@/lib/store/carStore";
import Filters from "@/components/Filter/Filter";
import CarsList from "@/components/CarList/CarList";
import css from "./Catalog.module.css";
import LoadMore from "@/components/LoadMore/LoadMore";

export default function CatalogPage() {
  const { cars, hasMore, loadMore, isLoading, getCars } = useCarStore();

  useEffect(() => {
    getCars();
  }, [getCars]);

  const showEmpty = !isLoading && cars.length === 0;

  return (
    <section className={css.catalog}>
      <div className={css.inner}>
        <Filters />
        {showEmpty && <p className={css.empty}>NO CAR</p>}

        <CarsList cars={cars} />

        {hasMore && <LoadMore onClick={loadMore} />}

        {isLoading && <p>Loading...</p>}
      </div>
    </section>
  );
}
