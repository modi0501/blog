import { IResolvers } from "graphql-tools";
import UserService from "../../services/service.user";

export const UserResolvers: IResolvers = {
  Query: {
    // getName(_: void): String {
    //   return "Hey there";
    // },
  },
  Mutation: {
    signup: (_: void, { input }) => {
      return UserService.signup(input);
    },
    signin: (_: void, { input }) => {
      return UserService.signin(input);
    },
  },
};
