import { render } from '@redwoodjs/testing/web'

import AdminAddEvent from './AdminAddEvent'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AdminAddEvent', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminAddEvent />)
    }).not.toThrow()
  })
})
