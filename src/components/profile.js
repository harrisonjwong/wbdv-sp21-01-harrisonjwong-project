import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {profile, updateUser} from '../services/user-service';
import UserFavPosts from './user-fav-posts';
import UserFavSubs from './user-fav-subs';

const Profile = ({user, setUser}) => {
  const history = useHistory();
  const [editing, setEditing] = useState(false);

  const onChangeDisplay = (e) => {
    const text = e.target.value;
    setUser({...user, displayName: text});
  }

  const onChangePassword = (e) => {
    const text = e.target.value;
    setUser({...user, password: text})
  }

  const onChangeRole = (e) => {
    const roleVal = e.target.value;
    setUser({...user, role: roleVal});
  }

  const onClickSave = () => {
    updateUser(user).then(() => setEditing(false));
    // setEditing(false);
  }
  const onClickCancel = () => {
    profile().then(res => setUser(res));
    setEditing(false);
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div>
          <i className='fas fa-arrow-left fa-2x m-2 wbdv-clickable' onClick={() => history.goBack()}/>
        </div>
        <h1>My Profile</h1>
      </div>
      {!user &&
      <>
        <div className='alert alert-warning'>
          Not logged in
        </div>
        <Link className='btn btn-outline-primary' to='/login'>Go to login page</Link>
      </>
      }
      {
        user && !editing &&
        <div>
          <h3>User Information</h3>
          <button className='btn btn-outline-primary float-right' onClick={() => setEditing(true)}>Edit profile</button>
          <ul className='list-group mt-5'>
            <li className='list-group-item'>Display Name: {user.displayName}</li>
            <li className='list-group-item'>Username: {user.username}</li>
            <li className='list-group-item'>Profile ID: {user._id}</li>
            <li className='list-group-item'>Role: {user.role}</li>
          </ul>

          <div className='row mt-3'>
            <div className='col-lg-6 col-12'>
              <h3>Favorite Posts</h3>
              <UserFavPosts user={user}/>
            </div>
            <div className='col-lg-6 col-12'>
              <h3>Favorite Subreddits</h3>
              <UserFavSubs user={user}/>
            </div>
          </div>
        </div>
      }
      {
        user && editing &&
        <div>
          <ul className='list-group'>
            <li className='list-group-item'>Display Name:
              <input className='form-control'
                     value={user.displayName}
                     onChange={onChangeDisplay}
              />
            </li>
            <li className='list-group-item'>Username: {user.username} (cannot change)</li>
            <li className='list-group-item'>New password:
              <input className='form-control'
                     type='password'
                     value={user.password}
                     onChange={onChangePassword}
              />
            </li>
            <li className='list-group-item'>Profile ID: {user._id} (cannot change)</li>
            <li className='list-group-item'>Role:
              <select className='form-control' onChange={onChangeRole} value={user.role}>
                <option value={'user'}>User (save posts and subreddits)</option>
                <option value={'superuser'}>Superuser (see user statistics)</option>
              </select>
            </li>
          </ul>
          <button className='btn btn-outline-success mr-1' onClick={onClickSave}>Save profile</button>
          <button className='btn btn-outline-danger' onClick={onClickCancel}>Discard changes</button>
        </div>
      }
    </div>
  );
}

export default Profile;