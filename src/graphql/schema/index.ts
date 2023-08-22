import gql from "graphql-tag";
const categorytype = require("./category");
const questiontype = require("./question");
const optionsType = require("./options");

const rootSchema = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

module.exports = [rootSchema, categorytype, questiontype, optionsType];
