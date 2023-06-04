import { Outlet, NavLink } from 'react-router-dom';
import { Suspense } from 'react';
import { Circles } from 'react-loader-spinner';
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
      <Suspense
        fallback={
          <div className={css.loaderBackdrop}>
            <Circles
              height="100"
              width="100"
              color="#8F81F8"
              ariaLabel="circles-loading"
              wrapperClass={css.loading}
            />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </div>
  );
}
