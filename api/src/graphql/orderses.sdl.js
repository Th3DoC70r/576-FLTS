export const schema = gql`
  type Orders {
    id: Int!
    name: String!
    address: String!
    method: String!
    total: Int!
    shipped: Boolean!
    delivered: Boolean!
    item_ids: [String]!
  }

  type Query {
    orderses: [Orders!]! @requireAuth
    orders(id: Int!): Orders @requireAuth
  }

  input CreateOrdersInput {
    name: String!
    address: String!
    method: String!
    total: Int!
    shipped: Boolean!
    delivered: Boolean!
    item_ids: [String]!
  }

  input UpdateOrdersInput {
    name: String
    address: String
    method: String
    total: Int
    shipped: Boolean
    delivered: Boolean
    item_ids: [String]!
  }

  type Mutation {
    createOrders(input: CreateOrdersInput!): Orders! @requireAuth
    updateOrders(id: Int!, input: UpdateOrdersInput!): Orders! @requireAuth
    deleteOrders(id: Int!): Orders! @requireAuth
  }
`
