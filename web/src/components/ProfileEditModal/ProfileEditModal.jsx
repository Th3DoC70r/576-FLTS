import { useEffect, useRef } from 'react'

import { Dialog, DialogBody, DialogHeader } from '@material-tailwind/react'

import {
  FieldError,
  FileField,
  Form,
  Submit,
  TextField,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

import { USER_QUERY } from 'src/pages/ProfilePage/ProfilePage'

const UPDATE_USER = gql`
  mutation UpdateUserMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      name
      email
      image
    }
  }
`

const ProfileEditModal = ({ user, open, setOpen }) => {
  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: USER_QUERY, variables: { id: user?.id } }],
  })

  const handleOpen = () => setOpen(!open)

  const onSubmit = async ({ name, email, image }) => {
    let input = { roles: user?.roles }
    const craftInputs = () => {
      if (image.length) {
        input.image = image
      }
      if (name !== user?.name) {
        input.name = name
      }
      if (email !== user?.email) {
        input.email = email
      }
      return input
    }
    await updateUser({
      variables: {
        id: user?.id,
        input: craftInputs(),
      },
    })
    handleOpen()
  }

  const nameRef = useRef(null)
  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  return (
    <Dialog className="rounded-xl bg-Blue p-2" open={open} handler={handleOpen}>
      <DialogHeader className="flex justify-center rounded-xl bg-Blue">
        <p className="text-3xl font-semibold text-white">Edit Profile</p>
      </DialogHeader>
      <DialogBody className="p-0">
        <Form onSubmit={onSubmit} className="flex flex-col gap-4">
          <TextField
            name="name"
            className="w-full rounded-lg border-2 border-LightBlue bg-Blue p-2 text-LightBlue outline-none placeholder:text-LightBlue focus:outline-none"
            errorClassName="w-full rounded-lg border-2 border-Red bg-Blue p-2 text-Red outline-none placeholder:text-Red focus:outline-none"
            defaultValue={user?.name}
            ref={nameRef}
          />

          <FieldError name="name" className="rw-field-error" />

          <TextField
            name="email"
            className="w-full rounded-lg border-2 border-LightBlue bg-Blue p-2 text-LightBlue outline-none placeholder:text-LightBlue focus:outline-none"
            errorClassName="w-full rounded-lg border-2 border-Red bg-Blue p-2 text-Red outline-none placeholder:text-Red focus:outline-none"
            defaultValue={user?.email}
          />

          <FieldError name="email" className="rw-field-error" />

          <FileField
            name="image"
            className="w-full rounded-lg border-2 border-LightBlue bg-Blue p-2 text-LightBlue file:rounded-lg file:border file:border-LightBlue file:bg-Blue file:text-LightBlue focus:outline-none"
            errorClassName="w-full rounded-lg border-2 border-Red bg-Blue p-2 text-Red outline-none placeholder:text-Red focus:outline-none"
          />

          <FieldError name="image" className="rw-field-error" />

          <div className="flex w-full flex-row justify-between">
            <button
              className="rounded-lg border border-LightBlue px-3 py-1 text-xl font-medium text-LightBlue"
              onClick={() => handleOpen()}
            >
              Cancel
            </button>
            <Submit className="rounded-lg border border-LightBlue px-3 py-1 text-xl font-medium text-LightBlue">
              Save Changes
            </Submit>
          </div>
        </Form>
      </DialogBody>
    </Dialog>
  )
}

export default ProfileEditModal
