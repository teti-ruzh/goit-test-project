import { useLocation, Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import getTweets from '../../services/tweets-api';
import TweetsItem from '../../components/TweetsItem';

import css from './Tweets.module.css';

export default function Tweets() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [showLoadMore, setShowLoadMore] = useState(false);

  const location = useLocation();
  const pathToBack = useRef(location.state?.from ?? '/');

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('followingUsers'))) {
      return;
    }
    localStorage.setItem('followingUsers', JSON.stringify([]));
  }, []);

  useEffect(() => {
    setShowLoadMore(false);
    getTweets(page)
      .then(results => {
        if (page === 1 && !results.length) {
          Notify.error('Oops, something went wrong.');
          return;
        }
        setUsers(prevUsers =>
          page === 1 ? results : [...prevUsers, ...results]
        );

        setShowLoadMore(true);

        // setShowLoadMore(page < Math.ceil(users / 3));
      })
      .catch(error => {
        console.log(error);
      });
  }, [page]);

  const onLoadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <div className={css.container}>
      <Link to={pathToBack.current} className={css['load-more']}>
        Back
      </Link>
      <h1 className={css.title}>Wellcome to Tweets</h1>
      <ul className={css.gallery}>
        {users &&
          users.map(tweet => {
            return <TweetsItem {...tweet} key={tweet.id} name={tweet.user} />;
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
