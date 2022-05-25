import { gql } from "apollo-boost";

export const CREATE_BLOG = gql`
  mutation CreateBlog($input: CreatePostInput!) {
    createPost(input: $input) {
      title
      author {
        _id
        name
        email
      }
      content
      createdOn
      tags
    }
  }
`;
