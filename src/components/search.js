import React, {useEffect, useState} from 'react';
import redditService from '../services/reddit-service';
import {Link, useHistory, useParams} from 'react-router-dom';

const Search = () => {
  const {searchTerm} = useParams();
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (searchTerm) {
      setSearch(searchTerm);
      redditService.findThreadByTitle(searchTerm)
        .then(resp => {
          setLoaded(true);
          setResults(resp.data.children);
        });
    }
  }, [searchTerm])

  const updateSearch = () => history.push(`/search/${search}`);

  const pressEnter = e => {
    if (e.charCode === 13) {
      updateSearch();
    }
  }

  return (
    <div>
      <Link to='/'>
        <i className='fas fa-arrow-left fa-2x'/>
      </Link>
      <h1>Search</h1>
      <div className='row m-1'>
        <input onChange={e => setSearch(e.target.value)}
               className='form-control col-10'
               onKeyPress={pressEnter}
               value={search}/>
        <button onClick={updateSearch}
                className='btn btn-primary btn-block col-2'>
          Search
        </button>
      </div>
      <br/>
      {
        !loaded && searchTerm !== undefined &&
        <div className="d-flex justify-content-center">
          <div className="spinner-border m-3">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      }
      {
        loaded &&
        <ul className='list-group'>
          {
            results.map(thread => {
              return (
                <li className='list-group-item'
                    key={thread.data.id}>
                  <Link to={`/details/${thread.data.id}`}>
                    {thread.data.title}
                  </Link>
                </li>
              )
            })
          }
        </ul>
      }
    </div>
  );
}

export default Search;