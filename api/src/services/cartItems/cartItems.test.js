import {
  cartItems,
  cartItem,
  createCartItem,
  updateCartItem,
  deleteCartItem,
} from './cartItems'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('cartItems', () => {
  scenario('returns all cartItems', async (scenario) => {
    const result = await cartItems()

    expect(result.length).toEqual(Object.keys(scenario.cartItem).length)
  })

  scenario('returns a single cartItem', async (scenario) => {
    const result = await cartItem({ id: scenario.cartItem.one.id })

    expect(result).toEqual(scenario.cartItem.one)
  })

  scenario('creates a cartItem', async (scenario) => {
    const result = await createCartItem({
      input: {
        userId: scenario.cartItem.two.userId,
        itemId: scenario.cartItem.two.itemId,
        quantity: 8834929,
      },
    })

    expect(result.userId).toEqual(scenario.cartItem.two.userId)
    expect(result.itemId).toEqual(scenario.cartItem.two.itemId)
    expect(result.quantity).toEqual(8834929)
  })

  scenario('updates a cartItem', async (scenario) => {
    const original = await cartItem({
      id: scenario.cartItem.one.id,
    })
    const result = await updateCartItem({
      id: original.id,
      input: { quantity: 166287 },
    })

    expect(result.quantity).toEqual(166287)
  })

  scenario('deletes a cartItem', async (scenario) => {
    const original = await deleteCartItem({
      id: scenario.cartItem.one.id,
    })
    const result = await cartItem({ id: original.id })

    expect(result).toEqual(null)
  })
})
