import { Link, Outlet } from 'react-router-dom';

export default function Posts() {
  return (
    <div>
      <h2>Posts</h2>
      <ul>
        <li><Link to="1">Post 1</Link></li>
        <li><Link to="2">Post 2</Link></li>
      </ul>
      <Outlet />
    </div>
  );
}
