import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home';
import Posts from './components/Posts';
import Post from './components/Post';
import Profile from './components/Profile';
import ProfileDetails from './components/ProfileDetails';
import ProfileSettings from './components/ProfileSettings';
import ProtectedRoute from './components/ProtectedRoute';
import BlogPost from './components/BlogPost';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const auth = {
    isAuthenticated,
    login: () => setIsAuthenticated(true),
    logout: () => setIsAuthenticated(false),
  };

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/posts">Posts</Link> | <Link to="/profile">Profile</Link> | <Link to="/blog/1">Blog Post 1</Link>
      </nav>

      <div style={{ marginTop: '1rem' }}>
        {!auth.isAuthenticated ? (
          <button onClick={auth.login}>Login</button>
        ) : (
          <button onClick={auth.logout}>Logout</button>
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
            <ProtectedRoute isAuthenticated={auth.isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        >
          <Route path="details" element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Route>
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="*" element={<h2>404 Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}
