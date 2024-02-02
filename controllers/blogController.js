const Blog = require("../models/blog");

const postBlog = async (req, res) => {
  const { title } = req.body;

  const blog = new Blog({
    title,
    user: req.user.userId,
  });
  console.log(blog);
  await blog.save();

  res.status(201).json({ msg: "Blog Created Successfully" });
};

const updateBlog = async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!req.params.id) {
    return res.status(400).json({ error: "No Blog" });
  }
  res.send(updatedBlog);
  await updatedBlog.save();
};

const deleteBlog = async (req, res) => {
  try {
    const deletedblog = await Blog.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(400).json({ error: "No Blog" });
    }
    res.send(deletedblog);
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

module.exports = { postBlog, updateBlog, deleteBlog, getOneBlog, getAllBlogs };
