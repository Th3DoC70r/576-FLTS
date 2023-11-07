import { faker } from '@faker-js/faker'

import { hashPassword } from '@redwoodjs/auth-dbauth-api'

export const users = []

const generateUser = () => {
  const [hashedPassword, salt] = hashPassword('password')
  users.push({
    name: faker.person.fullname(),
    password: hashedPassword,
    salt: salt,
    email: faker.internet.email(),
    roles: ['user'],
    image: faker.image.url(),
    authenticated: faker.datatype.boolean(),
    reason: faker.lorem.sentence(),
  })
}

const repeat = (func, times) => {
  func()
  times && --times && repeat(func, times)
}

repeat(generateUser, 10)