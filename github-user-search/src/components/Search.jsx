import React, { useState } from 'react';
import fetchAdvancedUserData from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setUsers([]);

    try {
      const data = await fetchAdvancedUserData({ username, location, minRepos });
      setUsers(data.items);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block font-semibold mb-1" htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="GitHub username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            placeholder="User location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="minRepos">Minimum Repositories</label>
          <input
            id="minRepos"
            type="number"
            min="0"
            placeholder="e.g., 10"
            value={minRepos}
            onChange={e => setMinRepos(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {loading && <p className="mt-4 text-center">Loading...</p>}
      {error && <p className="mt-4 text-center text-red-600">Looks like we cant find the user</p>}

      <div className="mt-6 space-y-4">
        {users.length === 0 && !loading && !error && <p>No results to display.</p>}
        {users.map(user => (
          <div key={user.id} className="flex items-center space-x-4 border p-3 rounded shadow">
            <img src={user.avatar_url} alt={user.login} className="w-16 rounded-full" />
            <div>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold hover:underline"
              >
                {user.login}
              </a>
              <p>Location: {user.location || 'N/A'}</p>
              <p>Repos: {user.public_repos !== undefined ? user.public_repos : 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
