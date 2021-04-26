// const NODE_API = 'http://localhost:3001/api';
const NODE_API = 'http://wbdv-harrisonjwong-project-be.herokuapp.com/api';

export const isFavoriteSub = (subredditId, userId) => {
  return fetch(`${NODE_API}/favoritesub/check/${subredditId}/${userId}`)
    .then(res => res.json());
}

export const addFavoriteSub = (subredditId, userId) => {
  return fetch(`${NODE_API}/favoritesub/create`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({subredditId, userId})
  }).then(res => res.json());
}

export const removeFavoriteSub = (subredditId, userId) => {
  return fetch(`${NODE_API}/favoritesub/remove`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({subredditId, userId})
  }).then(res => res.json());
}

export const getAllFavoriteSubsForUser = (userId) => {
  return fetch(`${NODE_API}/favoritesub/user/${userId}`)
    .then(res => res.json());
}

export const getSubStatistics = () => {
  return fetch(`${NODE_API}/favoritesub/countByUser`)
    .then(res => res.json());
}

const api = {
  isFavoriteSub,
  addFavoriteSub,
  removeFavoriteSub,
  getAllFavoriteSubsForUser,
  getSubStatistics
}

export default api;