import { render } from '@redwoodjs/testing/web'

import AdminToolsPage from './AdminToolsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminToolsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminToolsPage />)
    }).not.toThrow()
  })
})
