import React, {useState, useEffect} from 'react';
import {getStatistics} from '../services/favorite-post-service';
import {Link} from 'react-router-dom';
import {getSubStatistics} from '../services/favorite-subreddit-service';

const PostStatistics = ({user}) => {
  const [stats, setStats] = useState([]);
  const [subStats, setSubStats] = useState([]);
  useEffect(() => {
    getStatistics().then(res => {
      res.sort((a, b) => b.numFavorites - a.numFavorites);
      setStats(res);
    });
    getSubStatistics().then(res => {
      res.sort((a, b) => b.numFavorites - a.numFavorites);
      setSubStats(res);
    })
  }, []);
  return (
    <div className='container-fluid'>
      <h1>Favorites Statistics</h1>
      <p>See which users have favorited the most posts and subreddits</p>
      {
        user && user.role === 'superuser' &&
        <div className='row'>
          <div className='col-lg-6 col-12'>
            <h3>Number of Favorite Posts</h3>
            {
              <ul className='list-group'>
                {
                  stats.map(person =>
                    <li className='list-group-item' key={person._id}>
                      <Link to={`/profile/${person._id}`}>{person._id}: {person.numFavorites}</Link>
                    </li>)
                }
              </ul>
            }
          </div>
          <div className='col-lg-6 col-12'>
            <h3>Number of Favorite Subreddits</h3>
            {
              <ul className='list-group'>
                {
                  subStats.map(person =>
                    <li className='list-group-item' key={person._id}>
                      <Link to={`/profile/${person.user.username}`}>{person.user.username}: {person.numFavorites}</Link>
                    </li>)
                }
              </ul>
            }
          </div>
        </div>
      }
      {
        (!(user && user.role === 'superuser')) &&
        <div className='alert alert-warning'>
          Need to be a superuser
        </div>
      }
    </div>
  );
}

export default PostStatistics;