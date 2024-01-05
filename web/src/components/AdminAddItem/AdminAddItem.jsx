import { useState } from 'react'

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

import AdminTypeModal from '../AdminTypeModal/AdminTypeModal'
import { QUERY } from '../ItemsCell/ItemsCell'

const CREATE_ITEM = gql`
  mutation CreateItemMutation($input: CreateItemInput!) {
    createItem(input: $input) {
      id
    }
  }
`

const AdminAddItem = ({ open, setOpen }) => {
  const [openType, setOpenType] = useState(false)
  const [types, setTypes] = useState([])
  const [createItem] = useMutation(CREATE_ITEM, {
    refetchQueries: [{ query: QUERY }],
  })

  const onSubmit = async (data) => {
    const { name, description, stock, price } = data
    await createItem({
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
    setOpen(!open)
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-Blue p-4">
      <AdminTypeModal
        mainTypes={types}
        open={openType}
        setOpen={setOpenType}
        setTypes={setTypes}
      />
      <p className="text-center text-3xl font-semibold text-white">
        Add a New Item
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
                  setTypes(types.filter((typeInArr) => typeInArr !== type))
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
            onClick={() => setOpen(!open)}
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
}

export default AdminAddItem
