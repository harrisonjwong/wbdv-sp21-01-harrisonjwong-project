import React from 'react';
import {useHistory, useParams} from 'react-router-dom';
import UserFavPosts from './user-fav-posts';

const ProfileDetails = () => {
  const history = useHistory();
  const {uid} = useParams();
  return (
    <div>
      <div className='row'>
      <div className='wbdv-clickable' onClick={() => history.goBack()}>
        <i className='fas fa-arrow-left fa-2x m-2'/>
      </div>
      <h1>Profile: {uid}</h1>
      </div>
      <h3>Favorite Posts</h3>
      <UserFavPosts user={{username: uid}}/>
    </div>
  );
}

export default ProfileDetails;