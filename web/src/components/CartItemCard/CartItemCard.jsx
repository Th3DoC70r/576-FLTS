import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi'

const CartItemCard = ({ name, desc, image, stock, quantity, price }) => {
  return (
    <div className="m-4 flex flex-row bg-Blue">
      <img src={image} alt={name} />
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <p className="text-xl font-semibold text-white">{name}</p>
          <p className="text-xl font-semibold text-white">
            {stock ? stock + ' in stock' : 'Out of Stock'}
          </p>
        </div>
        <p className="text-lg font-medium text-white">{desc}</p>
      </div>
      <div className="flex flex-row items-center gap-4">
        <p className="text-xl font-semibold text-white">{quantity}</p>
        <div className="flex flex-col items-center gap-2">
          <BiSolidUpArrow />
          <BiSolidDownArrow />
        </div>
      </div>
      <p className="text-xl font-semibold text-white">${price}</p>
      <button className="border border-Red px-3 py-1 text-xl font-medium text-Red">
        Remove
      </button>
    </div>
  )
}

export default CartItemCard
