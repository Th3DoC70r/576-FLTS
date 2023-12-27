import { useState } from 'react'

import { FaPlus, FaSearch } from 'react-icons/fa'

import ItemsCell from 'src/components/ItemsCell/ItemsCell'

import AdminAddItem from '../AdminAddItem/AdminAddItem'
import AdminEditItem from '../AdminEditItem/AdminEditItem'

const AdminItems = () => {
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [itemInfo, setItemInfo] = useState({})

  return (
    <>
      {openAdd ? (
        <AdminAddItem open={openAdd} setOpen={setOpenAdd} />
      ) : openEdit ? (
        <AdminEditItem open={openEdit} setOpen={setOpenEdit} info={itemInfo} />
      ) : (
        <div className="m-0 flex flex-col p-0" id="itemsContainer">
          <div className="flex w-full flex-row justify-between rounded-xl bg-LightBlue p-2">
            <div className="flex items-center justify-between rounded-lg border-2 border-Green">
              <FaSearch size={24} color="#00843D" />
            </div>
            <div className="flex flex-row gap-4">
              <button
                className="rounded-lg border-2 border-Green bg-LightBlue px-3 py-1 text-xl text-Green"
                onClick={() => setOpenAdd(!openAdd)}
              >
                <FaPlus size={26} color="#00843D" />
              </button>
              <button className="rounded-lg border-2 border-Green bg-LightBlue px-3 py-1 text-xl font-medium text-Green">
                Type
              </button>
              <button className="rounded-lg border-2 border-Green bg-LightBlue px-3 py-1 text-xl font-medium text-Green">
                Price
              </button>
            </div>
          </div>
          <div className="m-0 flex w-full flex-wrap justify-between self-stretch p-0">
            <ItemsCell
              open={openEdit}
              setOpen={setOpenEdit}
              setItemInfo={setItemInfo}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default AdminItems
