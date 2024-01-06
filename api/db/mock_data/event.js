import { faker } from '@faker-js/faker'

export const events = []
const type = ['official', 'morale']

const generateEvents = () => {
  events.push({
    title: faker.word.words({ min: 1, max: 4 }),
    description: faker.lorem.sentences({ min: 2, max: 4 }),
    date: faker.date.between({
      from: Date.now(),
      to: '2024-11-01T00:00:00:000Z',
    }),
    address: faker.location.streetAddress(),
    type: faker.helpers.arrayElements(['official', 'morale'])[0],
    flier: faker.datatype.boolean(),
    image: faker.image.url(),
  })
}

const repeat = (func, times) => {
  func()
  times && --times && repeat(func, times)
}

repeat(generateEvents, 5)
