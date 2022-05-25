import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getAllBlogs: [Blog]
    getBlogById(id: ID!): Blog
  }

  extend type Mutation {
    createPost(input: CreatePostInput!): Blog
    likeOrRemoveLikePost(id: ID!, like: Int!): Blog
  }

  type Blog {
    _id: ID
    title: String!
    author: User
    content: String!
    createdOn: Date!
    tags: [String]
    comments: [Comment]
    likedBy: [User]
    likes: Int
  }
  scalar Date

  input CreatePostInput {
    title: String!
    content: String!
    tags: [String]
  }
`;
