import { render } from '@redwoodjs/testing/web'

import AdminTabComponent from './AdminTabComponent'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AdminTabComponent', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminTabComponent />)
    }).not.toThrow()
  })
})
