import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react'

import { useMutation, useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const CREATE_CART_ITEM = gql`
  mutation CreateCartItemMutation($input: CreateCartItemInput!) {
    createCartItem(input: $input) {
      id
      itemId
      userId
      quantity
    }
  }
`

const UPDATE_QUANTITY = gql`
  mutation UpdateCartItem($id: Int!, $input: UpdateCartItemInput!) {
    updateCartItem(id: $id, input: $input) {
      id
      quantity
    }
  }
`

const CART_ITEM_QUERY = gql`
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

const ItemModal = ({
  open,
  setOpen,
  name,
  image,
  desc,
  price,
  stock,
  openCart,
  id,
}) => {
  const handleOpen = () => setOpen(!open)
  const { currentUser } = useAuth()

  const [createCartItem] = useMutation(CREATE_CART_ITEM, {})

  const cartInfo = useQuery(CART_ITEM_QUERY, {
    variables: { id: currentUser.id },
  })

  const [updateCartItem] = useMutation(UPDATE_QUANTITY, {
    refetchQueries: [
      { query: CART_ITEM_QUERY, variables: { id: +currentUser.id } },
    ],
  })

  let cartArr = []
  let cartItem = []
  cartInfo?.data?.user?.cart.map((item) => cartArr.push(item.item.id))
  let itemArr = cartArr?.filter((cartItem) => cartItem === id)
  cartItem = cartInfo?.data?.user?.cart.filter(
    (item) => itemArr[0] === item.item.id
  )

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        className="z-10 overflow-auto rounded-xl bg-Blue"
      >
        <DialogHeader>
          <img
            src={image}
            alt={name}
            className="rounded-xl border border-2 border-LightBlue"
          />
        </DialogHeader>
        <DialogBody className="flex flex-col p-0 px-4">
          <div className="flex flex-row justify-between">
            <p className="text-3xl font-semibold text-white">{name}</p>
            <p className="text-3xl font-semibold text-white">
              {stock ? stock + ' in stock' : 'Out of Stock'}
            </p>
          </div>
          <p className="text-xl text-white">{desc}</p>
          <p className="text-3xl font-semibold text-white">${price}</p>
        </DialogBody>
        <DialogFooter className="flex flex-row justify-between">
          <button
            className="rounded-lg bg-LightBlue px-3 py-1 text-xl font-medium text-black"
            onClick={() => setOpen(!open)}
          >
            Cancel
          </button>
          <button
            className="rounded-lg bg-LightBlue px-3 py-1 text-xl font-medium text-black disabled:opacity-80"
            disabled={stock === 0 ? true : false}
            onClick={async () => {
              itemArr?.length
                ? await updateCartItem({
                    variables: {
                      id: cartItem[0].id,
                      input: {
                        quantity: cartItem[0].quantity + 1,
                      },
                    },
                  })
                : await createCartItem({
                    variables: {
                      input: {
                        itemId: id,
                        userId: currentUser.id,
                        quantity: 1,
                      },
                    },
                  })
              openCart()
              handleOpen()
            }}
          >
            Add to Cart
          </button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default ItemModal
