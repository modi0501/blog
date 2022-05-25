import { gql } from "apollo-boost";

export const BLOG_LIST = gql`
  query GetAllBlogs {
    getAllBlogs {
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
      comments {
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
