import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const ShopPage = () => {
  return (
    <>
      <MetaTags title="Shop" description="Shop page" />

      <h1>ShopPage</h1>
      <p>
        Find me in <code>./web/src/pages/ShopPage/ShopPage.jsx</code>
      </p>
      <p>
        My default route is named <code>shop</code>, link to me with `
        <Link to={routes.shop()}>Shop</Link>`
      </p>
    </>
  )
}

export default ShopPage
