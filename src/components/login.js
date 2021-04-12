import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {login} from '../services/user-service';

const Login = ({user, setUser}) => {
  const history = useHistory();
  const [banner, setBanner] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const onClickLogin = () => {
    if (username === '' || password === '') {
      setBanner('All fields are required');
    } else {
      login(username, password)
        .then(res => {
          setUser(res);
          history.push('/');
        })
        .catch(() => setBanner('Invalid username or password'));
    }
  };

  const pressEnter = e => {
    if (e.charCode === 13) {
      onClickLogin();
    }
  }
  return (
    <div className='container-fluid'>
      <h1>Login</h1>
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
          <label htmlFor='username' className='col-sm-2 col-form-label'>Username</label>
          <input type='text'
                 className='col-sm-10 form-control'
                 id='username'
                 placeholder='alice1'
                 value={username}
                 onChange={e => setUsername(e.target.value)}
                 onKeyPress={pressEnter}/>
        </div>
        <div className='form-group row'>
          <label htmlFor='password' className='col-sm-2 col-form-label'>Password</label>
          <input type='password'
                 className='col-sm-10 form-control'
                 id='password'
                 placeholder='******'
                 value={password}
                 onChange={e => setPassword(e.target.value)}
                 onKeyPress={pressEnter}/>
        </div>
        <div className='row'>
          <div className='col text-center'>
            <button className='btn btn-primary btn-block'
                    onClick={onClickLogin}>Login
            </button>
          </div>
        </div>
        <div className='row'>
          <Link to='/register' className='col text-right'>Create an account</Link>
        </div>
      </>}
    </div>

  );
}

export default Login;