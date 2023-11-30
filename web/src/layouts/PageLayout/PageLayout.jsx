import { useState } from 'react'

import SqPatch from 'web/public/SqPatch.svg'

import { Link, routes, useLocation } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

const PageLayout = ({ children }) => {
  const { isAuthenticated, currentUser } = useAuth()
  const { open, setOpen } = useState(false)
  const location = useLocation()

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
                className="h-16 w-16"
                src={currentUser?.image}
                alt={currentUser?.name}
              />
              <button
                className="text-3xl font-semibold text-white"
                onClick={() => setOpen(!open)}
              >
                {currentUser?.name}
              </button>
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
