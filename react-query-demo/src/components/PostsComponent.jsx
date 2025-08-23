import { useQuery } from '@tanstack/react-query' 

const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}

export default function PostsComponent() {
  const { data, error, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 5000,
    cacheTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    keepPreviousData: true,
  })

  if (isLoading) return <p>Loading posts...</p>
  if (isError) return <p>Error: {error.message}</p>

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Posts</h2>
      <button
        onClick={() => refetch()}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {isFetching ? 'Refreshing...' : 'Refetch Posts'}
      </button>
      <ul className="space-y-2">
        {data.slice(0, 10).map((post) => (
          <li key={post.id} className="p-2 border rounded">
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
