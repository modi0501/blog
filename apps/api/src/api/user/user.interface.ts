import { Model, Types } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  profilePicture: string | null;
  likedPosts: [Types.ObjectId];
}

export interface IUserDocument extends IUser, Document {}
export type IUserModel = Model<IUserDocument>;
