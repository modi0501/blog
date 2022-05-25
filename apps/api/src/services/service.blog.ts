import Blog from "../api/blog/blog.model";
import User from "../api/user/user.model";

export default class BlogService {
  constructor() {}

  public static createPost = (input: any, user: any) => {
    const newPost = new Blog({
      ...input,
      author: user._id,
      createdOn: new Date(),
    });
    newPost.populate(["author", "comments"]);
    return newPost.save();
  };

  public static getBlogById = async (id: any) => {
    return await Blog.findById(id).populate([
      { path: "author" },
      { path: "comments", populate: { path: "user" } },
      { path: "likedBy" },
    ]);
  };

  public static getAllBlogs = async () => {
    return await Blog.find()
      .sort({ createdOn: -1 })
      .populate([
        { path: "author" },
        { path: "comments", populate: { path: "user" } },
      ]);
  };

  public static likePost = async (id: any, like: any, user: any) => {
    const blog = await Blog.findById(id);
    if (!blog) {
      throw new Error("Invalid blog ID");
    }
    if (!like) {
      // let isNotLiked = false;
      // user.likedPosts.forEach((post: any) => {
      //   if (String(post) === String(blog._id)) isNotLiked = true;
      // });
      // if (!isNotLiked) {
      //   throw new Error("Already not liked");
      // }
      // await Blog.findByIdAndUpdate(blog._id, {
      //   $inc: { likes: -1 },
      // });
      // await User.findByIdAndUpdate(user._id, {
      //   $pull: { likedPosts: blog._id },
      // });
      // return blog;
      let isNotLiked = false;
      blog.likedBy.forEach((liker: any) => {
        if (String(liker) === String(user._id)) isNotLiked = true;
      });

      if (!isNotLiked) {
        throw new Error("Already not liked");
      }
      await Blog.findByIdAndUpdate(blog._id, {
        $inc: { likes: -1 },
        $pull: { likedBy: user._id },
      });
      await User.findByIdAndUpdate(user._id, {
        $pull: { likedPosts: blog._id },
      });
      return (await Blog.findById(blog._id))?.populate([{ path: "likedBy" }]);
    }
    blog.likedBy.forEach((liker: any) => {
      if (String(liker) === String(user._id)) throw new Error("Already liked");
    });
    await Blog.findByIdAndUpdate(blog._id, {
      $inc: { likes: 1 },
      $push: { likedBy: user._id },
    });
    await User.findByIdAndUpdate(user._id, {
      $push: { likedPosts: blog._id },
    });
    return (await Blog.findById(blog._id))?.populate([{ path: "likedBy" }]);
  };
}
