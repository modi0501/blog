import Blog from "../api/blog/blog.model";
import Comment from "../api/comment/comment.model";

export default class CommentService {
  constructor() {}

  public static addComment = async (input: any, user: any) => {
    if (!input.blog) {
      throw new Error("Provide a blog ID");
    }
    const blog = await Blog.findById(input.blog);
    if (!blog) {
      throw new Error("Invalid blog ID");
    }
    const newComment = await (
      await new Comment({
        user: user._id,
        ...input,
      }).populate(["user", "blog", "parentComment"])
    ).save();

    await Blog.findByIdAndUpdate(blog._id, {
      $push: { comments: newComment._id },
    });

    return newComment;
  };

  public static addReply = async (input: any, user: any) => {
    if (!input.parentComment) {
      throw new Error("Provide a Parent Comment ID");
    }
    const parentComment = await Comment.findById(input.parentComment);
    if (!parentComment) {
      throw new Error("Invalid parent comment ID");
    }
    const newComment = await (
      await new Comment({
        user: user._id,
        ...input,
      }).populate(["user", "blog", "parentComment"])
    ).save();

    console.log(newComment._id);
    await Comment.findByIdAndUpdate(parentComment._id, {
      $push: { replies: newComment._id },
    });

    return newComment;
  };

  public static getCommentById = async (id: any) => {
    const comment = await Comment.findById(id);
    if (!comment) {
      throw new Error("Invalid comment ID");
    }
    return comment.populate([
      { path: "replies", populate: { path: "user" } },
      "user",
    ]);
  };

  public static deleteComment = async (id: any, user: any) => {
    const comment = await Comment.findById(id);
    if (!comment) {
      throw new Error("Invalid comment ID");
    }
    if (String(comment.user) !== String(user._id)) {
      throw new Error("Not authorised to delete this comment!");
    }
    if (comment.blog) {
      const blog = await Blog.findById(comment.blog);
      if (!blog) {
        throw new Error("Invalid blog ID");
      }
      await Blog.findByIdAndUpdate(blog._id, {
        $pull: { comments: comment._id },
      });
    } else if (comment.parentComment) {
      const parentComment = await Comment.findById(comment.parentComment);
      if (!parentComment) {
        throw new Error("Invalid parent comment ID");
      }
      await Comment.findByIdAndUpdate(parentComment._id, {
        $pull: { replies: comment._id },
      });
    }
    return await Comment.findByIdAndDelete(comment._id);
  };
}
