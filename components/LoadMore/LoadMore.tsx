import css from "./LoadMore.module.css";

interface Props {
  onClick: () => void;
}

export default function LoadMore({ onClick }: Props) {
  return (
    <div className={css.wrapper}>
      <button className={css.loadMoreButton} onClick={onClick}>
        Load more
      </button>
    </div>
  );
}
