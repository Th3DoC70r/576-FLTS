export const schema = gql`
  type Item {
    id: Int!
    name: String!
    description: String!
    price: String!
    type: [String]!
    image: String!
    stock: Int!
  }

  type Query {
    items: [Item!]! @skipAuth
    item(id: Int!): Item @skipAuth
  }

  input CreateItemInput {
    name: String!
    description: String!
    price: String!
    type: [String]!
    image: String!
    stock: Int!
  }

  input UpdateItemInput {
    name: String
    description: String
    price: String
    type: [String]!
    image: String
    stock: Int
  }

  type Mutation {
    createItem(input: CreateItemInput!): Item! @requireAuth
    updateItem(id: Int!, input: UpdateItemInput!): Item! @requireAuth
    deleteItem(id: Int!): Item! @requireAuth
  }
`
