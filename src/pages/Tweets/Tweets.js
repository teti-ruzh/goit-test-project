import { useLocation, Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import api from '../../services/tweets-api';
import TweetsItem from '../../components/TweetsItem';
import Loader from '../../components/Loader';

import css from './Tweets.module.css';

export default function Tweets() {
  const [users, setUsers] = useState([]);
  const [totalusers, setTotalUsers] = useState(null);
  const [page, setPage] = useState(1);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const location = useLocation();
  const pathToBack = useRef(location.state?.from ?? '/');

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('followingUsers'))) {
      return;
    }
    localStorage.setItem('followingUsers', JSON.stringify([]));
  }, []);

  useEffect(() => {
    api
      .getAllUsers()
      .then(results => {
        if (!results.length) {
          return;
        }
        setTotalUsers(results.length);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setIsloading(true);
    api
      .getTweets(page)
      .then(results => {
        if (page === 1 && !results.length) {
          Notify.error('Oops, something went wrong.');
          return;
        }
        setUsers(prevUsers =>
          page === 1 ? results : [...prevUsers, ...results]
        );

        setShowLoadMore(page < Math.ceil(totalusers / 3));
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsloading(false);
      });
  }, [page, totalusers]);

  const onLoadMore = () => {
    setPage(page => page + 1);
  };

  useEffect(() => {
    if (users.length === totalusers) Notify.info('Sorry, no more users found');
  }, [users, totalusers]);

  return (
    <div className={css.container}>
      {isLoading && <Loader />}
      <Link to={pathToBack.current} className={css['load-more']}>
        Back
      </Link>
      <h1 className={css.title}>Wellcome to Tweets</h1>
      <ul className={css.gallery}>
        {users &&
          users.map(tweet => {
            return <TweetsItem {...tweet} key={tweet.id} />;
          })}
      </ul>
      {showLoadMore && (
        <button type="button" className={css['load-more']} onClick={onLoadMore}>
          Load more
        </button>
      )}
    </div>
  );
}
