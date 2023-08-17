import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import { NextRequest } from "next/server";
const typeDefs = require("@/graphql/schema");
const resolvers = require("@/graphql/resolver");

type Props = {
  categoryId: string;
};

// const typeDefs = gql`
//   type Question {
//     id: String
//     name: String
//     categoryId: String
//   }

//   type Category {
//     id: String
//     name: String
//   }

//   type Query {
//     Categories: [Category]
//     Questions(categoryId: String!): [Question]
//   }
// `;
// const resolvers = {
//   Query: {
//     Categories: async () => {
//       try {
//         const categories = await models.Category.findAll();
//         console.log(categories);
//         return categories;
//       } catch (err) {
//         return err;
//       }
//     },
//     Questions: async (_: any, { categoryId }: Props) => {
//       console.log(categoryId);
//       try {
//         const questions = await models.Question.findAll({
//           where: { categoryId },
//         });
//         console.log(questions);
//         return questions;
//       } catch (err) {
//         console.log(err);
//         return err;
//       }
//     },

// Options: async (_: any, { questionId }: { questionId: string }) => {
//   try {
//     const options = await models.Option.findAll({ where: { questionId } });
//     return options;
//   } catch (err) {
//     return err;
//   }
// },
// getQuestionsFromCategory: (_: any, { category: categoryName }: Props) => {
//   const QuestionSet = Questions.filter(
//     (category) => category.category === categoryName
//   );
//   console.log(QuestionSet);
//   return QuestionSet;
// },
// },
// };

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer, {
  context: async (req) => ({ req }),
});

export const GET = async (req: NextRequest) => {
  return handler(req);
};

export const POST = async (req: NextRequest) => {
  return handler(req);
};
