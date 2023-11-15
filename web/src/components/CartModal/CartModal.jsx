import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react'
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi'
import { RiDeleteBin5Fill } from 'react-icons/ri'

import { useAuth } from 'src/auth'
import { truncate } from 'src/scripts'

const CartModal = ({ open, setOpen }) => {
  const { currentUser } = useAuth()
  const handleOpen = () => setOpen(!open)
  return (
    <Dialog className="rounded-xl bg-Blue" handler={handleOpen} open={open}>
      <DialogHeader>
        <p className="text-3xl font-bold text-white">Shopping Cart</p>
      </DialogHeader>
      <DialogBody className="flex flex-col">
        {currentUser.cart.map((item, index) => (
          <div
            className="flex flex-row justify-between rounded-xl bg-LightBlue"
            key={index}
          >
            <div className="flex flex-row gap-4">
              <img src={item.image} alt={item.name} />
              <div className="flex flex-col gap-4">
                <p className="text-2xl font-semibold text-black">{item.name}</p>
                <p className="text-xl font-medium text-black">
                  {truncate(item.desc, 30)}
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-3xl font-semibold text-black">{item.price}</p>
              <div className="flex flex-row items-center gap-4">
                <p className="text-xl font-semibold text-white">
                  {item.quantity}
                </p>
                <div className="flex flex-col items-center gap-2">
                  <button>
                    <BiSolidUpArrow />
                  </button>
                  <button>
                    <BiSolidDownArrow />
                  </button>
                </div>
              </div>
              <button className="items-center bg-LightBlue px-3 py-1 text-black">
                <RiDeleteBin5Fill />
              </button>
            </div>
          </div>
        ))}
      </DialogBody>
      <DialogFooter className="flex flex-row justify-between">
        <button className="bg-LightBlue px-3 py-1 text-xl font-medium text-black">
          Continue Shopping
        </button>
        <button className="bg-LightBlue px-3 py-1 text-xl font-medium text-black">
          Checkout
        </button>
      </DialogFooter>
    </Dialog>
  )
}

export default CartModal
