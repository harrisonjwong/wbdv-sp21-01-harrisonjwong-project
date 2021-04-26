import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

const ProfileSearch = () => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');
  const goToProfile = () => {
    history.push(`/profile/${searchTerm}`);
  }
  const pressEnter = e => {
    if (e.charCode === 13) {
      goToProfile();
    }
  }
  return (
    <div className='container-fluid'>
      <h1>Profile Search</h1>
      <p>Enter a username to see his/her favorite posts</p>
      <div className='row m-1'>
      <input className='form-control col-9'
             onKeyPress={pressEnter}
             onChange={e => setSearchTerm(e.target.value)}
             value={searchTerm}/>
      <button className='btn btn-outline-primary col-3' onClick={goToProfile}>Search</button>
      </div>
    </div>
  );
}

export default ProfileSearch;