import React, {useEffect, useState} from 'react';
import {findSubreddit} from '../services/reddit-service';
import {Link, useHistory, useParams} from 'react-router-dom';
import PostsList from './posts-list';
import {addFavoriteSub, isFavoriteSub, removeFavoriteSub} from '../services/favorite-subreddit-service';
import {createOrFindSubreddit} from '../services/subreddit-service';

const Subreddit = ({user}) => {
  const history = useHistory();
  const {subreddit} = useParams();
  const [results, setResults] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [sub, setSub] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    findSubreddit(subreddit).then(res => {
      if (res.data) {
        setResults(res.data.children);
        setLoaded(true);
      }
    }).catch(() => setLoaded(true));
    if (user) {
      createOrFindSubreddit(subreddit).then(res => {
        setSub(res);
        isFavoriteSub(res._id, user._id).then(resp => setIsFavorite(resp));
      });
    }
  }, [subreddit, user])

  const onClickAddFavoriteSub = () => {
    addFavoriteSub(sub._id, user._id).then(() => setIsFavorite(true));
  }

  const onClickRemoveFavoriteSub = () => {
    removeFavoriteSub(sub._id, user._id).then(() => setIsFavorite(false));
  }
  return (
    <div className='container-fluid'>
      <div className='d-flex flex-row'>
        <div>
          <i className='fas fa-arrow-left fa-2x m-2 wbdv-clickable' onClick={() => history.goBack()}/>
        </div>
        <h1 className='flex-fill'>Subreddit: {subreddit}</h1>
        <div className='m-2'>
          {
            user &&
            <>
              {
                !isFavorite && <button className='btn btn-outline-success' onClick={onClickAddFavoriteSub}>Add Favorite
                  Subreddit</button>
              }
              {
                isFavorite && <button className='btn btn-outline-danger' onClick={onClickRemoveFavoriteSub}>Remove Favorite
                  Subreddit</button>
              }
            </>
          }
          {
            !user &&
            <Link className='btn btn-outline-primary' to='/login'>Login to Favorite</Link>
          }
        </div>
      </div>
      <PostsList results={results} limit={25}/>
      {
        loaded && results.length === 0 && <div className='alert alert-warning'>
          Subreddit not found
        </div>
      }
    </div>
  )
}

export default Subreddit;