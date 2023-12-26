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
    createItem(input: CreateItemInput!): Item! @skipAuth
    updateItem(id: Int!, input: UpdateItemInput!): Item! @skipAuth
    deleteItem(id: Int!): Item! @skipAuth
  }
`
