import { gql } from "apollo-boost";

export const SIGNUP = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      name
      email
      password
    }
  }
`;
