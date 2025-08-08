import axios from 'axios';

const API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: API_KEY ? `token ${API_KEY}` : undefined,
  },
});

export const searchUsers = (query) => {
  return githubApi.get(`/search/users?q=${query}`);
};
