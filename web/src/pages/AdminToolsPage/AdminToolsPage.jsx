import {
  MdOutlineChecklist,
  MdOutlineEvent,
  MdOutlineStorefront,
  MdOutlinePerson,
} from 'react-icons/md'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import AdminEvent from 'src/components/AdminEvent/AdminEvent'
import AdminItems from 'src/components/AdminItems/AdminItems'
import AdminTabComponent from 'src/components/AdminTabComponent/AdminTabComponent'

const AdminToolsPage = () => {
  const { isAuthenticated } = useAuth()
  return (
    <>
      {isAuthenticated ? (
        <>
          <MetaTags title="AdminTools" description="AdminTools page" />
          <AdminTabComponent
            data={[
              {
                label: 'Events',
                value: 'events',
                icon: <MdOutlineEvent size={24} />,
                content: <AdminEvent />,
              },
              {
                label: 'Items',
                value: 'items',
                icon: <MdOutlineStorefront size={24} />,
                content: <AdminItems />,
              },
              {
                label: 'Top Hand',
                value: 'topHand',
                icon: <MdOutlineChecklist size={24} />,
                content: (
                  <div className="flex w-full flex-wrap justify-center self-stretch">
                    <p>Butts</p>
                  </div>
                ),
              },
              {
                label: 'Users',
                value: 'users',
                icon: <MdOutlinePerson size={24} />,
                content: (
                  <div className="flex w-full flex-wrap justify-center self-stretch">
                    Butts
                  </div>
                ),
              },
            ]}
            active={'events'}
          />
        </>
      ) : (
        navigate(routes.landing())
      )}
    </>
  )
}

export default AdminToolsPage
