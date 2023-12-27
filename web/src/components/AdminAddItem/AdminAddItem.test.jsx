import { render } from '@redwoodjs/testing/web'

import AdminAddItem from './AdminAddItem'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AdminAddItem', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminAddItem />)
    }).not.toThrow()
  })
})
