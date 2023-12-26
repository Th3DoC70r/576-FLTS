import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react'

const AdminItemModal = ({
  open,
  setOpen,
  name,
  description,
  price,
  stock,
  image,
}) => {
  const handleOpen = () => setOpen(!open)

  return (
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
        <p className="text-xl text-white">{description}</p>
        <p className="text-3xl font-semibold text-white">${price}</p>
      </DialogBody>
      <DialogFooter className="flex flex-row justify-center">
        <button
          className="rounded-lg bg-LightBlue px-3 py-1 text-xl font-medium text-black"
          onClick={() => setOpen(!open)}
        >
          Back
        </button>
      </DialogFooter>
    </Dialog>
  )
}

export default AdminItemModal
