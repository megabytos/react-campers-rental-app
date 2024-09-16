import { NavLink } from "react-router-dom";
import PageTitle from '../../components/PageTitle/PageTitle';
import css from './NotFoundPage.module.css'

const NotFoundPage = () => {
  return (
    <main className={css.notfound}>
      <PageTitle title="Page Not found" />
      <h1>Page Not found</h1>
      <NavLink to="/">
        &larr; Go Home
      </NavLink>
    </main>
  );
};

export default NotFoundPage;
