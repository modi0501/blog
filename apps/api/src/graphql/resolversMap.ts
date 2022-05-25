import { IResolvers } from "graphql-tools";
import { merge } from "lodash";
import { UserResolvers } from "./user/resolver";
import { BlogResolvers } from "./blog/resolver";
import { CommentResolvers } from "./comment/resolver";

const resolverMap: IResolvers = merge(
  UserResolvers,
  BlogResolvers,
  CommentResolvers
);
export default resolverMap;
