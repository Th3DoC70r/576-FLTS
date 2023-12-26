import { render } from '@redwoodjs/testing/web'

import AdminItemModal from './AdminItemModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AdminItemModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminItemModal />)
    }).not.toThrow()
  })
})
