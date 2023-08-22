import { models } from "@/config/mysql";
import Option from "@/model/options/model";

module.exports = {
  Query: {
    getOptions: async () => {
      return await models.Option.findAll();
    },
  },

  Mutation: {
    addOption: async (
      _: any,
      { option, questionId }: { option: string; questionId: string }
    ) => {
      const question = await models.Question.findByPk(questionId);
      console.log(question?.id);
      if (question) {
        return await models.Option.create({
          questionId: question.id,
          option,
        });
      }
    },
  },
};
