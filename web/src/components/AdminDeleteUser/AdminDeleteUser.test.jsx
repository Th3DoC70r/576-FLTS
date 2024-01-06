import { render } from '@redwoodjs/testing/web'

import AdminDeleteUser from './AdminDeleteUser'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AdminDeleteUser', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminDeleteUser />)
    }).not.toThrow()
  })
})
