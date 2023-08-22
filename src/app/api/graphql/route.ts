import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import { NextRequest } from "next/server";
const typeDefs = require("@/graphql/schema");
const resolvers = require("@/graphql/resolver");

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
