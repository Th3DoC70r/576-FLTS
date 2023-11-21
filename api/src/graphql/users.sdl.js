export const schema = gql`
  type User {
    id: Int!
    email: String!
    name: String!
    password: String!
    salt: String!
    authenticated: Boolean
    reason: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    roles: [String]!
    image: String
    post: [Post]!
    cart: [CartItem]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @skipAuth
  }

  input CreateUserInput {
    email: String!
    name: String!
    password: String!
    salt: String!
    authenticated: Boolean
    reason: String!
    roles: [String]!
    image: String
  }

  input UpdateUserInput {
    email: String
    name: String
    password: String
    salt: String
    authenticated: Boolean
    reason: String
    roles: [String]!
    image: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
