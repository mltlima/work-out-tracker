import axios from 'axios';

const baseAPI = axios.create({baseURL: 'http://localhost:5000'});

function getConfig(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}
//{email, password, confirmPassword, name, weight, height, age}
async function signUp(user) {
    await baseAPI.post('/signup', user);
}

async function signIn(email, password) {
    await baseAPI.post('/signin', { email, password });
}

const api = {
    signUp,
    signIn,

}

export default api;