import React from 'react';
import {Link} from 'react-router-dom';

const PostsList = ({results, limit}) => {
  const display = results.slice(0, limit);

  const isNotImage = (text) => {
    return text === 'self' || text === 'default' || text === 'image' || text === '';
  }
  return (
    <ul className='list-group'>
      {
        display.map(thread => {
          return (
            <li className='list-group-item'
                key={thread.data.id}>
              <div className='row'>
                <div className='col-sm-2 col-3'>
                  {
                    isNotImage(thread.data.thumbnail) &&
                    <img className='wbdv-thumbnail img-thumbnail'
                         src='https://www.redditinc.com/assets/images/site/reddit-logo.png' alt={thread.data.title}/>
                  }
                  {
                    !isNotImage(thread.data.thumbnail) &&
                    <img className='wbdv-thumbnail img-thumbnail' src={thread.data.thumbnail} alt={thread.data.title}/>
                  }
                </div>
                <div className='col-sm-10 col-9'>
                  <Link to={`/details/${thread.data.id}`}>
                    {thread.data.title}
                  </Link>
                </div>
              </div>
            </li>
          )
        })
      }
    </ul>
  );
}

export default PostsList;