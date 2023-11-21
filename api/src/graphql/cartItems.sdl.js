export const schema = gql`
  type CartItem {
    id: Int!
    userId: Int!
    itemId: Int!
    quantity: Int!
    user: User!
    item: Item!
  }

  type Query {
    cartItems: [CartItem!]! @skipAuth
    cartItem(id: Int!): CartItem @skipAuth
  }

  input CreateCartItemInput {
    userId: Int!
    itemId: Int!
    quantity: Int!
  }

  input UpdateCartItemInput {
    userId: Int
    itemId: Int
    quantity: Int
  }

  type Mutation {
    createCartItem(input: CreateCartItemInput!): CartItem! @skipAuth
    updateCartItem(id: Int!, input: UpdateCartItemInput!): CartItem!
      @requireAuth
    deleteCartItem(id: Int!): CartItem! @skipAuth
  }
`
