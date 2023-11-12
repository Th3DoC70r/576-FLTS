import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react'

const ItemModal = ({ open, setOpen, name, image, desc, price, stock }) => {
  const handleOpen = () => setOpen(!open)
  return (
    <Dialog
      open={open}
      handler={handleOpen}
      className="overflow-auto rounded-xl bg-Blue"
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
        <button className="rounded-lg bg-LightBlue px-3 py-1 text-xl font-medium text-black">
          Add to Cart
        </button>
      </DialogFooter>
    </Dialog>
  )
}

export default ItemModal
