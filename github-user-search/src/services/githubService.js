import axios from 'axios';

const API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

const fetchUserData = async (username) => {
  const url = `https://api.github.com/users/${username}`;
  const headers = API_KEY
    ? { Authorization: `token ${API_KEY}` }
    : {};

  const response = await axios.get(url, { headers });
  return response.data;
};

export default fetchUserData;
