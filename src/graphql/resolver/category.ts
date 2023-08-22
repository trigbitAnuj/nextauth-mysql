import { models } from "@/config/mysql";

type ParentId = {
  id: string;
};

module.exports = {
  Query: {
    getCategories: async () => {
      const allCategories = await models.Category.findAll();
      return allCategories;
    },

    getSingleCategory: async (
      _: any,
      { categoryId }: { categoryId: string }
    ) => {
      console.log(categoryId);
      const singleCategory = await models.Category.findByPk(categoryId);
      console.log(singleCategory);
      return singleCategory;
    },
  },

  Category: {
    questions: (root: any) => {
      console.log(root);
      return root.getQuestions();
    },
    // options:(root: any) => {
    //   console.log(root);
    //   return root.getOptions();
    // },
  },

  Mutation: {
    createCategory: async (parent: any, { name }: { name: string }) => {
      console.log(parent, name);
      return await models.Category.create({
        name,
      });
    },
  },
};
