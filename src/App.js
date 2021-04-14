import './App.css';
import Home from './components/home';
import {BrowserRouter, Link, Route, useHistory} from 'react-router-dom';
import Search from './components/search';
import Details from './components/details';
import Login from './components/login';
import Profile from './components/profile';
import ProfileDetails from './components/profile-details';
import Register from './components/register';
import {useEffect, useState} from 'react';
import {logout, profile} from './services/user-service';

function App() {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    profile().then(res => setUser(res));
  }, []);
  const onClickLogout = () => {
    return logout().then(() => setUser(undefined));
  }
  return (
    <div className='container-fluid'>
      <BrowserRouter>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <Link className='navbar-brand' to='/'>Reddit Saver</Link>
          <div className='collapse navbar-collapse'>
            <div className='navbar-nav'>
              <Link className='nav-item nav-link' to='/search'>Search</Link>
            </div>
          </div>
          {
            user &&
            <>
              <div className='text-primary mr-3'>{user.displayName}</div>
              <button className='btn btn-outline-secondary' onClick={onClickLogout}>Logout</button>
            </>
          }
          {
            !user &&
            <>
              <Link className='btn btn-outline-success mr-1' to='/register'>Register</Link>
              <Link className='btn btn-outline-primary' to='/login'>Login</Link>
            </>
          }
        </nav>
        <Route exact={true}
               path={['/']}
               component={Home}/>
        <Route exact={true}
               path={['/search', '/search/:searchTerm']}
               component={Search}/>
        <Route exact={true}
               path={['/details/:redditId']}
               component={Details}/>
        <Route exact={true}
               path={['/login']}>
          <Login user={user} setUser={setUser}/>
        </Route>
        <Route exact={true}
               path={['/register']}>
          <Register user={user}/>
        </Route>
        <Route exact={true}
               path={['/profile']}>
          <Profile user={user} setUser={setUser}/>
        </Route>
        <Route exact={true}
               path={['/profile/:uid']}
               component={ProfileDetails}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
