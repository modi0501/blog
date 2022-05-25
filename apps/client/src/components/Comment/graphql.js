import { gql } from "apollo-boost";

export const COMMENT_BY_ID = gql`
  query GetCommentById($id: ID!) {
    getCommentById(id: $id) {
      user {
        name
      }
      comment
      replies {
        _id
        user {
          name
        }
        comment
        createdAt
      }
    }
    isAuthorised @client
    token @client
  }
`;

export const ADD_REPLY = gql`
  mutation AddReply($input: ReplyInput!) {
    addReply(input: $input) {
      user {
        name
        email
      }
      comment
      parentComment {
        comment
      }
      createdAt
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(id: $id) {
      comment
      _id
    }
  }
`;
