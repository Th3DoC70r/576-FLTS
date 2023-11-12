export const QUERY = gql`
  query FindItemQuery($id: Int!) {
    item: item(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ item }) => {
  return <div>{JSON.stringify(item)}</div>
}
