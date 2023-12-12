import { render } from '@redwoodjs/testing/web'

import ProfileEditModal from './ProfileEditModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ProfileEditModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProfileEditModal />)
    }).not.toThrow()
  })
})
