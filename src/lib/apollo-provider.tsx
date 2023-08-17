"use client";
import { ApolloLink, HttpLink, SuspenseCache } from "@apollo/client";
import {
  ApolloNextAppProvider,
  SSRMultipartLink,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { ReactNode } from "react";

const makeClient = () => {
  const httpLink = new HttpLink({
    uri: "http://localhost:3000/api/graphql",
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({ stripDefer: true }),
            httpLink,
          ])
        : httpLink,
  });
};

// const makeSuspenseCache = () => {
//   return new SuspenseCache();
// };

export const ApolloWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
};
