import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <ul className='list-group'>
        <Link to='/search' className='list-group-item'>
          Search
        </Link>
        <Link to='/login' className='list-group-item'>
          Login
        </Link>
        <Link to='/register' className='list-group-item'>
          Register
        </Link>
        <Link to='/profile' className='list-group-item'>
          Profile
        </Link>
      </ul>
    </div>
  );
}

export default Home;