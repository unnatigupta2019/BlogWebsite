const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  // description: {
  //   type: String,
  // },
  // like: {
  //   type: Number,
  //   default: 0,
  // },
  // comment: {
  //   type: String,
  // },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;
