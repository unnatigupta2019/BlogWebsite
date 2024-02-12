const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes.js");
const blogRoutes = require("./routes/blogRoutes.js");
const authenticateToken = require("./middleware/authorization.js");
const serverless = require("serverless-http");
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://unnati2002:unnati2002@cluster0.lwkfyji.mongodb.net/blogApp"
  )
  .then(() => console.log("Mongo Connected"))
  .catch((err) => console.log("Error"));

app.use("/api/user", userRoutes);
app.use("/api/blog", authenticateToken, blogRoutes);

app.listen(5000, () => {
  console.log("Running");
});

module.exports.handler = serverless(app);
