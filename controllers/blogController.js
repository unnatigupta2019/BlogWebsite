const Blog = require("../models/blog");

const postBlog = async (req, res) => {
  const { title } = req.body;

  const blog = new Blog({
    title,
    user: req.user.userId,
  });
  //console.log(blog);
  await blog.save();

  res.status(201).json({ msg: "Blog Created Successfully" });
};

const updateBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  // console.log(blog.user);
  const currentuser = req.user.userId;
  //console.log(currentuser);
  if (blog.user == currentuser) {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!req.params.id) {
      return res.status(400).json({ error: "No Blog" });
    }
    res.send({ msg: "Updated Successfully", updateBlog });
    await updatedBlog.save();
  } else {
    res.status(400).json({ error: "No permission to update" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    const currentuser = req.user.userId;

    if (blog.user == currentuser) {
      const deletedblog = await Blog.findByIdAndDelete(req.params.id);
      if (!req.params.id) {
        return res.status(400).json({ error: "No Blog" });
      }
      res.send({ msg: "Deleted Successfully", deletedblog });
    } else {
      res.status(400).json({ error: "No permission to delete" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOneBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    res.status(200).json({ blog: blog });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find();

    res.status(200).json({ blogs: allBlogs });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const likedBlog = async (req, res) => {
  const userId = req.user.userId;
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    if (blog.likedBy.includes(userId)) {
      console.log(userId);
      return res.status(400).json({ msg: "Already Liked" });
    }

    blog.likes += 1;
    blog.likedBy.push(userId);
    await blog.save();
    res.json({ msg: "Liked successfully", likes: blog.likes });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const commentBlog = async (req, res) => {
  const userId = req.user.userId;
  const contentofcomment = req.body.content;
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(400).json({ msg: "Blog not found" });
    }
    const existingcomment = blog.comments.find(
      (comment) => comment.user.toString() === userId
    );
    if (existingcomment) {
      return res.status(400).json({ msg: "User has commented already" });
    }
    blog.comments.push({ user: userId, content: contentofcomment });
    await blog.save();

    res.json({ msg: "Comment added successfully" });
  } catch (err) {}
};
const getuserBlogs = async (req, res) => {
  const userId = req.params.id;
  //console.log(userId);
  try {
    const blogs = await Blog.find({ user: userId });
    res.json(blogs);
  } catch {
    res.status(500).json({ msg: "Internal server error" });
  }
};
const deleteComment = async (req, res) => {
  const { commentId, blogId } = req.params;
  const userId = req.user.userId;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      res.status(404).json({ msg: "Blog not found" });
    }

    const commentIndex = blog.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return res.status(404).json({ msg: "comment not found" });
    }
    if (blog.comments[commentIndex].user.toString() != userId) {
      return res.status(403).json({ msg: "Not authorised to delete comment" });
    }
    blog.comments.splice(commentIndex, 1);
    await blog.save();

    res.json({ msg: "Deleted Successfully" });
  } catch (err) {}
};
module.exports = {
  postBlog,
  updateBlog,
  deleteBlog,
  getOneBlog,
  getAllBlogs,
  likedBlog,
  commentBlog,
  getuserBlogs,
  deleteComment,
};
