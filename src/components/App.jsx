import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import Layout from './Layout';
import css from './App.module.css';

export const App = () => {
  const HomePage = lazy(() => import('../pages/Home'));
  const TweetsPage = lazy(() => import('../pages/Tweets'));

  return (
    <div className={css.container}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/tweets" element={<TweetsPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
};
