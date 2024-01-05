import { render } from '@redwoodjs/testing/web'

import AdminEditEvent from './AdminEditEvent'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AdminEditEvent', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminEditEvent />)
    }).not.toThrow()
  })
})
