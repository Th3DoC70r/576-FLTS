import { useState } from 'react'

import { FaRegTrashAlt } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { PiArrowRightBold } from 'react-icons/pi'

import {
  FieldError,
  FileField,
  Form,
  NumberField,
  Submit,
  TextAreaField,
  TextField,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

import AdminEditItem from '../AdminEditItem/AdminEditItem'
import AdminItemModal from '../AdminItemModal/AdminItemModal'
import AdminTypeModal from '../AdminTypeModal/AdminTypeModal'
import { QUERY } from '../ItemsCell/ItemsCell'

const DELETE_ITEM = gql`
  mutation DeleteItemMutation($id: Int!) {
    deleteItem(id: $id) {
      id
      name
    }
  }
`

const UPDATE_ITEM = gql`
  mutation UpdateItemMutation($id: Int!, $input: UpdateItemInput!) {
    updateItem(id: $id, input: $input) {
      id
      name
      description
      price
      stock
      image
    }
  }
`

const AdminItemCard = ({ itemId, name, image, price, desc, type, qty }) => {
  const [open, setOpen] = useState(false)
  const [openType, setOpenType] = useState(false)
  const [types, setTypes] = useState([])
  const [updateItem] = useMutation(UPDATE_ITEM, {
    refetchQueries: [{ query: QUERY }],
  })
  const [deleteItem] = useMutation(DELETE_ITEM, {
    refetchQueries: [{ query: QUERY }],
  })

  const onSubmit = async (data) => {
    const { name, description, stock, price } = data
    updateItem({
      variables: {
        input: {
          name: name,
          description: description,
          image: 'need image bucket',
          type: types,
          stock: stock,
          price: `${price}`,
        },
      },
    })
  }
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
        open={open}
        setOpen={setOpen}
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
              let doc = document.getElementById('itemsContainer')
              console.log(doc.children)
              doc.replaceChildren(
                <div className="flex flex-col gap-4 rounded-xl bg-Blue p-4">
                  <AdminTypeModal
                    mainTypes={types}
                    open={openType}
                    setOpen={setOpenType}
                    setTypes={setTypes}
                  />
                  <p className="text-center text-3xl font-semibold text-white">
                    Add A New Item
                  </p>
                  <Form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <TextField
                      name="name"
                      className="w-1/4 rounded-lg bg-LightBlue p-2 text-xl text-Green underline underline outline-none placeholder:text-Green focus:outline-none"
                      errorClassName="w-1/4 rounded-lg border-2 border-Red text-xl underline bg-Blue p-2 text-Red outline-none placeholder:text-Red focus:outline-none"
                      placeholder="Enter an item name . . ."
                      validation={{
                        required: {
                          value: true,
                          message: 'A name for the item is required',
                        },
                      }}
                    />
                    <FieldError name="name" className="rw-field-error" />

                    <div className="flex flex-row gap-6">
                      <button
                        type="button"
                        className="rounded-lg border border-LightBlue px-3 py-1 text-xl font-medium text-LightBlue"
                        onClick={() => setOpenType(!openType)}
                      >
                        Type
                      </button>
                      <div className="m-o flex flex-row gap-4 p-0">
                        {types.map((type, index) => (
                          <button
                            type="button"
                            className="rounded-lg border border-LightBlue px-3 py-1 text-xl font-medium text-LightBlue"
                            key={index}
                            onClick={() =>
                              setTypes(
                                types.filter((typeInArr) => typeInArr !== type)
                              )
                            }
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <TextAreaField
                      name="description"
                      className="w-full rounded-lg bg-LightBlue p-2 text-xl text-Green outline-none placeholder:text-Green focus:outline-none"
                      errorClassName="w-full rounded-lg border-2 border-Red text-xl bg-Blue p-2 text-Red outline-none placeholder:text-Red focus:outline-none"
                      placeholder="Add the item description here . . ."
                      validation={{
                        required: {
                          value: true,
                          message: 'A description for the item is required',
                        },
                      }}
                    />
                    <FieldError name="description" className="rw-field-error" />

                    <FileField
                      name="image"
                      className="w-1/4 rounded-lg border-2 border-LightBlue bg-Blue p-2 text-xl text-LightBlue file:rounded-lg file:border-2 file:border-LightBlue file:bg-Blue file:text-xl file:font-medium file:text-LightBlue focus:outline-none"
                      errorClassName="w-1/4 rounded-lg border-2 border-Red bg-Blue p-2 text-Red outline-none file:rounded-lg file:border-Red file:bg-Blue file:text-xl file:font-medium file:text-Red placeholder:text-Red focus:outline-none"
                      validation={{
                        required: {
                          value: true,
                          message: 'An image for the item is required',
                        },
                      }}
                    />

                    <FieldError name="image" className="rw-field-error" />

                    <NumberField
                      name="stock"
                      className="w-1/4 rounded-lg bg-LightBlue p-2 text-xl text-Green outline-none placeholder:text-Green focus:outline-none"
                      errorClassName="w-1/4 rounded-lg border-2 border-Red text-xl bg-Blue p-2 text-Red outline-none placeholder:text-Red focus:outline-none"
                      placeholder="How many do you have . . ."
                      validation={{
                        required: {
                          value: true,
                          message: 'The stock for the item is required',
                          //cannot be negative or 0 or take e as an input
                          //need to style incrementer buttons
                        },
                      }}
                    />
                    <FieldError name="stock" className="rw-field-error" />

                    <NumberField
                      name="price"
                      className="w-1/4 rounded-lg bg-LightBlue p-2 text-xl text-Green outline-none placeholder:text-Green focus:outline-none"
                      errorClassName="w-1/4 rounded-lg border-2 border-Red text-xl bg-Blue p-2 text-Red outline-none placeholder:text-Red focus:outline-none"
                      placeholder="How much does the item cost . . ."
                      validation={{
                        required: {
                          value: true,
                          message: 'The price of the item is required',
                          //cannot be negative or 0 or take e as an input
                          //need to style incrementer buttons
                        },
                      }}
                    />
                    <FieldError name="price" className="rw-field-error" />

                    <div className="flex flex-row justify-between">
                      <button
                        type="button"
                        className="rounded-lg border border-LightBlue px-3 py-1 text-xl font-medium text-LightBlue"
                        onClick={() => null}
                      >
                        Cancel
                      </button>
                      <Submit className="rounded-lg border border-LightBlue px-3 py-1 text-lg font-medium text-LightBlue focus:outline-LightBlue">
                        Add Item
                      </Submit>
                    </div>
                  </Form>
                </div>
              )
              console.log(doc.children)
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
