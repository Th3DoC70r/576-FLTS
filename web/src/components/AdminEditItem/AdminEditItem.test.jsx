import { render } from '@redwoodjs/testing/web'

import AdminEditItem from './AdminEditItem'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AdminEditItem', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminEditItem />)
    }).not.toThrow()
  })
})
