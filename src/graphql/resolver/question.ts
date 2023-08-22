import { models } from "@/config/mysql";
import Question from "@/model/question/model";

module.exports = {
  Query: {
    getQuestionsWithId: async (
      root: any,
      { categoryId }: { categoryId: string }
    ) => {
      const questionwithid = await models.Question.findAll({
        where: { categoryId },
      });
      console.log(questionwithid);
      return questionwithid;
    },
  },
  Questions: {
    options: (root: Question) => {
      console.log(root);
      console.log(root.getOptions());
      return root.getOptions();
    },
  },

  Mutation: {
    addQuestion: async (
      root: any,
      { text, categoryId }: { text: string; categoryId: string }
    ) => {
      console.log(root);
      const category = await models.Category.findByPk(categoryId);
      if (category) {
        console.log(category);

        return await models.Question.create({
          name: text,
          categoryId: category.id,
        });
      }
    },
  },
};
