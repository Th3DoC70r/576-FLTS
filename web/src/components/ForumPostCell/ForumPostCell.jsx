import PostCard from '../../components/PostCard'

export const QUERY = gql`
  query FindForumPostQuery {
    posts {
      category
      createdAt
      description
      id
      title
      createdAt
      user {
        image
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ posts }) => {
  return posts.map((post) => (
    <PostCard
      key={post.id}
      title={post.title}
      description={post.description}
      category={post.category}
      created={post.createdAt}
      userImage={post.user.image}
    />
  ))
}
