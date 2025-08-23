import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home';
import Posts from './components/Posts';
import Post from './components/Post';
import Profile from './components/Profile';
import ProfileDetails from './components/ProfileDetails';
import ProfileSettings from './components/ProfileSettings';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/posts">Posts</Link> |{" "}
          <Link to="/profile">Profile</Link>
        </nav>

        <div style={{ marginTop: '1rem' }}>
          {!isAuthenticated ? (
            <button onClick={login}>Login</button>
          ) : (
            <button onClick={logout}>Logout</button>
          )}
        </div>

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/posts" element={<Posts />}>
            <Route path=":id" element={<Post />} />
          </Route>

          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            }
          >
            <Route path="details" element={<ProfileDetails />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>

          <Route path="*" element={<h2>404 Page Not Found</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
