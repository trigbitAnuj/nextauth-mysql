import { models } from "@/config/mysql";

module.exports = {
  Mutation: {
    async createCategory(
      parent: any,
      { name }: { name: string },
      contextValue: any,
      info: any
    ) {
      console.log(parent, name, contextValue, info);

      return await models.Category.create({
        name,
      });
    },
  },
};
