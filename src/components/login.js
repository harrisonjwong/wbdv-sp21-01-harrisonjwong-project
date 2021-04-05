import React from 'react';
import {Link, useHistory} from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  return (
    <div className='container-fluid'>
      <div className='row'>
        <i className='fas fa-arrow-left fa-2x wbdv-clickable mt-2 mr-2' onClick={() => history.goBack()}/>
        <h1>Login</h1>
      </div>
      <div className='form-group row'>
        <label htmlFor='username' className='col-sm-2 col-form-label'>Username</label>
        <input type='text' className='col-sm-10 form-control' id='username' placeholder='alice1'/>
      </div>
      <div className='form-group row'>
        <label htmlFor='password' className='col-sm-2 col-form-label'>Password</label>
        <input type='password' className='col-sm-10 form-control' id='password' placeholder='******'/>
      </div>
      <div className='row'>
        <div className='col text-center'>
          <button className='btn btn-primary btn-block'>Login</button>
        </div>
      </div>
      <div className='row'>
        <Link to='/register' className='col text-right'>Create an account</Link>
      </div>
    </div>
  );
}

export default Login;