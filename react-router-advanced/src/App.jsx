import { Routes, Route, Link, Navigate, Outlet, useParams } from 'react-router-dom'
import { useState } from 'react'

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  return { isAuthenticated, login: () => setIsAuthenticated(true), logout: () => setIsAuthenticated(false) }
}

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }
  return children
}

function Home() {
  return <h2>Home Page</h2>
}

function Posts() {
  return (
    <div>
      <h2>Posts</h2>
      <ul>
        <li><Link to="/posts/1">Post 1</Link></li>
        <li><Link to="/posts/2">Post 2</Link></li>
      </ul>
      <Outlet />
    </div>
  )
}

function Post() {
  const { id } = useParams()
  return <h3>Viewing Post #{id}</h3>
}

function Profile() {
  return (
    <div>
      <h2>Profile</h2>
      <nav>
        <Link to="details">Details</Link> |{" "}
        <Link to="settings">Settings</Link>
      </nav>
      <Outlet />
    </div>
  )
}

function ProfileDetails() {
  return <p>Profile Details Page</p>
}

function ProfileSettings() {
  return <p>Profile Settings Page</p>
}

export default function App() {
  const auth = useAuth()

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/posts">Posts</Link> |{" "}
        <Link to="/profile">Profile</Link>
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
        <Route path="*" element={<h2>404 Page Not Found</h2>} />
      </Routes>
    </div>
  )
}
