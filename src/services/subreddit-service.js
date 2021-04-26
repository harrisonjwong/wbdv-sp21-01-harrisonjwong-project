const NODE_API = 'http://localhost:3001/api';

export const createOrFindSubreddit = (name) =>
  fetch(`${NODE_API}/subreddit/createOrFind`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({name})
  }).then(response => response.json());

const api = {
  createOrFindSubreddit
}

export default api;
