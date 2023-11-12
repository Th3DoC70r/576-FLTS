export const schema = gql`
  type Event {
    id: Int!
    title: String!
    description: String
    date: DateTime!
    flier: Boolean!
    image: String
    address: String!
    type: String!
  }

  type Query {
    events: [Event!]! @requireAuth
    event(id: Int!): Event @requireAuth
  }

  input CreateEventInput {
    title: String!
    description: String
    date: DateTime!
    flier: Boolean!
    image: String
    address: String!
    type: String!
  }

  input UpdateEventInput {
    title: String
    description: String
    date: DateTime
    flier: Boolean
    image: String
    address: String
    type: String
  }

  type Mutation {
    createEvent(input: CreateEventInput!): Event! @requireAuth
    updateEvent(id: Int!, input: UpdateEventInput!): Event! @requireAuth
    deleteEvent(id: Int!): Event! @requireAuth
  }
`
