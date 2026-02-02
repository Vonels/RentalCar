import Link from "next/link";
import css from "./page.module.css";

export default function HomePage() {
  return (
    <section className={css.hero}>
      <div className={css.content}>
        <h1 className={css.heroh}>Find your perfect rental car</h1>
        <p className={css.herop}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <Link className={css.link} href="/catalog">
          <button className={css.herobutton}>View Catalog</button>
        </Link>
      </div>
    </section>
  );
}
