import { useEffect, Suspense } from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../redux/productsOps';
import { selectProductById, selectLoading } from '../../redux/productsSlice';
import PageTitle from '../../components/PageTitle/PageTitle';
import ProductForm from '../../components/ProductForm/ProductForm';
import Loader from '../../components/Loader/Loader';
import Icon from '../../components/Icon/Icon';
import css from './ProductPage.module.css';

const ProductPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const product = useSelector(selectProductById);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  return (
    <main>
      <PageTitle title={product.name} />
      {loading && <Loader />}
      {!!product && (
        <div className={css.wrapper}>
          <div className={css.header}>
            <div className={css.headerContent}>
              <h2 className={css.productTitle}>{product.name}</h2>
            </div>
            <p className={css.productRating}>
              <span className={css.rating}>
                <Icon name="icon-star" className="iconStar" />
                <span className={css.ratingValue}>
                  {product.rating} ({product.reviews.length} Reviews)
                </span>
              </span>
              <span className={css.location}>
                <Icon name="icon-map" className="smallest" />
                {product.location.split(', ').reverse().join(', ')}
              </span>
            </p>
            <p className={css.price}>€{product.price.toFixed(2)}</p>
          </div>

          <ul className={css.gallery}>
            {product.gallery.map(({ thumb, original }) => (
              <li key={thumb} className={css.galleryItem}>
                <img src={thumb} data-original={original} alt="Camper" className={css.galleryImage} />
              </li>
            ))}
          </ul>

          <p className={css.description}>{product.description}</p>

          <ul className={css.menu}>
            <li>
              <NavLink to="" state={location}>
                Features
              </NavLink>
            </li>
            <li>
              <NavLink to="reviews" state={location}>
                Reviews
              </NavLink>
            </li>
          </ul>

          <div className={css.content}>
            <div className={css.container}>
              <Suspense fallback={<div>Loading...</div>}>
                <Outlet />
              </Suspense>
            </div>

            <ProductForm />
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductPage;
