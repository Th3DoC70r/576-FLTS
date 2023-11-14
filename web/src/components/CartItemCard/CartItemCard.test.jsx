import { render } from '@redwoodjs/testing/web'

import CartItemCard from './CartItemCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CartItemCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CartItemCard />)
    }).not.toThrow()
  })
})
