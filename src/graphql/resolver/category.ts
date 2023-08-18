import { models } from "@/config/mysql";
import Category from "@/model/category/model";

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
    questions: async (root: any) => {
      console.log(root);
      const question = root.getQuestions();
      console.log(question);
      return root.getQuestions();
    },
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
