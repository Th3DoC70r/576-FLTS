import { useState } from 'react'

import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'
import SqPatch from 'web/public/SqPatch.svg'

import { Link, navigate, routes, useLocation } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { USER_QUERY } from 'src/pages/ProfilePage/ProfilePage'

const PageLayout = ({ children }) => {
  const { isAuthenticated, currentUser, hasRole, logOut } = useAuth()
  const { open, setOpen } = useState(false)
  const location = useLocation()
  const userInfo = useQuery(USER_QUERY, { variables: { id: currentUser?.id } })
  return (
    <div className="flex min-h-screen flex-col">
      <header className="grid grid-cols-3 items-center border-b-4 border-LightBlue bg-Blue p-4">
        <div className="justify-self-start">
          <Link to={routes.landing()}>
            <img src={SqPatch} alt="576 FLTS Squadron Patch" />
          </Link>
        </div>
        <div className="justify-self-center">
          <p className="text-4xl font-bold text-white">
            576th Flight Test Squadron
          </p>
        </div>
        <div className="justify-self-end">
          {isAuthenticated ? (
            <div className="flex flex-row items-center gap-4">
              <img
                className="h-16 w-16 rounded-lg text-white"
                src={userInfo?.data?.user?.image}
                alt={userInfo?.data?.user?.name}
              />
              <Menu
                placement="bottom"
                animate={{ mount: { y: 0 }, unmount: { y: 25 } }}
              >
                <MenuHandler>
                  <button
                    className="text-3xl font-semibold text-white focus:outline-LightBlue"
                    onClick={() => setOpen(!open)}
                  >
                    {userInfo?.data?.user?.name}
                  </button>
                </MenuHandler>
                <MenuList>
                  <MenuItem onClick={() => navigate(routes.profile())}>
                    Profile
                  </MenuItem>
                  {hasRole(['admin', 'super']) && (
                    <MenuItem onClick={() => navigate(routes.adminTools())}>
                      Admin Tools
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={() =>
                      logOut().then(() => navigate(routes.login()))
                    }
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          ) : (
            <>
              {location.pathname === '/login' ? null : (
                <Link
                  className="rounded-xl border border-2 px-5 py-3 text-3xl font-medium text-white"
                  to={routes.login()}
                >
                  Login
                </Link>
              )}
            </>
          )}
        </div>
      </header>

      <main className="flex grow items-center justify-center">{children}</main>

      <footer className="flex h-full flex-col border-t-4 border-LightBlue bg-Blue p-4">
        <p className="text-center text-3xl font-bold text-white">About Us</p>
        <p className="text-center text-xl font-semibold text-white">
          This site was coded by:
        </p>
        <p className="text-center text-lg font-medium text-white">
          SrA Elijah Snyder 576 FLTS
        </p>
        <p className="text-center text-lg font-medium text-white">and</p>
        <p className="text-center text-lg font-medium text-white">
          SSgt Alexander True 28 MXS
        </p>
      </footer>
    </div>
  )
}

export default PageLayout
