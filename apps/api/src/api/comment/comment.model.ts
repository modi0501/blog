import { Schema, Types, Model, model } from "mongoose";
import { ICommentDocument, ICommentModel } from "./comment.interface";

const commentSchema: Schema = new Schema(
  {
    user: { type: Types.ObjectId, required: true, ref: 'User' },
    comment: { type: String, required: true },
    blog: { type: Types.ObjectId || null, default: null, ref: 'Blog' },
    parentComment: { type: Types.ObjectId || null, default: null, ref: 'Comment' },
    replies: {type: [Types.ObjectId], ref:'Comment'}
  },
  { timestamps: true }
);

export default model<ICommentDocument, ICommentModel>("Comment", commentSchema);
