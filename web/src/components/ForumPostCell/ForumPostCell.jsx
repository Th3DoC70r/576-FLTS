export const QUERY = gql`
  query FindForumPostQuery($id: Int!) {
    forumPost: forumPost(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ forumPost }) => {
  return <div>{JSON.stringify(forumPost)}</div>
}
