import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onLoadMore }) => {
  return (
    <button id="loadMore" className={css.loadMore} onClick={onLoadMore} aria-label="Load more">
      Load more
    </button>
  );
};

export default LoadMoreBtn;
