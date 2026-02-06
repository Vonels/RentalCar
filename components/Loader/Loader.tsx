import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.backdrop}>
      <div className={css.wrapper}>
        <div className={css.road}>
          <div className={css.car}>
            <div className={css.roof} />
            <div className={css.body} />
            <div className={`${css.wheel} ${css.left}`} />
            <div className={`${css.wheel} ${css.right}`} />
          </div>
        </div>

        <p className={css.text}>Loading</p>
      </div>
    </div>
  );
}
