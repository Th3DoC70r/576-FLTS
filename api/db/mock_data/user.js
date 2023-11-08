import { faker } from '@faker-js/faker'

import { hashPassword } from '@redwoodjs/auth-dbauth-api'

export const users = []

const generateUser = () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const [hashedPassword, salt] = hashPassword('password')
  users.push({
    name: `${firstName} ${lastName}`,
    password: hashedPassword,
    salt: salt,
    email: faker.internet.email({ firstName, lastName}),
    roles: ['user'],
    image: faker.image.url(),
    authenticated: faker.datatype.boolean(),
    reason: faker.lorem.sentence(),
    image: faker.image.avatar()
  })
}

const repeat = (func, times) => {
  func()
  times && --times && repeat(func, times)
}

repeat(generateUser, 10)