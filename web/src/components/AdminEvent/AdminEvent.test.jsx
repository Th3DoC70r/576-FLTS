import { render } from '@redwoodjs/testing/web'

import AdminEvent from './AdminEvent'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AdminEvent', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminEvent />)
    }).not.toThrow()
  })
})
