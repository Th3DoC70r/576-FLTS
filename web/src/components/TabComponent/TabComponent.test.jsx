import { render } from '@redwoodjs/testing/web'

import TabComponent from './TabComponent'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TabComponent', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TabComponent />)
    }).not.toThrow()
  })
})
