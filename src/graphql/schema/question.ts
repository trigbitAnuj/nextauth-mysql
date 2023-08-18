import { gql } from "@apollo/client";

module.exports = gql`
  type Questions {
    id: String
    name: String
    categoryId: String
  }

  type Query {
    getQuestionsWithId(categoryId: String): Questions
  }

  type Mutation {
    createQuestion(text: String!): CreateQuestionResponse
  }
  type CreateQuestionResponse {
    id: String
    name: String
    categoryId: String
  }
`;
