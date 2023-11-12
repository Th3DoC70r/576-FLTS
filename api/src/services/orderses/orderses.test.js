import {
  orderses,
  orders,
  createOrders,
  updateOrders,
  deleteOrders,
} from './orderses'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('orderses', () => {
  scenario('returns all orderses', async (scenario) => {
    const result = await orderses()

    expect(result.length).toEqual(Object.keys(scenario.orders).length)
  })

  scenario('returns a single orders', async (scenario) => {
    const result = await orders({ id: scenario.orders.one.id })

    expect(result).toEqual(scenario.orders.one)
  })

  scenario('creates a orders', async () => {
    const result = await createOrders({
      input: {
        name: 'String',
        address: 'String',
        method: 'String',
        total: 6938389,
        item_ids: 'String',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.address).toEqual('String')
    expect(result.method).toEqual('String')
    expect(result.total).toEqual(6938389)
    expect(result.item_ids).toEqual('String')
  })

  scenario('updates a orders', async (scenario) => {
    const original = await orders({ id: scenario.orders.one.id })
    const result = await updateOrders({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a orders', async (scenario) => {
    const original = await deleteOrders({
      id: scenario.orders.one.id,
    })
    const result = await orders({ id: original.id })

    expect(result).toEqual(null)
  })
})
