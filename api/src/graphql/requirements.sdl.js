export const schema = gql`
  type Requirement {
    id: Int!
    title: String!
    description: String!
  }

  type Query {
    requirements: [Requirement!]! @requireAuth
    requirement(id: Int!): Requirement @requireAuth
  }

  input CreateRequirementInput {
    title: String!
    description: String!
  }

  input UpdateRequirementInput {
    title: String
    description: String
  }

  type Mutation {
    createRequirement(input: CreateRequirementInput!): Requirement! @requireAuth
    updateRequirement(id: Int!, input: UpdateRequirementInput!): Requirement!
      @requireAuth
    deleteRequirement(id: Int!): Requirement! @requireAuth
  }
`
