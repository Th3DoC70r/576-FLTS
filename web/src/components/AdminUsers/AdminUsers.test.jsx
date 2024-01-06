import { render } from '@redwoodjs/testing/web'

import AdminUsers from './AdminUsers'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AdminUsers', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminUsers />)
    }).not.toThrow()
  })
})
