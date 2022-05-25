import { Types, Model } from "mongoose";

export interface IBlog {
  title: string;
  author: Types.ObjectId;
  content: string;
  createdOn: Date;
  tags?: string[];
  comments?: Types.ObjectId[];
  likedBy: Types.ObjectId[];
  likes: number;
}

export interface IBlogDocument extends IBlog, Document {}

export type IBlogModel = Model<IBlogDocument>;
