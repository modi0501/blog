import { gql } from "apollo-boost";

export const SIGNIN = gql`
  mutation Signin($input: SigninInput!) {
    signin(input: $input) {
      user {
        name
        email
        password
      }
      token {
        token
      }
    }
  }
`;
