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
        <div className='list-group-item'>
          Note: Login and Register do not work yet. For P2 (Project Prototype), click Search.
        </div>
      </ul>
    </div>
  );
}

export default Home;