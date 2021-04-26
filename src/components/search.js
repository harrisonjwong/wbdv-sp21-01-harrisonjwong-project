import React, {useEffect, useState} from 'react';
import redditService from '../services/reddit-service';
import {useHistory, useParams} from 'react-router-dom';
import PostsList from './posts-list';

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
    <div className='container-fluid'>
      <h1>Post Search</h1>
      <p>Enter a search term to search the entirety of reddit</p>
      <div className='row m-1'>
        <input onChange={e => setSearch(e.target.value)}
               className='form-control col-9'
               onKeyPress={pressEnter}
               value={search}/>
        <button onClick={updateSearch}
                className='btn btn-outline-primary col-3'>
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
        <PostsList results={results} limit={25}/>
      }
    </div>
  );
}

export default Search;