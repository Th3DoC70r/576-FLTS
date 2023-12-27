import { useLocation } from '@redwoodjs/router'

import AdminItemCard from '../AdminItemCard/AdminItemCard'
import ItemCard from '../ItemCard/ItemCard'

export const QUERY = gql`
  query ItemsQuery {
    items {
      id
      name
      description
      price
      stock
      type
      image
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ items, open, setOpen, setItemInfo }) => {
  const location = useLocation()

  return location.pathname === '/'
    ? items.map((item, index) => (
        <ItemCard
          key={index}
          itemId={item.id}
          name={item.name}
          desc={item.description}
          price={item.price}
          type={item.type}
          qty={item.stock}
          image={item.image}
        />
      ))
    : items.map((item, index) => (
        <AdminItemCard
          key={index}
          itemId={item.id}
          name={item.name}
          desc={item.description}
          price={item.price}
          type={item.type}
          qty={item.stock}
          image={item.image}
          open={open}
          setOpen={setOpen}
          setItemInfo={setItemInfo}
        />
      ))
}
