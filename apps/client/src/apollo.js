import { setContext } from "@apollo/client/link/context";
import { split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

import { getMainDefinition } from "@apollo/client/utilities";

import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { AUTH_TOKEN } from "./constants";

const httpLink = createHttpLink({
  uri: "https://truly-yours-blog.herokuapp.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    },
  };
});

const wsLink = new GraphQLWsLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(AUTH_TOKEN),
    },
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Link: {
        keyFields: ["id"],
      },
      Query: {
        fields: {
          blog(_, { args, toReference }) {
            return toReference({
              __typename: "Blog",
              id: args.id,
            });
          },
          isAuthorised: {
            read(_, { variables }) {
              return localStorage.getItem(AUTH_TOKEN) ? true : false;
            },
          },
          token: {
            read(_, { variables }) {
              return localStorage.getItem(AUTH_TOKEN) && "";
            },
          },
        },
      },
    },
  }),
});
