import { MoonLoader } from 'react-spinners';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.overlay}>
      <MoonLoader size={50} color="#000" cssOverride={{ margin: '10px auto' }} aria-label="Loading" />
    </div>    
  );
};

export default Loader;
