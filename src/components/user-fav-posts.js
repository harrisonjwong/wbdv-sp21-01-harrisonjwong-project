import React, {useEffect, useState} from 'react';
import {getAllFavoritePostsForUsername} from '../services/favorite-post-service';
import {Link} from 'react-router-dom';

const UserFavPosts = ({user}) => {
  const [favPosts, setFavPosts] = useState([]);
  useEffect(() => {
    if (user) {
      getAllFavoritePostsForUsername(user.username).then(res => setFavPosts(res));
    }
  }, [user]);
  const isNotImage = (text) => {
    return text === 'self' || text === 'default' || text === 'image' || text === ''
      || text === 'spoiler' || text === 'nsfw';
  }
  return (
    <ul className='list-group'>
      {favPosts.map(fp =>
        <li className='list-group-item' key={fp._id}>
          <div className='row'>
            <div className='col-sm-2 col-3'>

              {
                isNotImage(fp.thumbnail) && <img className='wbdv-thumbnail img-thumbnail'
                                                 src='https://www.redditinc.com/assets/images/site/reddit-logo.png'
                                                 alt={fp.threadTitle}/>
              }
              {
                !isNotImage(fp.thumbnail) &&
                <img src={fp.thumbnail} alt={fp.threadTitle} className='wbdv-thumbnail img-thumbnail'/>
              }
            </div>
            <div className='col-sm-10 col-9'>
              <Link to={`/details/${fp.threadId}`}>
                {fp.threadTitle}

              </Link>
            </div>
          </div>
        </li>
      )}
    </ul>
  )
}

export default UserFavPosts;