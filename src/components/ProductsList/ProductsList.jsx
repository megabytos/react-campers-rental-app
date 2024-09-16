import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredProducts, selectLoading, selectPage, setPage } from '../../redux/productsSlice';
import ProductsListItem from '../ProductsListItem/ProductsListItem';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import css from './ProductsList.module.css';

export default function ProductsList() {
  const dispatch = useDispatch();
  const filteredProducts = useSelector(selectFilteredProducts);
  const loading = useSelector(selectLoading);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const page = useSelector(selectPage);
  const imagesLoaded = useRef(0);
  const scrollRef = useRef();
  const perPage = 4;

  useEffect(() => {
    const visibleProds = filteredProducts.slice(0, perPage * page);
    imagesLoaded.current =
      visibleProds.length < perPage * page ? filteredProducts.length - perPage * (page - 1) : perPage;
    setVisibleProducts(visibleProds);
    if (scrollRef?.current && page > 1) {
      setTimeout(() => {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, [filteredProducts, page]);

  const onLoadMore = () => {
    if (visibleProducts.length < filteredProducts.length) {
      dispatch(setPage(page + 1));
    }
  };

  return (
    <>
      {visibleProducts.length > 0 && (
        <ul className={css.productsList}>
          {visibleProducts.map((product, index) => (
            <li key={product.id} className={css.productCard}>
              <ProductsListItem
                product={product}
                ref={index === visibleProducts.length - imagesLoaded.current ? scrollRef : null}
              />
            </li>
          ))}
        </ul>
      )}
      {!loading && visibleProducts.length === 0 && <p className={css.error}>Vehicles not found</p>}
      {visibleProducts.length < filteredProducts.length && <LoadMoreBtn onLoadMore={onLoadMore} />}
    </>
  );
}
