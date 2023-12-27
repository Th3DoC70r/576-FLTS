import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi'
import { RiDeleteBin5Fill } from 'react-icons/ri'

import { useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

import { CART_ITEM_QUERY } from '../CartModal/CartModal'

const UPDATE_QUANTITY = gql`
  mutation UpdateCartItem($id: Int!, $input: UpdateCartItemInput!) {
    updateCartItem(id: $id, input: $input) {
      id
      quantity
    }
  }
`

const DELETE_CART_ITEM = gql`
  mutation DeleteCartItem($id: Int!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`

const CartItemCard = ({ name, desc, image, stock, quantity, price, id }) => {
  const { currentUser } = useAuth()

  const [deleteCartItem] = useMutation(DELETE_CART_ITEM, {
    refetchQueries: [
      { query: CART_ITEM_QUERY, variables: { id: +currentUser.id } },
    ],
  })

  const [updateCartItem] = useMutation(UPDATE_QUANTITY, {
    refetchQueries: [
      { query: CART_ITEM_QUERY, variables: { id: +currentUser.id } },
    ],
  })

  return (
    <div className="flex flex-row items-center gap-4 rounded-xl bg-Blue p-4">
      <img src={image} alt={name} className="h-auto w-1/4 rounded-xl" />
      <div className="flex w-full flex-col justify-between gap-4">
        <div className="flex flex-row justify-between">
          <p className="text-2xl font-semibold text-white">{name}</p>
          <p className="text-xl font-semibold text-white">
            {stock ? stock + ' in stock' : 'Out of Stock'}
          </p>
        </div>
        <p className="text-lg font-medium text-white">{desc}</p>
      </div>
      <p className="text-2xl font-semibold text-white">${price}</p>
      <div className="flex w-1/4 flex-row items-center gap-4">
        <p className="text-xl font-semibold text-white">{quantity}</p>
        <div className="flex flex-col items-center gap-2">
          <button
            className="h-fit"
            disabled={quantity === stock}
            onClick={() =>
              updateCartItem({
                variables: {
                  id: id,
                  input: {
                    quantity: quantity + 1,
                  },
                },
              })
            }
          >
            <BiSolidUpArrow color="LightBlue" />
          </button>
          <button
            className="h-fit"
            disabled={quantity === 1}
            onClick={() =>
              updateCartItem({
                variables: {
                  id: id,
                  input: {
                    quantity: quantity - 1,
                  },
                },
              })
            }
          >
            <BiSolidDownArrow color="LightBlue" />
          </button>
        </div>
      </div>
      <button
        className="h-fit rounded-lg p-1 text-xl"
        onClick={() =>
          deleteCartItem({
            variables: {
              id: id,
            },
          })
        }
      >
        <RiDeleteBin5Fill color="Red" />
      </button>
    </div>
  )
}

export default CartItemCard
