import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const CartPage = () => {
  return (
    <>
      <MetaTags title="Cart" description="Cart page" />

      <h1>CartPage</h1>
      <p>
        Find me in <code>./web/src/pages/CartPage/CartPage.jsx</code>
      </p>
      <p>
        My default route is named <code>cart</code>, link to me with `
        <Link to={routes.cart()}>Cart</Link>`
      </p>
    </>
  )
}

export default CartPage
