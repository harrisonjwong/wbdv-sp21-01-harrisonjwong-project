import React, {useEffect, useState} from 'react';
import redditService from '../services/reddit-service';
import PostsList from './posts-list';
import UserFavPosts from './user-fav-posts';

const Home = ({user}) => {
  const [topPosts, setTopPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    redditService.findTopToday().then(resp => {
      setLoaded(true);
      setTopPosts(resp.data.children);
    });
  }, []);
  return (
    <div className='container-fluid'>
      <h1>Home</h1>
      <p>See today's top posts and your favorited posts!</p>
      <div className='row'>
        <div className={`${user ? 'col-12 col-lg-6' : 'col-12'}`}>
          <h3>Today's Top Posts</h3>
          {
            loaded &&
            <>
              <PostsList results={topPosts} limit={10}/>
            </>
          }
          {
            !loaded &&
            <div className="d-flex justify-content-center">
              <div className="spinner-border m-3">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          }
        </div>
        <div className='col-12 col-lg-6'>
          {
            user && <>
              <h3>My Favorite Posts</h3>
              <UserFavPosts user={user}/>
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default Home;