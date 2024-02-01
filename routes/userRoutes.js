const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController.js");
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

module.exports = router;
