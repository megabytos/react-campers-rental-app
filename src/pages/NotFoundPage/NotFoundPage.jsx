import { NavLink } from "react-router-dom";
import css from './NotFoundPage.module.css'

const NotFoundPage = () => {
  return (
    <main className={css.notfound}>
      <h1>Page Not found</h1>
      <NavLink to="/">
        &larr; Go Home
      </NavLink>
    </main>
  );
};

export default NotFoundPage;
