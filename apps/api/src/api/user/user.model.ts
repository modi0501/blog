import { Schema, model, Types } from "mongoose";
import { IUserDocument, IUserModel } from "./user.interface";

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String || null, required: true },
    likedPosts: { type: [Types.ObjectId] },
  },
  { timestamps: true }
);

export default model<IUserDocument, IUserModel>("User", userSchema);
