import React, {useState, useEffect} from 'react';
import {getAllFavoriteSubsForUser} from '../services/favorite-subreddit-service';
import {Link} from 'react-router-dom';

const UserFavSubs = ({user}) => {
  const [favoriteSubs, setFavoriteSubs] = useState([]);
  useEffect(() => {
    getAllFavoriteSubsForUser(user._id).then(res => setFavoriteSubs(res));
  }, [user]);
  return (
    <ul className='list-group'>
      {
        favoriteSubs.map(sub => <li key={sub._id} className='list-group-item'>
          <Link to={`/subreddit/${sub.subredditId.name}`}>{sub.subredditId.name}</Link>
        </li>)
      }
    </ul>
  )
}

export default UserFavSubs;