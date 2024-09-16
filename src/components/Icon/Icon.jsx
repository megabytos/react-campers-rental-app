import clsx from 'clsx';
import css from './Icon.module.css';

const Icon = ({ name, className = '', active = false, ...props }) => (
  <svg className={clsx(css.icon, css[className], { [css.active]: active })} {...props}>
    <use xlinkHref={`/icons.svg#${name}`} />
  </svg>
);

export default Icon;
