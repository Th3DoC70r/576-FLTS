import { Dialog, DialogBody, DialogHeader } from '@material-tailwind/react'

import { useAuth } from 'src/auth'

import CartItemCard from '../CartItemCard/CartItemCard'

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
          <CartItemCard
            key={index}
            name={item.name}
            desc={item.desc}
            price={item.price}
            image={item.image}
            stock={item.stock}
            quantity={item.quantity}
          />
        ))}
      </DialogBody>
    </Dialog>
  )
}

export default CartModal
