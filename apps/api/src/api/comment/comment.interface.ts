import { Types, Model } from "mongoose";

export interface IComment {
  user: Types.ObjectId;
  comment: string;
  blog: Types.ObjectId | null;
  parentComment: Types.ObjectId | null;
  replies?: IComment[];
}

export interface ICommentDocument extends IComment, Document {}
export type ICommentModel = Model<ICommentDocument>;
