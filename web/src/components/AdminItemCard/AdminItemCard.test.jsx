import { render } from '@redwoodjs/testing/web'

import AdminItemCard from './AdminItemCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AdminItemCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminItemCard />)
    }).not.toThrow()
  })
})
