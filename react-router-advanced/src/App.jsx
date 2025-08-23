import { BrowserRouter, Routes, Route, Link, Navigate, Outlet, useParams } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home';
import Posts from './components/Posts';
import Post from './components/Post';
import Profile from './components/Profile';
import ProfileDetails from './components/ProfileDetails';
import ProfileSettings from './components/ProfileSettings';

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return {
    isAuthenticated,
    login: () => setIsAuthenticated(true),
    logout: () => setIsAuthenticated(false)
  };
}

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const auth = useAuth();

  return (
    <BrowserRouter>
      <div>
        <nav style={{ marginBottom: '1rem' }}>
          <Link to="/">Home</Link> |{" "}
          <Link to="/posts">Posts</Link> |{" "}
          <Link to="/profile">Profile</Link>
        </nav>

        <div style={{ marginBottom: '1rem' }}>
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
          <Route path="*" element={<h2>404 Page Not Found</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
