const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
});

const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;
