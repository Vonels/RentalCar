"use client";

import { useEffect } from "react";
import { useCarStore } from "@/lib/store/carStore";
import Filters from "@/components/Filter/Filter";
import CarsList from "@/components/CarList/CarList";
import LoadMore from "@/components/LoadMore/LoadMore";
import css from "./Catalog.module.css";

export default function CatalogPage() {
  const { getCars, loadMore, isLoading, cars } = useCarStore();

  useEffect(() => {
    getCars();
  }, [getCars]);

  return (
    <section className={css.catalog}>
      <div className={css.inner}>
        <Filters />

        <CarsList />

        {cars.length > 0 && !isLoading && <LoadMore onClick={loadMore} />}

        {isLoading && <p>Loading...</p>}
      </div>
    </section>
  );
}
