import { gql } from "@apollo/client";

module.exports = gql`
  type Category {
    id: String
    name: String
    questions: [Questions!]
  }

  type Query {
    getCategories: [Category!]
    getSingleCategory(categoryId: String!): Category
  }

  type Mutation {
    createCategory(name: String!): CreateCategoryResponse
  }

  type CreateCategoryResponse {
    id: String
    name: String
  }
`;
