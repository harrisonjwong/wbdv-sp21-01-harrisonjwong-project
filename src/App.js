import './App.css';
import Home from './components/home';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import Search from './components/search';
import Details from './components/details';
import Login from './components/login';
import Profile from './components/profile';
import ProfileDetails from './components/profile-details';
import Register from './components/register';
import {useEffect, useState} from 'react';
import {logout, profile} from './services/user-service';
import ProfileSearch from './components/profile-search';
import PostStatistics from './components/post-statistics';
import Subreddit from './components/subreddit';
import SubredditSearch from './components/subreddit-search';

function App() {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    profile().then(res => setUser(res));
  }, []);
  const onClickLogout = () => {
    return logout().then(() => setUser(undefined));
  }
  return (
    <div className='container-fluid mb-5'>
      <BrowserRouter>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <Link className='navbar-brand' to='/'>Reddit Saver</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                  aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>
          <div className='collapse navbar-collapse' id="navbarText">
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <Link className='nav-link' to='/search'>Post Search</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/profilesearch'>Profile Search</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/subredditsearch'>Subreddit Search</Link>
              </li>
              {
                user && user.role === 'superuser' &&
                  <li className='nav-item'>
                    <Link className='nav-link' to='/poststatistics'>User Statistics</Link>
                  </li>
              }
            </ul>
            {
              user &&
              <>
                <div className='mr-3'>
                  <Link to='/profile'>{user.displayName}</Link>
                </div>
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
          </div>

        </nav>
        <Route exact={true}
               path={['/']}>
          <Home user={user}/>
        </Route>
        <Route exact={true}
               path={['/search', '/search/:searchTerm']}
               component={Search}/>
        <Route exact={true}
               path={['/details/:redditId']}>
          <Details user={user}/>
        </Route>
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
        <Route exact={true}
               path={['/profilesearch']}
               component={ProfileSearch}/>
        <Route exact={true}
               path={['/poststatistics']}>
          <PostStatistics user={user}/>
        </Route>
        <Route exact={true}
               path={['/subreddit/:subreddit']}>
          <Subreddit user={user}/>
        </Route>
        <Route exact={true}
               path={['/subredditsearch']}>
          <SubredditSearch/>
        </Route>

      </BrowserRouter>
      {/*<footer className='footer bg-light pt-3 pb-3 bottom-nav wbdv-footer-space'>*/}
      {/*  <div className='container'>*/}
      {/*    <span className='text-secondary'>*/}
      {/*      Reddit Saver is a project for CS 5610 in Spring 2021.*/}
      {/*      <br/>*/}
      {/*      Source code located*/}
      {/*      {' '}<a href={'https://github.com/harrisonjwong/wbdv-sp21-01-harrisonjwong-project'}>here</a> and*/}
      {/*      {' '}<a href={'https://github.com/harrisonjwong/wbdv-sp21-01-harrisonjwong-project-backend'}>here</a>.*/}
      {/*    </span>*/}
      {/*  </div>*/}
      {/*</footer>*/}
    </div>
  );
}

export default App;
