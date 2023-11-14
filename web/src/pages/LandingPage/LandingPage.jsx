import SqPatch from 'web/public/SqPatch.svg'

import { Link, routes } from '@redwoodjs/router'

const LandingPage = () => {
  return (
    <div className="m-4 flex flex-col items-center justify-center gap-4">
      <img src={SqPatch} alt="576th FLTS Squadron Patch" />
      <div className="flex flex-row gap-4">
        <Link
          className="rounded-lg bg-Blue px-3 py-1 text-2xl font-semibold text-white"
          to={routes.shop()}
        >
          Shop
        </Link>
        <Link
          className="rounded-lg bg-Blue px-3 py-1 text-2xl font-semibold text-white"
          to={routes.shop()}
        >
          Instagram
        </Link>
        <Link
          className="rounded-lg bg-Blue px-3 py-1 text-2xl font-semibold text-white"
          to={routes.login()}
        >
          Login
        </Link>
      </div>
    </div>
  )
}

export default LandingPage
