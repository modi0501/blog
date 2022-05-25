import { baseResolver } from "./baseResolver";

export const isAuthenticatedResolver = baseResolver.createResolver(
  (_root, _args, { user }) => {
    if (!user) throw new Error("Unauthorised");
  }
);
