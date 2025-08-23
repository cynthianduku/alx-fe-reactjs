import { BrowserRouter, Routes, Route, Link, Navigate, Outlet, useParams } from 'react-router-dom';
import { useState } from 'react';
import Profile from './components/Profile';
import ProfileDetails from './components/ProfileDetails';
import ProfileSettings from './components/ProfileSettings';
import BlogPost from './components/BlogPost';

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return {
    isAuthenticated,
    login: () => setIsAuthenticated(true),
    logout: () => setIsAuthenticated(false),
  };
}

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return children;
}

function Home() {
  return <h2>Home Page</h2>;
}

function Posts() {
  return (
    <div>
      <h2>Posts</h2>
      <ul>
        <li><Link to="/blog/1">Blog Post 1</Link></li>
        <li><Link to="/blog/2">Blog Post 2</Link></li>
      </ul>
      <Outlet />
    </div>
  );
}

function App() {
  const auth = useAuth();

  return (
    <BrowserRouter>
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

        <Route path="/posts" element={<Posts />} />

        <Route path="/blog/:id" element={<BlogPost />} />

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
    </BrowserRouter>
  );
}

export default App;
