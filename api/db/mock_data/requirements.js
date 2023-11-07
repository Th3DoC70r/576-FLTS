import { faker } from '@faker-js/faker'

export const requirements = []

const generateReqs = () => {
  requirements.push({
    title: faker.word.words({ min: 3, max: 6}),
    description: faker.lorem.sentences({ min: 1, max: 2})
  })
}

const repeat = (func, times) => {
  func()
  times && --times && repeat(func, times)
}

repeat(generateReqs, 35)