import CartItemCard from '../CartItemCard/CartItemCard'

export const QUERY = gql`
  query UserQuery($id: Int!) {
    user(id: $id) {
      cart {
        id
        quantity
        item {
          description
          id
          image
          name
          price
          stock
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ user }) => {
  const sortFunc = (a, b) => a.id - b.id

  let cartArr = structuredClone(user?.cart)
  cartArr?.sort(sortFunc)
  let totalItems = 0
  let totalPrice = 0
  cartArr?.map((item) => {
    if (item.quantity > 1) {
      totalPrice += item.item.price * item.quantity
    } else {
      totalPrice += +item.item.price
    }
    totalItems += item.quantity
  })
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        {cartArr?.map((item, index) => (
          <CartItemCard
            key={index}
            id={item.id}
            itemId={item.item.id}
            name={item.item.name}
            desc={item.item.description}
            image={item.item.image}
            stock={item.item.stock}
            quantity={item.quantity}
            price={item.item.price}
          />
        ))}
      </div>
      <div className="flex w-full flex-row items-center justify-between rounded-xl bg-Blue p-4">
        <p className="text-3xl font-semibold text-white">
          Total Items: {totalItems}
        </p>
        <p className="text-3xl font-semibold text-white">
          Cart Total: ${totalPrice}
        </p>
      </div>
      <div className="flex w-full justify-end rounded-xl bg-Blue p-4">
        <button className="rounded-lg bg-LightBlue px-3 py-1 text-xl font-medium text-black">
          Checkout
        </button>
      </div>
    </div>
  )
}
