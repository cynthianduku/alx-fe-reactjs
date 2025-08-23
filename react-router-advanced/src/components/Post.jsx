import { useParams } from 'react-router-dom';

export default function Post() {
  const { id } = useParams();
  return <h3>Viewing Post #{id}</h3>;
}
