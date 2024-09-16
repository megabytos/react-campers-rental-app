import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { selectProductReviewsById } from '../../redux/productsSlice';
import Icon from '../Icon/Icon';
import { fetchProductById } from '../../redux/productsOps';
import css from './ProductReviews.module.css';
import { useDispatch, useSelector } from 'react-redux';

const ProductReviews = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const reviews = useSelector(selectProductReviewsById);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  const renderStars = rating => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon key={index} name="icon-star" className={index < rating ? 'iconStar' : 'iconStarEmpty'} />
    ));
  };

  return (
    <div className={css.container}>
      {reviews.length === 0 ? (
        <p className={css.noReviews}>We dont have any reviews for this camper.</p>
      ) : (
        <>
          <ul className={css.list}>
            {reviews.map(({ reviewer_name, reviewer_rating, comment }) => (
              <li className={css.item} key={reviewer_name}>
                <div className={css.header}>
                  <p className={css.avatar}>{reviewer_name[0].toUpperCase()}</p>
                  <div className={css.info}>
                    <p className={css.name}>{reviewer_name}</p>
                    <p className={css.rating}>{renderStars(reviewer_rating)}</p>
                  </div>
                </div>
                <p className={css.comment}>{comment}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ProductReviews;
