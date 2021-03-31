export const findThreadByTitle = (title) =>
  fetch(`https://www.reddit.com/search/.json?q=${title}`, {
    mode: 'cors'
  }).then(response => response.json());

export const findThreadById = (redditId) =>
  fetch(`https://www.reddit.com/${redditId}/.json`, {
    mode: 'cors'
  }).then(response => response.json());

const api = {
  findThreadById,
  findThreadByTitle
}

export default api;