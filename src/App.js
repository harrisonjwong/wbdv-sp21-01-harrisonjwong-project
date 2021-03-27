import './App.css';
import Home from './components/home';
import {BrowserRouter, Route} from 'react-router-dom';
import Search from './components/search';
import Details from './components/details';

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
      </BrowserRouter>
    </div>
  );
}

export default App;
