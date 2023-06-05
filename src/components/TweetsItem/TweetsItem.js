import { useState } from 'react';
import logo from '../../images/logo.svg';
import backgroundImg from '../../images/bgrImage.png';
import circle from '../../images/ellipse.png';
import userDfltImg from '../../images/userDfltImg.png';

import css from './TweetsItem.module.css';

const TweetsItem = ({ id, tweets, avatar, followers }) => {
  const user = JSON.parse(localStorage.getItem(`user${id}`)) ?? false;
  const userFollowing = user.following;
  const [isFollowing, setIsFollowing] = useState(userFollowing);

  const handleBtn = userId => {
    const userObj = { userId, following: !isFollowing };
    localStorage.setItem(`user${userId}`, JSON.stringify(userObj));

    const userData = JSON.parse(localStorage.getItem(`user${userId}`));

    setIsFollowing(userData.following);

    const localFollowingUsers = JSON.parse(
      localStorage.getItem(`followingUsers`)
    );

    if (
      isFollowing &&
      JSON.parse(localStorage.getItem('followingUsers')).includes(userId)
    ) {
      const index = localFollowingUsers.indexOf(userId);
      localFollowingUsers.splice(index, 1);
      const newArr = Array.from(new Set(localFollowingUsers));
      localStorage.setItem('followingUsers', JSON.stringify(newArr));
    } else {
      localFollowingUsers.push(userId);

      localStorage.setItem(
        'followingUsers',
        JSON.stringify(localFollowingUsers)
      );
    }
  };

  const transformFollowersNumber = number => {
    const string = number.toString().split('');
    if (string.length > 6) {
      string.splice(-6, 0, ',');
    }
    string.splice(-3, 0, ',');

    string.join('');
    return string;
  };

  return (
    <li className={css.tweetThumb}>
      <div className={css.content}>
        <div className={css.imageBox}>
          <img
            className={css.logo}
            src={logo}
            alt="logo"
            width="76"
            height="20"
          />
          <img src={backgroundImg} alt="background" width="308" height="168" />
        </div>

        <div className={css.line}></div>
        <div className={css.avatarThumb}>
          <img className={css.circle} src={circle} alt="circle" />
          {avatar ? (
            <img className={css.avatar} src={avatar} alt="avatar" />
          ) : (
            <img className={css.avatar} src={userDfltImg} alt="avatar" />
          )}
        </div>
        <ul className={css.info}>
          <li>{tweets} Tweets</li>
          <li>
            {isFollowing
              ? transformFollowersNumber(followers + 1)
              : transformFollowersNumber(followers)}{' '}
            Followers
          </li>
        </ul>

        {isFollowing ? (
          <button
            type="button"
            className={css.followingBtn}
            onClick={() => handleBtn(id)}
          >
            Following
          </button>
        ) : (
          <button
            type="button"
            className={css.followBtn}
            onClick={() => handleBtn(id)}
          >
            Follow
          </button>
        )}
      </div>
    </li>
  );
};

export default TweetsItem;
