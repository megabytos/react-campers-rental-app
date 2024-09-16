import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import { forwardRef } from 'react';
import { selectIsFavorite, addFavorite, removeFavorite } from '../../redux/favoritesSlice';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import css from './ProductsListItem.module.css';

const ProductsListItem = forwardRef(({ product }, ref) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector(state => selectIsFavorite(state, product.id));

  const handleClick = () => {
    if (isFavorite) {
      dispatch(removeFavorite(product.id));
      toast.success('Camper removed from favorites');
    } else {
      dispatch(addFavorite(product));
      toast.success('Camper added to favorites');
    }
  };

  const getFilteredEquipment = ({ transmission, engine, AC, bathroom, kitchen, radio, TV }) => {
    return [
      { icon: 'icon-automatic', label: 'Automatic', available: transmission === 'automatic' },
      { icon: 'icon-fuel', label: engine, available: engine },
      { icon: 'icon-kitchen', label: 'Kitchen', available: kitchen },
      { icon: 'icon-ac', label: 'AC', available: AC },
      { icon: 'icon-bathroom', label: 'Bathroom', available: bathroom },
      { icon: 'icon-radio', label: 'Radio', available: radio },
      { icon: 'icon-tv', label: 'TV', available: TV },
    ].filter(item => item.available);
  };

  const equipment = getFilteredEquipment({ ...product });

  return (
    <>
      <img src={product.gallery[0].thumb} alt={product.name} className={css.productImage} />
      <div className={css.productDetails} ref={ref}>
        <div className={css.header}>
          <div className={css.headerContent}>
            <h2 className={css.productTitle}>{product.name}</h2>
            <p className={css.productPrice}>
              <span className={css.price}>€{product.price.toFixed(2)}</span>
              <Icon name="icon-heart" className="iconHeart" onClick={handleClick} active={isFavorite} />
            </p>
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
        </div>

        <p className={css.productDescription}>{product.description}</p>

        <ul className={css.equipmentList}>
          {equipment.map(({ icon, label }, idx) => (
            <li key={idx} className={css.equipmentItem}>
              <Icon name={icon} className="small" />
              {label}
            </li>
          ))}
        </ul>

        <Button aria-label="Show More" target="_blank" onClick={() => window.open(`/catalog/${product.id}`, '_blank')}>
          Show More
        </Button>
      </div>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </>
  );
});

ProductsListItem.displayName = 'ProductsListItem';

export default ProductsListItem;
