import { AiFillInstagram } from 'react-icons/ai'
import {
  MdOutlineStorefront,
  MdOutlineForum,
  MdOutlineShoppingCart,
  MdOutlineChecklist,
  MdOutlineEvent,
} from 'react-icons/md'
import SqPatch from 'web/public/SqPatch.svg'

import { Link, routes } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import CartCell from 'src/components/CartCell/CartCell'
import ItemsCell from 'src/components/ItemsCell/ItemsCell'

import TabComponent from '../../components/TabComponent'
import EventPage from '../EventPage/EventPage'
import { USER_QUERY } from '../ProfilePage/ProfilePage'

const LandingPage = () => {
  const { isAuthenticated, currentUser } = useAuth()
  const user = useQuery(USER_QUERY, { variables: { id: currentUser?.id } })
  console.log(user)
  return (
    <>
      {isAuthenticated && user?.data?.user?.authenticated ? (
        <TabComponent
          data={[
            {
              label: 'Shop',
              value: 'shop',
              icon: <MdOutlineStorefront size={24} />,
              content: (
                <div className="flex w-full flex-wrap justify-center self-stretch">
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
            {
              label: 'Forums',
              value: 'forums',
              icon: <MdOutlineForum size={24} />,
              content: <div>Hi</div>,
            },
            {
              label: 'Events',
              value: 'events',
              icon: <MdOutlineEvent size={24} />,
              content: <EventPage />,
            },
            {
              label: 'Top Hand',
              value: 'topHand',
              icon: <MdOutlineChecklist size={24} />,
              content: <div>Hi</div>,
            },
            {
              label: 'Cart',
              value: 'cart',
              icon: <MdOutlineShoppingCart size={24} />,
              content: (
                <div className="flex w-full flex-wrap justify-center self-stretch">
                  <CartCell id={+currentUser.id} />
                </div>
              ),
            },
          ]}
          active={'events'}
        />
      ) : isAuthenticated ? (
        <p className="text-center text-3xl font-semibold text-black">
          Your account is still pending authentication. Please allow 3-5
          business days from account creation for your account to be
          authenticated.
        </p>
      ) : (
        <div className="m-4 flex flex-col items-center justify-center gap-4">
          <img
            src={SqPatch}
            alt="576th FLTS Squadron Patch"
            className="h-[350px]"
          />
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
      )}
    </>
  )
}

export default LandingPage
