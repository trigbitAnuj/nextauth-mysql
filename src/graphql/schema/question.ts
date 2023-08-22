import { gql } from "@apollo/client";

module.exports = gql`
  type Questions {
    id: String
    name: String
    categoryId: String
    options: [Options!]
  }

  type Query {
    getQuestionsWithId(categoryId: String!): [Questions!]
  }

  type Mutation {
    addQuestion(text: String!, categoryId: String!): AddQuestionResponse
  }
  type AddQuestionResponse {
    id: String
    name: String
    categoryId: String
  }
`;
