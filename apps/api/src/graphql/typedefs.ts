import { gql } from "apollo-server-express";
import UserTypes from "./user/types";
import BlogTypes from "./blog/types";
import CommentTypes from "./comment/types";

const RootSchema = gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type Query

  type Mutation
`;

const typeDefs = [RootSchema, UserTypes, BlogTypes, CommentTypes];

export default typeDefs;
