import { gql } from "apollo-boost";

export const BLOG = gql`
  query GetBlogById($id: ID!) {
    getBlogById(id: $id) {
      _id
      title
      author {
        _id
        name
        email
      }
      content
      createdOn
      tags
      likedBy {
        email
      }
      likes
      comments {
        _id
        user {
          name
          email
        }
        comment
        createdAt
      }
    }
    isAuthorised @client
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($input: CommentInput!) {
    addComment(input: $input) {
      user {
        name
        email
      }
      comment
      blog {
        title
        content
      }
      parentComment {
        comment
      }
    }
  }
`;

export const LIKE_REMOVE_LIKE = gql`
  mutation LikeOrRemoveLikePost($id: ID!, $like: Int!) {
    likeOrRemoveLikePost(id: $id, like: $like) {
      title
      likes
      likedBy {
        email
      }
    }
  }
`;
