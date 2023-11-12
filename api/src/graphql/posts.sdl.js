export const schema = gql`
  type Post {
    id: Int!
    user_id: Int!
    title: String!
    description: String!
    category: [String]!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
  }

  type Query {
    posts: [Post!]! @requireAuth
    post(id: Int!): Post @requireAuth
  }

  input CreatePostInput {
    user_id: Int!
    title: String!
    description: String!
    category: [String]!
  }

  input UpdatePostInput {
    user_id: Int
    title: String
    description: String
    category: [String]!
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post! @requireAuth
    updatePost(id: Int!, input: UpdatePostInput!): Post! @requireAuth
    deletePost(id: Int!): Post! @requireAuth
  }
`
