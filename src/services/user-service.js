const USER_API = 'http://localhost:3001/api';
// const USER_API = 'http://wbdv-harrisonjwong-project-be.herokuapp.com/api';


export const register = (username, password, displayName, role) => {
  return fetch(`${USER_API}/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({username, password, displayName, role})
  }).then(response => response.json());
}

export const login = (username, password) => {
  return fetch(`${USER_API}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({username, password})
  }).then(response => response.json());
}

export const profile = () => {
  return fetch(`${USER_API}/profile`, {
    credentials: 'include'
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      return undefined;
    }
  });
}

export const updateUser = (body) => {
  return fetch(`${USER_API}/profile/update`, {
    credentials: 'include',
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body)
  }).then(response => response.json());
}

export const logout = () => {
  return fetch(`${USER_API}/logout`, {
    method: 'POST',
    credentials: 'include'
  });
}

const api = {
  login,
  logout,
  register,
  profile
}

export default api;