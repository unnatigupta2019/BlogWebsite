const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretkey = "poiuytrewq";

const registerUser = async (req, res) => {
  const user = new User(req.body);

  await user.save();
  res.status(201).json({ msg: "User registered" });
};
const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const result = await bcrypt.compare(req.body.password, user.password);
    if (result) {
      const token = jwt.sign({ userId: user._id }, secretkey, {
        expiresIn: "1h",
      });
      res.status(200).send({ msg: "Logged In", token });
    } else {
      res.status(400).json({ error: "password doesn't match" });
    }
  } else {
    res.status(400).json({ error: "User doesn't exist" });
  }
};
const deleteUser = async (req, res) => {
  const deleteUser = await User.findByIdAndDelete(req.params.id);
  if (!req.params.id) {
    return res.status(400).json({ error: "Wrong User" });
  }
  res.send(deleteUser);
};
const updateUser = async (req, res) => {
  const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!req.params.id) {
    return res.status(400).json({ error: "Wrong User" });
  }
  res.send(updateUser);
  await updateUser.save();
};

module.exports = { registerUser, loginUser, deleteUser, updateUser };
