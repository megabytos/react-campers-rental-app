import { Link, useLocation } from 'react-router-dom';
import Button from '../../components/Button/Button';
import css from './HomePage.module.css';

const HomePage = () => {
  const location = useLocation();
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1>Campers of your dreams</h1>
        <p>You can find everything you want in our catalog</p>
        <Button>
          <Link to="/catalog" state={location} className={css.link}>
            View Now
          </Link>
        </Button>
      </div>
    </main>
  );
};

export default HomePage;
