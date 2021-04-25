export const findThreadByTitle = (title) =>
  fetch(`https://www.reddit.com/search/.json?q=${title}`, {
    mode: 'cors'
  }).then(response => response.json());

export const findThreadById = (redditId) =>
  fetch(`https://www.reddit.com/${redditId}/.json`, {
    mode: 'cors'
  }).then(response => response.json());

export const findTopToday = () =>
  fetch(`https://www.reddit.com/r/all/.json`, {
    mode: 'cors'
  }).then(response => response.json());

const api = {
  findThreadById,
  findThreadByTitle,
  findTopToday
}

export default api;