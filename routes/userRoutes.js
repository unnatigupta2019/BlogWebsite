const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController.js");
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/delete/:id").delete(deleteUser);
router.route("/update/:id").put(updateUser);
module.exports = router;
