import React, {useState, useEffect} from 'react';
import {getStatistics} from '../services/favorite-post-service';
import {Link} from 'react-router-dom';

const PostStatistics = ({user}) => {
  const [stats, setStats] = useState([]);
  useEffect(() => {
    getStatistics().then(res => {
      res.sort((a, b) => b.numFavorites - a.numFavorites)
      setStats(res)
    });
  }, []);
  return (
    <div className='container-fluid'>
      <h1>Number of Favorite Posts by User</h1>
      {
        user && user.role === 'superuser' &&
        <ul className='list-group'>
          {
            stats.map(person =>
              <li className='list-group-item' key={person._id}>
                <Link to={`/profile/${person._id}`}>{person._id}: {person.numFavorites}</Link>
              </li>)
          }
        </ul>
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