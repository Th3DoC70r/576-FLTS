import { useState } from 'react'

import { PiArrowRightBold } from 'react-icons/pi'

import ItemModal from '../ItemModal/ItemModal'

const ItemCard = ({ name, price, image, itemId, desc, qty }) => {
  const [openItemModal, setOpenItemModal] = useState(false)

  const setOpen = () => setOpenItemModal(!openItemModal)
  return (
    <div className="m-4 flex max-w-[425px] flex-col gap-4 rounded-xl bg-Blue p-4">
      {openItemModal ? (
        <ItemModal
          id={itemId}
          open={openItemModal}
          setOpen={setOpenItemModal}
          name={name}
          price={price}
          image={image}
          desc={desc}
          stock={qty}
        />
      ) : null}
      <div className="flex justify-center">
        <img
          className="rounded-xl border border-2 border-LightBlue"
          src={image}
          alt={name}
        />
      </div>
      <div className="flex flex-row justify-between">
        <p className="text-2xl font-semibold text-white">{name}</p>
        <p className="text-2xl font-semibold text-white">${price}</p>
      </div>
      <div className="flex justify-end">
        <button
          className="flex flex-row items-center gap-2 rounded-lg bg-LightBlue px-3 py-2 text-xl text-black"
          onClick={() => setOpen()}
        >
          See details
          <PiArrowRightBold />
        </button>
      </div>
    </div>
  )
}

export default ItemCard
