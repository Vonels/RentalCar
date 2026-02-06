import { fetchCarById } from "@/lib/api/serverApi";
import css from "./CatalogD.module.css";
import Image from "next/image";
import CarForm from "@/components/CarForm/CarForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CatalogDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const car = await fetchCarById(id);

  return (
    <div className={css.page}>
      <div className={css.left}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          className={css.image}
          width={640}
          height={512}
        />
        <CarForm />
      </div>

      <div className={css.right}>
        <h1 className={css.title}>
          {car.brand} {car.model}, {car.year}
          <span className={css.id}>id: {car.id.slice(0, 4).toUpperCase()}</span>
        </h1>

        <div className={css.meta}>
          <span>
            <svg width={16} height={16}>
              <use href="/svg-icons.svg#Location"></use>
            </svg>{" "}
            {car.address}
          </span>
          <span>Mileage: {car.mileage.toLocaleString()} km</span>
        </div>

        <p className={css.price}>${car.rentalPrice}</p>

        <p className={css.description}>{car.description}</p>

        <div className={css.info}>
          <section className={css.section}>
            <h3 className={css.front}>Rental Conditions</h3>
            <ul className={css.list}>
              {car.rentalConditions.map((item: string) => (
                <li key={item}>
                  <svg className={css.svgd} width={16} height={16}>
                    <use href="/svg-icons.svg#VectorO"></use>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className={css.section}>
            <h3 className={css.front}>Car Specifications</h3>
            <ul className={css.list}>
              <li>
                <svg className={css.svgd} width={16} height={16}>
                  <use href="/svg-icons.svg#Calendar"></use>
                </svg>
                Year: {car.year}
              </li>
              <li>
                <svg className={css.svgd} width={16} height={16}>
                  <use href="/svg-icons.svg#Car"></use>
                </svg>
                Type: {car.type}
              </li>
              <li>
                <svg className={css.svgd} width={16} height={16}>
                  <use href="/svg-icons.svg#Oil"></use>
                </svg>
                Fuel Consumption: {car.fuelConsumption}
              </li>
              <li>
                <svg className={css.svgd} width={16} height={16}>
                  <use href="/svg-icons.svg#Setting"></use>
                </svg>
                Engine Size: {car.engineSize}
              </li>
            </ul>
          </section>

          <section className={css.section}>
            <h3 className={css.front}>Accessories and functionalities</h3>
            <ul className={css.list}>
              {[...car.accessories, ...car.functionalities].map(
                (item: string) => (
                  <li key={item}>
                    <svg className={css.svgd} width={16} height={16}>
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
