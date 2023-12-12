import { useEffect, useState } from 'react'

import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react'
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi'
import { RiDeleteBin5Fill } from 'react-icons/ri'

import { useMutation, useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { truncate } from 'src/scripts'

export const CART_ITEM_QUERY = gql`
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

export const UPDATE_QUANTITY = gql`
  mutation UpdateCartItem($id: Int!, $input: UpdateCartItemInput!) {
    updateCartItem(id: $id, input: $input) {
      id
      quantity
    }
  }
`

export const DELETE_CART_ITEM = gql`
  mutation DeleteCartItem($id: Int!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`

const CartModal = ({ open, setOpen }) => {
  const { currentUser, isAuthenticated } = useAuth()
  const [cartItems, setCartItems] = useState([])

  const cartInfo = useQuery(CART_ITEM_QUERY, {
    variables: { id: currentUser.id },
  })

  useEffect(() => {
    setCartItems(cartInfo?.data.user.cart)
  }, [cartInfo])

  const handleOpen = () => setOpen(!open)

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

  const sortFunc = (a, b) => a.id - b.id

  let cartArr = structuredClone(cartInfo?.data?.user?.cart)
  cartArr?.sort(sortFunc)
  let totalItems = 0
  cartArr.map((item) => (totalItems += item.quantity))

  return (
    <Dialog
      className="z-50 h-auto rounded-xl bg-Blue"
      handler={handleOpen}
      open={open}
      size="lg"
    >
      <DialogHeader className="items-center justify-center">
        <p className="text-center text-3xl font-bold text-white">
          Shopping Cart ({totalItems})
        </p>
      </DialogHeader>
      <DialogBody className="flex max-h-[600px] flex-col gap-2 overflow-auto">
        {cartItems.length ? (
          cartItems.map((itemObj, index) => (
            <div
              className="flex flex-row justify-between rounded-xl bg-LightBlue"
              key={index}
            >
              <div className="flex flex-row gap-4 p-4">
                <img
                  src={itemObj.item.image}
                  alt={itemObj.item.name}
                  className="max-h-[150px] max-w-[150px] rounded-xl"
                />
                <div className="flex max-w-[500px] flex-col gap-4">
                  <div className="flex flex-row justify-between">
                    <p className="text-2xl font-semibold text-black">
                      {itemObj.item.name}
                    </p>
                    <p className="items-center text-2xl font-semibold text-black">
                      ${itemObj.item.price}
                    </p>
                  </div>
                  <p className="text-xl font-medium text-black">
                    {truncate(itemObj.item.description, 100)}
                  </p>
                </div>
              </div>
              <div className="flex flex-row justify-between gap-4">
                <div className="flex flex-row items-center gap-2">
                  <p className="text-xl font-semibold text-black">
                    {itemObj.quantity}
                  </p>
                  <div className="flex flex-col items-center gap-2">
                    <button
                      disabled={itemObj.quantity === itemObj.item.stock}
                      onClick={() =>
                        updateCartItem({
                          variables: {
                            id: itemObj.id,
                            input: {
                              quantity: itemObj.quantity + 1,
                            },
                          },
                        })
                      }
                    >
                      <BiSolidUpArrow color="Green" />
                    </button>
                    <button
                      disabled={itemObj.quantity === 1}
                      onClick={() =>
                        updateCartItem({
                          variables: {
                            id: itemObj.id,
                            input: {
                              quantity: itemObj.quantity - 1,
                            },
                          },
                        })
                      }
                    >
                      <BiSolidDownArrow color="Green" />
                    </button>
                  </div>
                </div>
                <button
                  className="h-fit items-center rounded-xl bg-LightBlue px-3 py-1 text-black"
                  onClick={() =>
                    deleteCartItem({
                      variables: {
                        id: itemObj.id,
                      },
                    })
                  }
                >
                  <RiDeleteBin5Fill color="Red" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-3xl font-medium text-white">
            Your cart is curently empty!
          </p>
        )}
      </DialogBody>
      <DialogFooter className="flex flex-row justify-between">
        <button
          className="rounded-lg bg-LightBlue px-3 py-1 text-xl font-medium text-black"
          onClick={() => handleOpen()}
        >
          Continue Shopping
        </button>
        <button className="rounded-lg bg-LightBlue px-3 py-1 text-xl font-medium text-black">
          Checkout
        </button>
      </DialogFooter>
    </Dialog>
  )
}

export default CartModal
