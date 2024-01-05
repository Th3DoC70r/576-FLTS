import { render } from '@redwoodjs/testing/web'

import AdminCopyEvent from './AdminCopyEvent'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AdminCopyEvent', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminCopyEvent />)
    }).not.toThrow()
  })
})
