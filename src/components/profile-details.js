import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {getAllFavoritePostsForUsername} from '../services/favorite-post-service';

const ProfileDetails = () => {
  const {uid} = useParams();
  const [favPosts, setFavPosts] = useState([]);
  useEffect(() => {
    if (uid) {
      getAllFavoritePostsForUsername(uid).then(res => setFavPosts(res));
    }
  }, [uid]);
  return (
    <div>
      <h1>Profile: {uid}</h1>
      <h3>Favorite Posts</h3>
      <ul className='list-group'>
        {favPosts.map(fp =>
          <Link key={fp._id}
                className='list-group-item'
                to={`/details/${fp.threadId}`}>
            {fp.threadTitle}
          </Link>
        )}
      </ul>
    </div>
  );
}

export default ProfileDetails;