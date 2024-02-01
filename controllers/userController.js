const User = require("../models/user");

const registerUser = async (req, res) => {
  res.status(200).json({ msg: "Hello" });
  //console.log(req.body);
  const user = new User(req.body);
  const savedUser = await user.save();
  //res.send({ user: savedUser._id });
  //console.log(user);
};
const loginUser = async (req, res) => {};

module.exports = { registerUser, loginUser };
