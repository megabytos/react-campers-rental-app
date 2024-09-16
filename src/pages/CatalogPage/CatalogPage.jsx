import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/productsOps';
import { selectError, selectLoading } from '../../redux/productsSlice';
import ProductsList from '../../components/ProductsList/ProductsList';
import ProductsFilters from '../../components/ProductsFilters/ProductsFilters';
import Loader from '../../components/Loader/Loader';
import css from './CatalogPage.module.css';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <main>
      <div className={css.container}>
        {loading && !error && <Loader />}
        <aside className={css.filters}>
          <ProductsFilters />
        </aside>
        <section className={css.products}>
          <ProductsList />
          {!loading && !!error && <b>Error: {error}</b>}
        </section>
      </div>
    </main>
  );
};

export default CatalogPage;
