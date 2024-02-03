const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  //   article: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "blog",
  //     },
  //   ],
});

//Hashing
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  // console.log(this.password);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
