const NODE_API = 'http://localhost:3001/api';
// const NODE_API = 'http://wbdv-harrisonjwong-project-be.herokuapp.com/api';

export const isFavorite = (threadId, userId) => {
  return fetch(`${NODE_API}/favoritepost/check/${threadId}/${userId}`)
    .then(res => res.json());
}

export const addFavorite = (threadId, userId, username, threadTitle) => {
  return fetch(`${NODE_API}/favoritepost/create`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({threadId, userId, username, threadTitle})
  }).then(res => res.json());
}

export const removeFavorite = (threadId, userId) => {
  return fetch(`${NODE_API}/favoritepost/remove`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({threadId, userId})
  }).then(res => res.json());
}

export const getAllFavoritePostsForUser = (userId) => {
  return fetch(`${NODE_API}/favoritepost/user/${userId}`)
    .then(res => res.json());
}

export const getAllFavoritePostsForUsername = (username) => {
  return fetch(`${NODE_API}/favoritepost/username/${username}`)
    .then(res => res.json());
}

export const allFavorites = () => {
  return fetch(`${NODE_API}/favoritepost/all`)
    .then(res => res.json());
}

const api = {
  isFavorite,
  addFavorite,
  removeFavorite,
  getAllFavoritePostsForUser,
  getAllFavoritePostsForUsername,
  allFavorites
}

export default api;