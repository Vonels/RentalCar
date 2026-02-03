"use client";

import { useEffect } from "react";
import { useCarStore } from "@/lib/store/carStore";
import Filters from "@/components/Filter/Filter";
import CarsList from "@/components/CarList/CarList";
import css from "./Catalog.module.css";

export default function CatalogPage() {
  const { cars, hasMore, loadMore, isLoading, getCars } = useCarStore();

  useEffect(() => {
    getCars();
  }, [getCars]);

  return (
    <section className={css.catalog}>
      <div className={css.inner}>
        <Filters />
        <CarsList cars={cars} />

        {hasMore && (
          <button onClick={loadMore} disabled={isLoading}>
            Load more
          </button>
        )}

        {isLoading && <p>Loading...</p>}
      </div>
    </section>
  );
}
