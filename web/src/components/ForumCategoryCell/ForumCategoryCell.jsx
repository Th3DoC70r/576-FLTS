export const QUERY = gql`
  query FindForumCategoryQuery($id: Int!) {
    forumCategory: forumCategory(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ forumCategory }) => {
  return <div>{JSON.stringify(forumCategory)}</div>
}
