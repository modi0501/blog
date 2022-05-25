import { Schema, Types, Model, model } from "mongoose";
import { IBlogDocument, IBlogModel } from "./blog.interface";

const blogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Types.ObjectId, required: true, ref: "User" },
    content: { type: String, required: true },
    createdOn: { type: Date, required: true },
    tags: { type: [String] },
    comments: { type: [Types.ObjectId], ref: "Comment" },
    likedBy: {type: [Types.ObjectId], ref: "User"},
    likes: {type: Number, default: 0}
  },
  { timestamps: true }
);

export default model<IBlogDocument, IBlogModel>("Blog", blogSchema);
