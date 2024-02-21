import { Dialog, DialogBody } from '@material-tailwind/react'

import { useMutation } from '@redwoodjs/web'

import { QUERY } from '../UsersCell/UsersCell'

const DELETE_USER = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
      name
      email
    }
  }
`

const AdminDeleteUser = ({ open, setOpen, user }) => {
  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: QUERY }],
    onCompleted: () => {
      handler()
    },
  })
  const handler = () => setOpen(!open)

  return (
    <Dialog handler={handler} open={open} className="rounded-xl bg-Blue">
      <DialogBody className="flex flex-col gap-4 rounded-xl">
        <p className="text-center text-3xl font-semibold text-white">
          Are you sure you want to delete {user.name}?
        </p>
        <p className="text-center text-2xl font-medium text-white">
          This will delete everything they have posted to the forums and their
          progress on the Top Hand Requirements.
        </p>
        <div className="flex flex-row justify-between">
          <button
            className="border-Lightblue rounded-lg border px-3 py-1 text-xl text-LightBlue"
            onClick={() => handler()}
          >
            Cancel
          </button>
          <button
            className="border-Lightblue rounded-lg border px-3 py-1 text-xl text-LightBlue"
            onClick={() => deleteUser({ variables: { id: user.id } })}
          >
            Delete
          </button>
        </div>
      </DialogBody>
    </Dialog>
  )
}

export default AdminDeleteUser
