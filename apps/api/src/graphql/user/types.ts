import { gql } from "apollo-server-express";

export default gql`

  extend type Mutation {
    signup(input: SignupInput!): User
    signin(input: SigninInput!): UserToken
  }

  type User {
    _id: ID
    name: String
    email: String
    password: String
    likedPosts: [ID]
  }

  type UserToken {
    user: User
    token: Token
  }

  type Token {
    token: String
  }

  input SignupInput {
    name: String!
    email: String!
    password: String!
    profilePicture: String
  }

  input SigninInput {
    email: String!
    password: String!
  }
`;
