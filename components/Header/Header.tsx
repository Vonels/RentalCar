import Link from "next/link";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <div className={`${css.heder} container`}>
        <Link href="/">
          <svg width={104} height={16}>
            <use href="/svg-icons.svg#Logo"></use>
          </svg>
        </Link>

        <nav className={css.nav}>
          <li>
            <Link className={css.link} href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={css.link} href="/catalog">
              Catalog
            </Link>
          </li>
        </nav>
      </div>
    </header>
  );
}
