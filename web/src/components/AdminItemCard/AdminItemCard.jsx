import { useState } from 'react'

import { FaRegTrashAlt } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { PiArrowRightBold } from 'react-icons/pi'

import { useMutation } from '@redwoodjs/web'

import AdminItemModal from '../AdminItemModal/AdminItemModal'
import { QUERY } from '../ItemsCell/ItemsCell'

const DELETE_ITEM = gql`
  mutation DeleteItemMutation($id: Int!) {
    deleteItem(id: $id) {
      id
      name
    }
  }
`

const AdminItemCard = ({
  itemId,
  name,
  image,
  price,
  desc,
  type,
  qty,
  open,
  setOpen,
  setItemInfo,
}) => {
  const [openModal, setOpenModal] = useState(false)
  const [deleteItem] = useMutation(DELETE_ITEM, {
    refetchQueries: [{ query: QUERY }],
  })

  return (
    <div className="mt-4 flex max-w-[425px] flex-col gap-4 rounded-xl bg-Blue p-4">
      <AdminItemModal
        id={itemId}
        name={name}
        image={image}
        price={price}
        description={desc}
        type={type}
        stock={qty}
        open={openModal}
        setOpen={setOpenModal}
      />
      <div className="flex justify-center">
        <img
          className="rounded-xl border-2 border-LightBlue"
          src={image}
          alt={name}
        />
      </div>
      <div className="flex flex-row justify-between">
        <p className="text-2xl font-semibold text-white">{name}</p>
        <p className="text-2xl font-semibold text-white">${price}</p>
      </div>
      <div className="flex justify-between p-2">
        <div className="flex flex-row gap-4">
          <button
            onClick={() => {
              deleteItem({
                variables: {
                  id: itemId,
                },
              })
            }}
          >
            <FaRegTrashAlt size={30} color="#B9322F" />
          </button>
          <button
            onClick={() => {
              setItemInfo({
                id: itemId,
                name: name,
                image: image,
                price: price,
                stock: qty,
                description: desc,
                type: type,
              })
              setOpen(!open)
            }}
          >
            <MdEdit size={30} color="#FFCD00" />
          </button>
        </div>
        <button
          className="flex flex-row items-center gap-1 rounded-lg border border-LightBlue bg-Blue px-3 py-2 text-xl font-semibold text-LightBlue"
          onClick={() => setOpen(!open)}
        >
          See details
          <PiArrowRightBold size={26} color="#A3C7D2" />
        </button>
      </div>
    </div>
  )
}

export default AdminItemCard
