import { useState } from 'react'

import { Tab, Tabs, TabsBody, TabsHeader } from '@material-tailwind/react'
import moment from 'moment'
import { FaCheck, FaRegTrashAlt } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'

import { useMutation } from '@redwoodjs/web'

import AdminDeleteUser from '../AdminDeleteUser/AdminDeleteUser'

export const QUERY = gql`
  query UsersQuery {
    users {
      id
      name
      email
      reason
      roles
      image
      authenticated
      updatedAt
    }
  }
`

const UPDATE_USER = gql`
  mutation UpdateUserMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      roles
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ users }) => {
  const [activeTab, setActiveTab] = useState('users')
  const [selectedUser, setSelectedUser] = useState({})
  const [open, setOpen] = useState(false)
  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: QUERY }],
  })

  return (
    <div className="flex flex-col gap-4">
      <AdminDeleteUser open={open} setOpen={setOpen} user={selectedUser} />
      <Tabs
        value={activeTab}
        className="min-w-screen mx-1 mt-4 flex w-full flex-grow flex-col self-stretch"
      >
        <TabsHeader
          className={`flex w-full gap-2 self-stretch rounded-none border-b border-LightBlue bg-transparent p-0`}
          indicatorProps={{
            className: 'bg-transparent shadow-none rounded-lg rounded-b-none',
          }}
        >
          <Tab
            value="users"
            onClick={() => setActiveTab('users')}
            className={`h-1/8 w-fit rounded-lg rounded-b-none border border-b-0 border-LightBlue transition hover:text-Green hover:underline ${
              activeTab === 'users'
                ? 'bg-LightBlue text-black transition'
                : 'bg-transparent text-LightBlue hover:text-Green'
            }`}
          >
            <div className="flex flex-row items-center gap-2 p-1">
              <span className="inline-block">Current Users</span>
            </div>
          </Tab>
          <Tab
            value="requests"
            onClick={() => setActiveTab('requests')}
            className={`h-1/8 w-fit rounded-lg rounded-b-none border border-b-0 border-LightBlue transition hover:text-Green hover:underline ${
              activeTab === 'requests'
                ? 'bg-LightBlue text-black transition'
                : 'bg-transparent text-LightBlue hover:text-Green'
            }`}
          >
            <div className="flex flex-row items-center gap-2 p-1">
              <span className="inline-block">Approve Users</span>
            </div>
          </Tab>
        </TabsHeader>
        <TabsBody className="mt-4 flex flex-col gap-4">
          {activeTab === 'users'
            ? users.filter((user) => user.authenticated).length
              ? users
                  .filter((user) => user.authenticated)
                  .map((user, index) => (
                    <div
                      className="grid grid-cols-5 items-center rounded-lg bg-LightBlue p-2"
                      key={index}
                    >
                      <div className="flex flex-row items-center gap-2">
                        <img
                          src={user.image}
                          alt={user.name}
                          className="max-h-[50px] max-w-[50px] rounded-full border border-Yellow"
                        />
                        <p className="text-2xl font-medium text-black">
                          {user.name}
                        </p>
                      </div>
                      <p className="text-2xl font-medium text-black">
                        {user.email}
                      </p>
                      {user.roles.includes('admin' || 'super') ? (
                        <p className="text-right text-2xl font-medium text-black">
                          Admin
                        </p>
                      ) : (
                        <p className="text-right text-2xl font-medium text-black">
                          User
                        </p>
                      )}
                      <p className="text-right text-2xl font-medium text-black">
                        {moment(user.updatedAt).format('DD MMM YY')}
                      </p>
                      <div className="flex flex-row items-center justify-end gap-4">
                        <button
                          className="rounded-lg border border-Blue px-3 py-1 text-xl font-medium text-Blue"
                          onClick={() => {
                            setSelectedUser(user)
                            updateUser({
                              variables: {
                                id: user.id,
                                input: {
                                  roles: user.roles.includes('admin')
                                    ? ['user']
                                    : ['user', 'admin'],
                                },
                              },
                            })
                          }}
                        >
                          {user.roles.includes('admin')
                            ? 'Revoke Admin'
                            : 'Make Admin'}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUser(user)
                            setOpen(!open)
                          }}
                        >
                          <FaRegTrashAlt size={24} color="#B9322F" />
                        </button>
                      </div>
                    </div>
                  ))
              : null
            : users.filter((user) => !user.authenticated).length
            ? users
                .filter((user) => !user.authenticated)
                .map((user, index) => (
                  <div
                    className="grid grid-cols-5 items-center gap-4 rounded-lg bg-LightBlue p-2"
                    key={index}
                  >
                    <div className="m-0 flex flex-row items-center gap-2 p-0">
                      <img
                        src={user.image}
                        alt={user.name}
                        className="max-h-[50px] max-w-[50px] rounded-full border border-Yellow"
                      />
                      <p className="text-2xl font-medium text-black">
                        {user.name}
                      </p>
                    </div>
                    <p className="text-left text-2xl font-medium text-black">
                      {user.email}
                    </p>
                    <p className="max-w-[350px] text-xl font-medium text-black">
                      {user.reason}
                    </p>
                    <p className="text-right text-2xl font-medium text-black">
                      {moment(user.updatedAt).format('DD MMM YY')}
                    </p>
                    <div className="flex flex-row items-center justify-end gap-4">
                      <button
                        onClick={() =>
                          updateUser({
                            variables: {
                              id: user.id,
                              input: { authenticated: true, roles: user.roles },
                            },
                          })
                        }
                      >
                        <FaCheck size={24} color="#00843D" />
                      </button>
                      <button>
                        <MdEdit size={24} color="#FFCD00" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(user)
                          setOpen(!open)
                        }}
                      >
                        <FaRegTrashAlt size={24} color="#B9322F" />
                      </button>
                    </div>
                  </div>
                ))
            : null}
        </TabsBody>
      </Tabs>
    </div>
  )
}
