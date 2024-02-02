const express = require("express");
const router = express.Router();
const {
  postBlog,
  updateBlog,
  deleteBlog,
  getOneBlog,
  getAllBlogs,
} = require("../controllers/blogController");
const authenticateToken = require("../middleware/authorization");
const { loginUser } = require("../controllers/userController");
router.route("/postBlog").post(postBlog);
router.route("/updateBlog/:id").put(updateBlog);
router.route("/deleteBlog/:id").delete(deleteBlog);
router.route("/getBlog/:id").get(getOneBlog);
router.route("/getAllBlogs").get(getAllBlogs);

module.exports = router;
