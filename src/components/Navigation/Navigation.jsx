import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg'
import css from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav>
      <Link to="/" className={css.logo}>
        <img src={logo} alt="Travel Trucks" width={136} height={16} />
      </Link>
      <ul className={css.menu}>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/catalog">Catalog</NavLink></li>       
      </ul>     
    </nav>
  );
};

export default Navigation;
