import { fetchCarById } from "@/lib/api/serverApi";
import styles from "./CatalogD.module.css";
import Image from "next/image";
import CarForm from "@/components/CarForm/CarForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CatalogDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const car = await fetchCarById(id);

  return (
    <div className={styles.page}>
      {/* LEFT COLUMN */}
      <div className={styles.left}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          className={styles.image}
          width={640}
          height={512}
        />

        {/* BOOKING FORM */}
        <CarForm />
      </div>

      {/* RIGHT COLUMN */}
      <div className={styles.right}>
        {/* HEADER */}
        <h1 className={styles.title}>
          {car.brand} {car.model}, {car.year}
          <span className={styles.id}>id: {car.id}</span>
        </h1>

        {/* META */}
        <div className={styles.meta}>
          <span>
            <svg width={16} height={16}>
              <use href="/svg-icons.svg#Location"></use>
            </svg>{" "}
            {car.address}
          </span>
          <span>Mileage: {car.mileage.toLocaleString()} km</span>
        </div>

        {/* PRICE */}
        <p className={styles.price}>${car.rentalPrice}</p>

        {/* DESCRIPTION */}
        <p className={styles.description}>{car.description}</p>

        <div className={styles.info}>
          <section className={styles.section}>
            <h3 className={styles.front}>Rental Conditions</h3>
            <ul className={styles.list}>
              {car.rentalConditions.map((item: string) => (
                <li key={item}>
                  <svg className={styles.svgd} width={16} height={16}>
                    <use href="/svg-icons.svg#VectorO"></use>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* CAR SPECIFICATIONS */}
          <section className={styles.section}>
            <h3 className={styles.front}>Car Specifications</h3>
            <ul className={styles.list}>
              <li>
                <svg className={styles.svgd} width={16} height={16}>
                  <use href="/svg-icons.svg#Calendar"></use>
                </svg>
                Year: {car.year}
              </li>
              <li>
                <svg className={styles.svgd} width={16} height={16}>
                  <use href="/svg-icons.svg#Car"></use>
                </svg>
                Type: {car.type}
              </li>
              <li>
                <svg className={styles.svgd} width={16} height={16}>
                  <use href="/svg-icons.svg#Oil"></use>
                </svg>
                Fuel Consumption: {car.fuelConsumption}
              </li>
              <li>
                <svg className={styles.svgd} width={16} height={16}>
                  <use href="/svg-icons.svg#Setting"></use>
                </svg>
                Engine Size: {car.engineSize}
              </li>
            </ul>
          </section>

          {/* ACCESSORIES & FUNCTIONALITIES */}
          <section className={styles.section}>
            <h3 className={styles.front}>Accessories and functionalities</h3>
            <ul className={styles.list}>
              {[...car.accessories, ...car.functionalities].map(
                (item: string) => (
                  <li key={item}>
                    <svg className={styles.svgd} width={16} height={16}>
                      <use href="/svg-icons.svg#VectorO"></use>
                    </svg>
                    {item}
                  </li>
                ),
              )}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
