import { Outlet, NavLink } from 'react-router-dom';
import { Suspense } from 'react';
import css from './Layout.module.css';

export default function Layout() {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 16px' }}>
      <header className={css.header}>
        <nav>
          <NavLink to="/" className={css.link}>
            Home
          </NavLink>
          <NavLink to="/tweets" className={css.link}>
            Tweets
          </NavLink>
        </nav>
        {/* {isLoggedIn ? <UserMenu /> : <AuthNav />} */}
      </header>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
}
