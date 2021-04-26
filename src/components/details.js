import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import redditService from '../services/reddit-service';
import ReactMarkdown from 'react-markdown';
import {addFavorite, isFavorite, removeFavorite} from '../services/favorite-post-service';
import {createOrFindSubreddit} from '../services/subreddit-service';
import {addFavoriteSub, isFavoriteSub, removeFavoriteSub} from '../services/favorite-subreddit-service';

const Details = ({user}) => {
  const {redditId} = useParams();
  const [threadDetails, setThreadDetails] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [favPost, setFavPost] = useState(false);
  const history = useHistory();
  const [subreddit, setSubreddit] = useState({});
  const [favSub, setFavSub] = useState(false);
  useEffect(() => {
    redditService.findThreadById(redditId).then(resp => {
      setLoaded(true);
      setThreadDetails(resp[0].data.children[0].data)
      if (user) {
        createOrFindSubreddit(resp[0].data.children[0].data.subreddit)
          .then(sub => {
            setSubreddit(sub);
            isFavoriteSub(sub._id, user._id).then(res => setFavSub(res));
          });
      }
    });
    if (user) {
      isFavorite(redditId, user._id)
        .then(res => setFavPost(res))
    }
  }, [redditId, user]);

  const transformDate = (num) => {
    return new Date(num * 1000).toLocaleString();
  }

  const onClickAddFavorite = () => {
    addFavorite(redditId, user._id, user.username, threadDetails.title, threadDetails.thumbnail)
      .then(() => setFavPost(true));
  }

  const onClickAddFavoriteSub = () => {
    addFavoriteSub(subreddit._id, user._id).then(() => setFavSub(true));
  }

  const onClickRemoveFavoriteSub = () => {
    removeFavoriteSub(subreddit._id, user._id).then(() => setFavSub(false));
  }

  const onClickRemoveFavorite = () => {
    removeFavorite(redditId, user._id)
      .then(() => setFavPost(false));
  }

  return (
    <div>
      {
        !loaded &&
        <div className="d-flex justify-content-center">
          <div className="spinner-border m-5">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      }
      {
        loaded &&
        <div className='container-fluid'>
          <div className='row'>
            <div>
              <i className='fas fa-arrow-left fa-2x wbdv-clickable' onClick={() => history.goBack()}/>
            </div>
            <h3>{threadDetails.title}</h3>
          </div>
          {!threadDetails.is_self && <img className='mb-2' src={threadDetails.thumbnail} alt={threadDetails.title}/>}
          <div className='d-flex flex-row-reverse mb-2'>
          {
            user &&
            <div className='float-right'>
              <Link className='btn btn-outline-info mr-1' to='/profile'>See Favorites</Link>
              {
                !favPost &&
                <button className='btn btn-outline-success mr-1' onClick={onClickAddFavorite}>Add Favorite Post</button>
              }
              {
                favPost &&
                <button className='btn btn-outline-danger mr-1' onClick={onClickRemoveFavorite}>Remove Favorite
                  Post</button>
              }
              {
                !favSub && <button className='btn btn-outline-success' onClick={onClickAddFavoriteSub}>Add Favorite
                  Subreddit</button>
              }
              {
                favSub && <button className='btn btn-outline-danger' onClick={onClickRemoveFavoriteSub}>Remove Favorite
                  Subreddit</button>
              }
            </div>
          }
          {
            !user &&
            <div className='float-right'>
              <Link className='btn btn-outline-primary' to='/login'>Login to Favorite</Link>
            </div>
          }
          </div>
          <div className='row'>
            <div className={`${threadDetails.post_hint === 'image' ? 'col-lg-6 col-12' : 'col-12'}`}>
              <ul className='list-group'>
                <li className='list-group-item'>Date Posted: {transformDate(threadDetails.created_utc)}</li>
                <li className='list-group-item'>
                  <Link to={`/subreddit/${threadDetails.subreddit}`}>
                    Subreddit: {threadDetails.subreddit_name_prefixed}
                  </Link>
                </li>
                <li className='list-group-item'>
                  <a href={threadDetails.url} target='_blank' rel='noreferrer'>
                    Content Link ({threadDetails.domain})
                  </a>
                </li>
                <li className='list-group-item'>
                  <a href={`https://www.reddit.com${threadDetails.permalink}`} target='_blank' rel='noreferrer'>
                    Comments: {threadDetails.num_comments}
                  </a>
                </li>
                <li
                  className='list-group-item'>Upvotes: {threadDetails.ups} ({`${threadDetails.upvote_ratio * 100}%`})
                </li>
                <li className='list-group-item'>Awards: {threadDetails.total_awards_received}</li>
                {
                  threadDetails.selftext &&
                  <li className='list-group-item'>
                    <ReactMarkdown source={threadDetails.selftext}/>
                  </li>
                }
              </ul>
            </div>
            <div className='col-lg-6 col-12'>
              {threadDetails.post_hint === 'image' &&
              <div>
                <img className='wbdv-image' src={threadDetails.url} alt={threadDetails.title}/>
              </div>
              }
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default Details;