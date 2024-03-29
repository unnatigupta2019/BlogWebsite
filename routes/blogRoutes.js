const express = require("express");
const router = express.Router();
const {
  postBlog,
  updateBlog,
  deleteBlog,
  getOneBlog,
  getAllBlogs,
  likedBlog,
  commentBlog,
  getuserBlogs,
  deleteComment,
} = require("../controllers/blogController");

router.route("/postBlog").post(postBlog);
router.route("/updateBlog/:id").put(updateBlog);
router.route("/deleteBlog/:id").delete(deleteBlog);
router.route("/getBlog/:id").get(getOneBlog);
router.route("/getAllBlogs").get(getAllBlogs);
router.route("/getuserblogs/:id").get(getuserBlogs);
router.route("/deleteComment/:blogId/comment/:commentId").delete(deleteComment);
router.route("/likeBlog/:id").post(likedBlog);
router.route("/commentBlog/:id").post(commentBlog);

module.exports = router;
