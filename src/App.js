import './App.css';
import Home from './components/home';
import {BrowserRouter, Route} from 'react-router-dom';
import Search from './components/search';
import Details from './components/details';
import Login from './components/login';
import Profile from './components/profile';
import ProfileDetails from './components/profile-details';
import Register from './components/register';

function App() {
  return (
    <div className='container-fluid'>
      <BrowserRouter>
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
               path={['/login']}
               component={Login}/>
        <Route exact={true}
               path={['/register']}
               component={Register}/>
        <Route exact={true}
               path={['/profile']}
               component={Profile}/>
        <Route exact={true}
               path={['/profile/:uid']}
               component={ProfileDetails}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
