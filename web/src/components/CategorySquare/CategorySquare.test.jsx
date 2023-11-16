import { render } from '@redwoodjs/testing/web'

import CategorySquare from './CategorySquare'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CategorySquare', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CategorySquare />)
    }).not.toThrow()
  })
})
