import { IResolvers } from "graphql-tools";
import CommentService from "../../services/service.comment";
import { isAuthenticatedResolver } from "../acl";

export const CommentResolvers: IResolvers = {
  Query: {
    getCommentById: (_: void, { id }) => {
      return CommentService.getCommentById(id);
    },
  },

  Mutation: {
    addComment: isAuthenticatedResolver.createResolver(
      (_: void, { input }, { user }) => {
        return CommentService.addComment(input, user);
      }
    ),

    addReply: isAuthenticatedResolver.createResolver(
      (_: void, { input }, { user }) => {
        return CommentService.addReply(input, user);
      }
    ),

    deleteComment: isAuthenticatedResolver.createResolver(
      (_: void, { id }, { user }) => {
        return CommentService.deleteComment(id, user);
      }
    ),
  },
};
