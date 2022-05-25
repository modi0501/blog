import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getCommentById(id: ID!): Comment
  }

  extend type Mutation {
    addComment(input: CommentInput!): Comment
    addReply(input: ReplyInput!): Comment
    deleteComment(id: ID!): Comment
  }

  type Comment {
    _id: ID
    user: User
    comment: String
    blog: Blog
    parentComment: Comment
    replies: [Comment]
    createdAt: Date
  }

  input CommentInput {
    comment: String!
    blog: ID!
  }

  input ReplyInput {
    comment: String!
    parentComment: ID!
  }
`;
