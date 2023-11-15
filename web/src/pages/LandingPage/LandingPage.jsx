import SqPatch from 'web/public/SqPatch.svg'

import { MdOutlineStorefront } from 'react-icons/md'
import { AiFillInstagram } from 'react-icons/ai'

import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

import TabComponent from '../../components/TabComponent'

import ItemsCell from 'src/components/ItemsCell/ItemsCell'

const LandingPage = () => {
  const { isAuthenticated, currentUser } = useAuth()

  return (
    <div className="m-4 flex flex-col items-center justify-center gap-4">
      {isAuthenticated ? (
        <TabComponent
          data={[
            {
              label: 'Shop',
              value: 'shop',
              icon: <MdOutlineStorefront size={24} />,
              content: (
                <div className="flex flex-wrap justify-center">
                  <ItemsCell />
                </div>
              ),
            },
            {
              label: 'Instagram',
              value: 'insta',
              icon: <AiFillInstagram size={24} />,
              content: <div>Hi</div>,
            },
          ]}
          active={'shop'}
        />
      ) : (
        <>
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
          </div>{' '}
        </>
      )}
    </div>
  )
}

export default LandingPage
