import {
  requirements,
  requirement,
  createRequirement,
  updateRequirement,
  deleteRequirement,
} from './requirements'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('requirements', () => {
  scenario('returns all requirements', async (scenario) => {
    const result = await requirements()

    expect(result.length).toEqual(Object.keys(scenario.requirement).length)
  })

  scenario('returns a single requirement', async (scenario) => {
    const result = await requirement({ id: scenario.requirement.one.id })

    expect(result).toEqual(scenario.requirement.one)
  })

  scenario('creates a requirement', async () => {
    const result = await createRequirement({
      input: { title: 'String', description: 'String' },
    })

    expect(result.title).toEqual('String')
    expect(result.description).toEqual('String')
  })

  scenario('updates a requirement', async (scenario) => {
    const original = await requirement({
      id: scenario.requirement.one.id,
    })
    const result = await updateRequirement({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a requirement', async (scenario) => {
    const original = await deleteRequirement({
      id: scenario.requirement.one.id,
    })
    const result = await requirement({ id: original.id })

    expect(result).toEqual(null)
  })
})
