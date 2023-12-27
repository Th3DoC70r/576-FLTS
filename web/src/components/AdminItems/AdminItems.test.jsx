import { render } from '@redwoodjs/testing/web'

import AdminItems from './AdminItems'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AdminItems', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminItems />)
    }).not.toThrow()
  })
})
