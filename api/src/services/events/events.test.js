import { events, event, createEvent, updateEvent, deleteEvent } from './events'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('events', () => {
  scenario('returns all events', async (scenario) => {
    const result = await events()

    expect(result.length).toEqual(Object.keys(scenario.event).length)
  })

  scenario('returns a single event', async (scenario) => {
    const result = await event({ id: scenario.event.one.id })

    expect(result).toEqual(scenario.event.one)
  })

  scenario('creates a event', async () => {
    const result = await createEvent({
      input: {
        title: 'String',
        date: '2023-11-09T05:57:16.814Z',
        flier: true,
        address: 'String',
        type: 'String',
      },
    })

    expect(result.title).toEqual('String')
    expect(result.date).toEqual(new Date('2023-11-09T05:57:16.814Z'))
    expect(result.flier).toEqual(true)
    expect(result.address).toEqual('String')
    expect(result.type).toEqual('String')
  })

  scenario('updates a event', async (scenario) => {
    const original = await event({ id: scenario.event.one.id })
    const result = await updateEvent({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a event', async (scenario) => {
    const original = await deleteEvent({ id: scenario.event.one.id })
    const result = await event({ id: original.id })

    expect(result).toEqual(null)
  })
})
