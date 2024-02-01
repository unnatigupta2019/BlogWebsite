const User = require("../models/user");
const bcrypt = require("bcrypt");
const registerUser = async (req, res) => {
  //console.log(req.body);
  const user = new User(req.body);

  const savedUser = await user.save();
  //res.send({ user: savedUser._id });
  //console.log(user);
  res.status(201).json({ msg: "User registered" });
};
const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const result = await bcrypt.compare(req.body.password, user.password);
    if (result) {
      res.status(201).json({ msg: "User Logged In" });
    } else {
      res.status(400).json({ error: "password doesn't match" });
    }
  } else {
    res.status(400).json({ error: "User doesn't exist" });
  }
};
const deleteUser = async (req, res) => {
  const deleteUser1 = await User.findByIdAndDelete(req.params.id);
  if (!req.params.id) {
    return res.status(400).json({ error: "Wrong User" });
  }
  res.send(deleteUser1);
};
const updateUser = async (req, res) => {
  const updateUser1 = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!req.params.id) {
    return res.status(400).json({ error: "Wrong User" });
  }
  res.send(updateUser1);
  await updateUser1.save();
};

module.exports = { registerUser, loginUser, deleteUser, updateUser };
