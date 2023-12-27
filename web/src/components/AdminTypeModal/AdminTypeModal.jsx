import { useEffect, useState } from 'react'

import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react'

import { types } from 'src/scripts'

const AdminTypeModal = ({ mainTypes, setTypes, open, setOpen }) => {
  const [typeArr, setTypeArr] = useState([])
  const handler = () => setOpen(!open)

  useEffect(() => {
    setTypeArr(mainTypes)
  }, [mainTypes])

  return (
    <Dialog open={open} handler={handler} className="rounded-xl bg-Blue">
      <DialogHeader className="flex justify-center rounded-xl">
        <p className="text-3xl font-semibold text-white">
          Click to add/remove a type
        </p>
      </DialogHeader>
      <DialogBody className="flex flex-wrap justify-between">
        {types.map((type, index) =>
          typeArr.includes(type) ? (
            <button
              className="rounded-lg border border-Green px-3 py-1 text-xl font-medium text-Green"
              onClick={() =>
                setTypeArr(typeArr.filter((typeInArr) => typeInArr !== type))
              }
              key={index}
            >
              {type}
            </button>
          ) : (
            <button
              className="rounded-lg border border-LightBlue px-3 py-1 text-xl font-medium text-LightBlue"
              onClick={() => setTypeArr([type, ...typeArr])}
              key={index}
            >
              {type}
            </button>
          )
        )}
      </DialogBody>
      <DialogFooter className="flex flex-row justify-between rounded-xl">
        <button
          className="rounded-lg border border-LightBlue px-3 py-1 text-xl font-medium text-LightBlue"
          onClick={() => {
            setTypeArr(mainTypes)
            handler()
          }}
        >
          Cancel
        </button>
        <button
          className="rounded-lg border border-LightBlue px-3 py-1 text-xl font-medium text-LightBlue"
          onClick={() => {
            setTypes(typeArr)
            handler()
          }}
        >
          Add Types
        </button>
      </DialogFooter>
    </Dialog>
  )
}

export default AdminTypeModal
