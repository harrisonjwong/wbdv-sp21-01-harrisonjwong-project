import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {register} from '../services/user-service';

const Register = ({user}) => {
  const history = useHistory();
  const [banner, setBanner] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const onClickRegister = () => {
    if (username === '' || password === '' || displayName === '') {
      setBanner('All fields are required');
    } else {
      register(username, password, displayName)
        .then(() => history.push('/login'))
        .catch(() => setBanner('Username already in use'));
    }
  }
  const pressEnter = e => {
    if (e.charCode === 13) {
      onClickRegister();
    }
  }
  return (
    <div className='container-fluid'>
      <h1>Register</h1>
      {
        banner &&
        <div className='alert alert-danger'>
          {banner}
        </div>
      }
      {
        user &&
        <>
          <div className='alert alert-info'>
            You're already logged in
          </div>
          <button className='btn btn-outline-secondary'
                  onClick={() => history.goBack()}>
            Go Back
          </button>
        </>
      }
      {!user && <>
        <div className='form-group row'>
          <label htmlFor='displayName' className='col-sm-2 col-form-label'>Display Name</label>
          <input type='text'
                 className='col-sm-10 form-control'
                 id='displayName'
                 placeholder='Alice'
                 value={displayName}
                 onKeyPress={pressEnter}
                 onChange={e => setDisplayName(e.target.value)}/>
        </div>
        <div className='form-group row'>
          <label htmlFor='username' className='col-sm-2 col-form-label'>Username</label>
          <input type='text'
                 className='col-sm-10 form-control'
                 id='username'
                 placeholder='alice1'
                 value={username}
                 onKeyPress={pressEnter}
                 onChange={e => setUsername(e.target.value)}/>
        </div>
        <div className='form-group row'>
          <label htmlFor='password' className='col-sm-2 col-form-label'>Password</label>
          <input type='password'
                 className='col-sm-10 form-control'
                 id='password'
                 placeholder='******'
                 value={password}
                 onKeyPress={pressEnter}
                 onChange={e => setPassword(e.target.value)}/>
        </div>
        <div className='row'>
          <div className='col text-center'>
            <button className='btn btn-success btn-block' onClick={onClickRegister}>Register</button>
          </div>
        </div>
        <div className='row'>
          <Link to='/login' className='col text-right'>Login page</Link>
        </div>
      </>}
    </div>
  );
}

export default Register;