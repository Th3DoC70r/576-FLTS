import { render } from '@redwoodjs/testing/web'

import ItemModal from './ItemModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ItemModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ItemModal />)
    }).not.toThrow()
  })
})
