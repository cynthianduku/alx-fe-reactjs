import axios from 'axios';

const API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

const fetchAdvancedUserData = async ({ username, location, minRepos }) => {
  let query = '';

  if (username) query += `${username} in:login `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos} `;

  query = query.trim();

  if (!query) {
    throw new Error('Please provide at least one search criterion');
  }

  const url = `https://api.github.com/search/users?q=${encodeURIComponent(query)}`;

  const headers = API_KEY
    ? { Authorization: `token ${API_KEY}` }
    : {};

  const response = await axios.get(url, { headers });
  return response.data;
};

export default fetchAdvancedUserData;
