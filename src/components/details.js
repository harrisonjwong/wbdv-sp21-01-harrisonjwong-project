import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import redditService from '../services/reddit-service';

const Details = () => {
  const {redditId} = useParams();
  const [threadDetails, setThreadDetails] = useState({});
  const history = useHistory();
  useEffect(() => {
    redditService.findThreadById(redditId).then(resp => {
      console.log(resp[0].data.children[0].data)
      setThreadDetails(resp[0].data.children[0].data)
    })
  }, [redditId]);

  const transformDate = (num) => {
    return new Date(num * 1000).toLocaleString();
  }
  return (
    <div>
      <i className='fas fa-arrow-left fa-2x wbdv-clickable' onClick={() => history.goBack()}/>
      <h3>{threadDetails.title}</h3>
      <img className='mb-2' src={threadDetails.thumbnail} alt={threadDetails.title}/>
      <ul className='list-group'>
        <li className='list-group-item'>Date Posted: {transformDate(threadDetails.created_utc)}</li>
        <li className='list-group-item'>
          <a href={`https://www.reddit.com/r/${threadDetails.subreddit}`}>
            Subreddit: {threadDetails.subreddit_name_prefixed}
          </a>
        </li>
        <li className='list-group-item'>
          <a href={threadDetails.url}>Content Link ({threadDetails.domain})</a>
        </li>
        <li className='list-group-item'>
          <a href={`https://www.reddit.com${threadDetails.permalink}`}>Comments: {threadDetails.num_comments}</a>
        </li>
        <li className='list-group-item'>Upvotes: {threadDetails.ups} ({`${threadDetails.upvote_ratio * 100}%`})</li>
        <li className='list-group-item'>Awards: {threadDetails.total_awards_received}</li>

        {
          threadDetails.post_hint === 'image' &&
            <li className='list-group-item'>
              <img className='wbdv-image' src={threadDetails.url} alt={threadDetails.title}/>
            </li>
        }
        {
          threadDetails.selftext &&
          <li className='list-group-item'>
            {threadDetails.selftext}
          </li>
        }
      </ul>
    </div>
  );
}

export default Details;