import { faker } from '@faker-js/faker'

export const items = []
const type = ['Mission Patch', 'Squadron Patch', 'Coin', 'Clothing', 'Cups/Mugs', 'Sticker']

const generateItem = () => {
  items.push({
    name: faker.word.words({ min: 1, max: 3 }),
    description: faker.lorem.sentences({ min: 1, max: 5 }),
    price: faker.number.int({ max: 25}),
    type: [faker.helpers.arrayElement(type)],
    image: faker.image.url()
  })
}

const repeat = (func, times) => {
  func()
  times && --times && repeat(func, times)
}

repeat(generateItem, 25)