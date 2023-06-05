import axios from 'axios';

axios.defaults.baseURL = 'https://64662767228bd07b355d43a7.mockapi.io';

async function getTweets(page = 1) {
  try {
    const response = await axios.get(`/users?page=${page}&limit=3`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function getAllUsers() {
  try {
    const response = await axios.get('/users');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const api = {
  getTweets,
  getAllUsers,
};
export default api;
