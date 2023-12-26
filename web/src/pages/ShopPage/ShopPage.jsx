// import { Link, routes } from '@redwoodjs/router'
// import { MetaTags } from '@redwoodjs/web'
import ItemsCell from 'src/components/ItemsCell/ItemsCell'

const ShopPage = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <ItemsCell source={'shop'} />
    </div>
  )
}

export default ShopPage
