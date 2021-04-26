import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

const SubredditSearch = () => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');
  const goToSubreddit = () => {
    history.push(`/subreddit/${searchTerm}`);
  }
  const pressEnter = e => {
    if (e.charCode === 13) {
      goToSubreddit();
    }
  }
  return (
    <div className='container-fluid'>
      <h1>Subreddit Search</h1>
      <p>Enter a subreddit name to see posts from it</p>
      <div className='row m-1'>
        <input className='form-control col-9'
               onKeyPress={pressEnter}
               onChange={e => setSearchTerm(e.target.value)}
               placeholder='pics'
               value={searchTerm}/>
        <button className='btn btn-outline-primary col-3' onClick={goToSubreddit}>Search</button>
      </div>
    </div>
  );
}

export default SubredditSearch;