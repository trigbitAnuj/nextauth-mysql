import { gql } from "@apollo/client";

module.exports = gql`
  type Mutation {
    createCategory(name: String!): CreateCategoryResponse
  }

  type CreateCategoryResponse {
    id: String
    name: String
  }
`;
