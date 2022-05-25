import "graphql-import-node";
import { makeExecutableSchema } from "graphql-tools";
import resolvers from "./resolversMap";
import { GraphQLSchema } from "graphql";
import typeDefs from "./typedefs";
const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
export default schema;
