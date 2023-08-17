import { gql } from "@apollo/client";

module.exports = gql`
  type Mutation {
    createQuestion(text: String!): CreateQuestionResponse
  }
  type CreateQuestionResponse {
    id: String
    name: String
    categoryId: String
  }
`;
