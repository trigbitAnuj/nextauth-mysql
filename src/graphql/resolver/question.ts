import { models } from "@/config/mysql";

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

  Mutation: {
    createQuestion: async (root: any, { text }: { text: string }) => {
      console.log(root);
      return await models.Question.create({
        name: text,
        categoryId: root.id,
      });
    },
  },
};
