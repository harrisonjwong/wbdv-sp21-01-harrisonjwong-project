import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import UserFavPosts from './user-fav-posts';
import UserFavSubs from './user-fav-subs';
import {findUser} from '../services/user-service';

const ProfileDetails = () => {
  const history = useHistory();
  const {uid} = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    findUser(uid).then(res => setUser(res));
  }, [uid])
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='wbdv-clickable' onClick={() => history.goBack()}>
          <i className='fas fa-arrow-left fa-2x m-2'/>
        </div>
        <h1>Profile: {uid}</h1>
      </div>
      {user && <div className='row'>
        <div className='col-lg-6 col-12'>
          <h3>Favorite Posts</h3>
          <UserFavPosts user={{username: uid}}/>
        </div>
        <div className='col-lg-6 col-12'>
          <h3>Favorite Subreddits</h3>
          <UserFavSubs user={user}/>
        </div>
      </div>}
      {!user && <div className='alert alert-warning'>
        User not found
      </div>}
    </div>
  );
}

export default ProfileDetails;