import { useSelector } from 'react-redux';
import Icon from '../Icon/Icon';
import { selectProductById } from '../../redux/productsSlice';
import css from './ProductFeatures.module.css';

const ProductFeatures = () => {
  const product = useSelector(selectProductById);

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
    <div className={css.features}>
      <ul className={css.equipmentList}>
        {equipment.map(({ icon, label }, idx) => (
          <li key={idx} className={css.equipmentItem}>
            <Icon name={icon} className="small" />
            {label}
          </li>
        ))}
      </ul>
      <div className={css.wrapper}>
        <h4 className={css.title}>Vehicle Details</h4>
        <hr className={css.separator} />
        <ul className={css.list}>
          <li>Form <span>{product.form}</span></li>
          <li>Length <span>{product.length}</span></li>
          <li>Width <span>{product.width}</span></li>
          <li>Height <span>{product.height}</span></li>
          <li>Tank <span>{product.tank}</span></li>
          <li>Consumption <span>{product.consumption}</span></li>
        </ul>
      </div>
    </div>
  );
};

export default ProductFeatures;
