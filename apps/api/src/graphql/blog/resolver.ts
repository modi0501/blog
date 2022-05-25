import { IResolvers } from "graphql-tools";
import BlogService from "../../services/service.blog";
import { isAuthenticatedResolver } from "../acl";

export const BlogResolvers: IResolvers = {
  Query: {
    getAllBlogs: (_: void) => {
      return BlogService.getAllBlogs();
    },

    getBlogById: (_: void, { id }) => {
      return BlogService.getBlogById(id);
    },
  },

  Mutation: {
    createPost: isAuthenticatedResolver.createResolver(
      (_: void, { input }, { user }) => {
        return BlogService.createPost(input, user);
      }
    ),

    likeOrRemoveLikePost: isAuthenticatedResolver.createResolver(
      (_: void, { id, like }, { user }) => {
        return BlogService.likePost(id, like, user);
      }
    ),
  },
};
