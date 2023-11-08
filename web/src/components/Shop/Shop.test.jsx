import { render } from '@redwoodjs/testing/web'

import Shop from './Shop'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Shop', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Shop />)
    }).not.toThrow()
  })
})
