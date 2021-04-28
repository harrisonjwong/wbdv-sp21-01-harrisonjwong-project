import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {register} from '../services/user-service';

const Register = ({user}) => {
  const history = useHistory();
  const [banner, setBanner] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('2021-04-26')
  const onClickRegister = () => {
    if (username === '' || password === '' || displayName === '') {
      setBanner('All fields are required');
    } else {
      register(username, password, displayName, role, email, dob)
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
        { role === 'user' && <div className='form-group row'>
          <label htmlFor='email' className='col-sm-2 col-form-label'>Email</label>
          <input type='email'
                 className='col-sm-10 form-control'
                 id='email'
                 placeholder='alice@email.com'
                 value={email}
                 onKeyPress={pressEnter}
                 onChange={e => setEmail(e.target.value)}/>
        </div>}
        { role === 'superuser' && <div className='form-group row'>
          <label htmlFor='dob' className='col-sm-2 col-form-label'>DOB</label>
          <input type='dob'
                 className='col-sm-10 form-control'
                 id='date'
                 placeholder='2021-04-26'
                 value={dob}
                 onKeyPress={pressEnter}
                 onChange={e => setDob(e.target.value)}/>
        </div>}
        <div className='form-group row'>
          <label htmlFor='role' className='col-sm-2 col-form-label'>Role</label>
          <select className='col-sm-10 form-control' value={role} onChange={(e) => setRole(e.target.value)}>
            <option value={'superuser'}>Superuser (see user statistics)</option>
            <option value={'user'}>User (save posts and subreddits)</option>
          </select>
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