import { models } from "@/config/mysql";
import gql from "graphql-tag";
import { StringDataType } from "sequelize";

module.exports = {
  Mutation: {
    createQuestion: async (root, { text }) => {
      return await models.Question.create({
        categoryId: root.id,
        name: text,
      });
    },
  },
};
