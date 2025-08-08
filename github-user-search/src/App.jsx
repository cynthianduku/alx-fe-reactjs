import React, { useState } from 'react';
import { searchUsers } from './services/githubApi';

function App() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    if (!query) return;

    try {
      const response = await searchUsers(query);
      setUsers(response.data.items);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>GitHub User Search</h1>
      <input
        type="text"
        placeholder="Search GitHub users"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: 8, width: '300px' }}
      />
      <button onClick={handleSearch} style={{ marginLeft: 10, padding: '8px 16px' }}>
        Search
      </button>

      <ul style={{ marginTop: 20 }}>
        {users.map((user) => (
          <li key={user.id} style={{ marginBottom: 10 }}>
            <img src={user.avatar_url} alt={user.login} width={40} style={{ borderRadius: '50%' }} />
            <a href={user.html_url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 10 }}>
              {user.login}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
