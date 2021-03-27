import React, {useEffect, useState} from 'react';
import redditService from '../services/reddit-service';
import {Link, useHistory, useParams} from 'react-router-dom';

const Search = () => {
  const {searchTerm} = useParams();
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (searchTerm) {
      setSearch(searchTerm);
      redditService.findThreadByTitle(searchTerm)
        .then(resp => {
          setResults(resp.data.children)
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
      <h1>Search</h1>
      <div className='row m-2'>
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

    </div>
  );
}

export default Search;