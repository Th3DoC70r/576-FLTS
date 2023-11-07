import { faker } from '@faker-js/faker'

export const orders = []

const methods = ['Credit', 'Debit', 'Venmo']

const genratreOrders = () => {
  orders.push({
    name: faker.person.fullname(),
    address: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state({ abbreviated: true })}, ${faker.location.zipCode()}`,
    method: [faker.helpers.arrayElements(methods)],
    total: faker.number.int({ max: 30}),
    shipped: faker.datatype.boolean(),
    delivered: faker.datatype.boolean(),
    item_ids: [`${faker.number.int({ max: 25})}`, `${faker.number.int({ max: 25})}`, `${faker.number.int({ max: 25})}`]
  })

}

const repeat = (func, times) => {
  func()
  times && --times && repeat(func, times)
}

repeat(generateOrders, 10)