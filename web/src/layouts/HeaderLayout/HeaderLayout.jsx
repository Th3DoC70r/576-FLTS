import { useState } from 'react'

import SqPatch from 'web/public/SqPatch.svg'

import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

const HeaderLayout = ({ children }) => {
  const { isAuthenticated, currentUser } = useAuth()
  const { open, setOpen } = useState(false)
  return (
    <>
      <header className="flex flex-row items-center justify-between border-b-4 border-LightBlue bg-Blue p-4">
        <img src={SqPatch} alt="576 FLTS Squadron Patch" />
        <p className="text-4xl font-bold text-white">
          576th Flight Test Squadron
        </p>
        {isAuthenticated ? (
          <div className="flex flex-row items-center">
            <img src={currentUser.image} alt={currentUser.name} />
            <button
              className="text-3xl font-semibold text-white"
              onClick={() => setOpen(!open)}
            >
              {currentUser.name}
            </button>
          </div>
        ) : (
          <Link
            className="rounded-xl border border-LightBlue px-3 py-1 text-2xl font-medium text-LightBlue"
            to={routes.login()}
          >
            Login
          </Link>
        )}
      </header>
      <main>{children}</main>
    </>
  )
}

export default HeaderLayout
