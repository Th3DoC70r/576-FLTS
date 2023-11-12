import { items, item, createItem, updateItem, deleteItem } from './items'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('items', () => {
  scenario('returns all items', async (scenario) => {
    const result = await items()

    expect(result.length).toEqual(Object.keys(scenario.item).length)
  })

  scenario('returns a single item', async (scenario) => {
    const result = await item({ id: scenario.item.one.id })

    expect(result).toEqual(scenario.item.one)
  })

  scenario('creates a item', async () => {
    const result = await createItem({
      input: {
        name: 'String',
        description: 'String',
        price: 'String',
        type: 'String',
        image: 'String',
        stock: 4479909,
      },
    })

    expect(result.name).toEqual('String')
    expect(result.description).toEqual('String')
    expect(result.price).toEqual('String')
    expect(result.type).toEqual('String')
    expect(result.image).toEqual('String')
    expect(result.stock).toEqual(4479909)
  })

  scenario('updates a item', async (scenario) => {
    const original = await item({ id: scenario.item.one.id })
    const result = await updateItem({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a item', async (scenario) => {
    const original = await deleteItem({ id: scenario.item.one.id })
    const result = await item({ id: original.id })

    expect(result).toEqual(null)
  })
})
