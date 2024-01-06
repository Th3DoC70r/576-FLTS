import { useEffect, useState } from 'react'

import moment from 'moment'

import { MetaTags, useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import ProfileEditModal from 'src/components/ProfileEditModal/ProfileEditModal'

export const USER_QUERY = gql`
  query UserQuery($id: Int!) {
    user(id: $id) {
      id
      name
      image
      email
      roles
      authenticated
      post {
        id
        title
        description
        updatedAt
      }
    }
  }
`

const ProfilePage = () => {
  const { currentUser } = useAuth()
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState({})
  const userInfo = useQuery(USER_QUERY, { variables: { id: currentUser?.id } })

  useEffect(() => {
    setUser(userInfo?.data?.user)
  }, [userInfo])
  return (
    <>
      <MetaTags title="Profile" description="Profile page" />

      <ProfileEditModal user={user} open={open} setOpen={setOpen} />

      <div className="m-4 flex min-w-[90%] flex-col gap-4">
        <div className="flex justify-end">
          <button
            className="rounded-lg border border-Blue px-3 py-1 text-xl font-medium text-black focus:outline-none"
            onClick={() => setOpen(!open)}
          >
            Edit Profile
          </button>
        </div>
        <div className="flex min-h-[300px] flex-row items-center gap-4 rounded-xl border border-Blue p-4">
          <img
            className="max-h-[250px] max-w-[250px] rounded-full border-2 border-Red"
            src={user?.image}
            alt={user?.name}
          />
          <div className="flex flex-col gap-2">
            <p className="text-3xl font-semibold text-black">{user?.name}</p>
            <p className="text-2xl font-medium text-black">{user?.email}</p>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex w-1/2 flex-col gap-2">
            {user?.post?.length ? (
              user.post.map((post, index) => (
                <div
                  className="flex flex-col rounded-xl bg-Blue p-4"
                  key={index}
                >
                  <div className="flex flex-row justify-between">
                    <p className="text-xl font-semibold text-white">
                      {post.title}
                    </p>
                    <p className="text-xl font-semibold text-white">
                      {moment(post.updatedAt).format('DD MMM YY')}
                    </p>
                  </div>
                  <p className="text-lg font-medium text-white">
                    {post.description}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-xl bg-Blue p-4">
                <p className="text-2xl font-semibold text-white">
                  You haven&apos;t posted anything yet!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage
