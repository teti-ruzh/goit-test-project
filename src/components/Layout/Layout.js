import { Outlet, NavLink } from 'react-router-dom';
import { Suspense } from 'react';
import Loader from '../Loader';
import css from './Layout.module.css';

export default function Layout() {
  return (
    <div>
      <header className={css.header}>
        <nav>
          <NavLink to="/" className={css.link}>
            Home
          </NavLink>
          <NavLink to="/tweets" className={css.link}>
            Tweets
          </NavLink>
        </nav>
      </header>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
