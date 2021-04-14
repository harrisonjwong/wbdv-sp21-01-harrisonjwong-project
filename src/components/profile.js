import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {profile, updateUser} from '../services/user-service';

const Profile = ({user, setUser}) => {
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
    updateUser(user);
    setEditing(false);
  }
  const onClickCancel = () => {
    profile().then(res => setUser(res));
    setEditing(false);
  }

  return (
    <div className='container-fluid'>
      <h1>Profile</h1>
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
          <button className='btn btn-outline-primary' onClick={() => setEditing(true)}>Edit profile</button>
          <ul className='list-group'>
            <li className='list-group-item'>Display Name: {user.displayName}</li>
            <li className='list-group-item'>Username: {user.username}</li>
            <li className='list-group-item'>Password: (hidden)</li>
            <li className='list-group-item'>Profile ID: {user._id}</li>
            <li className='list-group-item'>Role: {user.role}</li>
          </ul>
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
                <option value='user'>User</option>
                <option value='superuser'>Superuser</option>
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