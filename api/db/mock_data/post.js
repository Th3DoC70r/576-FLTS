import { faker } from '@faker-js/faker'

export const posts = []
const category = ['Job', 'Training', 'General', 'Question', 'Missiles', 'Leadership', 'Air Force']

const generatePosts = () => {
  posts.push({
    user_id: faker.number.int({ min: 1, max: 10}),
    title: faker.word.words({ min: 1, max: 3}),
    description: faker.lorem.sentences({ min: 1, max: 6}),
    category: faker.helpers.arrayElements(category)
  })
}

const repeat = (func, times) => {
  func()
  times && --times && repeat(func, times)
}

repeat(generatePosts, 15)