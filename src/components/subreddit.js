import React, {useEffect, useState} from 'react';
import {findSubreddit} from '../services/reddit-service';
import {useHistory, useParams} from 'react-router-dom';
import PostsList from './posts-list';

const Subreddit = () => {
  const history = useHistory();
  const {subreddit} = useParams();
  const [results, setResults] = useState([]);
  useEffect(() => {
    findSubreddit(subreddit).then(res => {
      if (res.data) {
        setResults(res.data.children)
      }
    }).catch(() => setResults([]));
  }, [subreddit])
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div>
          <i className='fas fa-arrow-left fa-2x m-2 wbdv-clickable' onClick={() => history.goBack()}/>
        </div>
        <h1>Subreddit: {subreddit}</h1>
      </div>
      <PostsList results={results} limit={25}/>
      {
        results.length === 0 && <div className='alert alert-warning'>
          Subreddit not found
        </div>
      }
    </div>
  )
}

export default Subreddit;