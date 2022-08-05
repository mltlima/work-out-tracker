import axios from 'axios';

const baseAPI = axios.create({baseURL: 'http://localhost:5000/'});

function getConfig(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

async function signUp(email, password) {
    await baseAPI.post('/signup', { email, password });
}

const api = {
    signUp,
}

export default api;