import axios from 'axios';

const baseAPI = axios.create({baseURL: 'http://localhost:5000'});
const URL = 'http://localhost:5000';

function getConfig(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

async function signUp(user) {
  await baseAPI.post('/signup', user);
}

async function signIn(email, password) {
  return await baseAPI.post('/signin', { email, password });
}

async function getAllPrograms(token) {
  return await axios.get(`${URL}/programs`, getConfig(token));
}

async function getUserProgram(token) {
  return await axios.get(`${URL}/userProgram`, getConfig(token));
}

async function getAllWorkouts(token) {
  return await axios.get(`${URL}/workouts`, getConfig(token));
}

const api = {
  signUp,
  signIn,
  getAllPrograms,
  getUserProgram,
  getAllWorkouts,
}

export default api;