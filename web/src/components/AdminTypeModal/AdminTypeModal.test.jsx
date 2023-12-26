import { render } from '@redwoodjs/testing/web'

import AdminTypeModal from './AdminTypeModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AdminTypeModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminTypeModal />)
    }).not.toThrow()
  })
})
