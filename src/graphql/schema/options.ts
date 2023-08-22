import gql from "graphql-tag";

module.exports = gql`
  type Options {
    id: String
    option: String
    questionId: String
  }

  type Query {
    getOptions: [Options!]
  }
  type Mutation {
    addOption(option: String!, questionId: String!): addOptionResponse
  }

  type addOptionResponse {
    id: String
    questionId: String
    option: String
  }
`;
