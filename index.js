const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/adminpanel")
  .then((res) => console.log("connect to database"))
  .catch((res) => console.log("not conenct"));

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  isAdmin: { type: Boolean, default: false },
  createAt: { type: Date, default: Date.now() },
});

const User = mongoose.model("User", userSchema);
app.post("/api/users", async (req, res) => {
  try {
    const newUserData = req.body;
    const user = new User(newUserData);
    await user.save();

    res.status(200).json({
      data: user,
      message: "new user added",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  readingTime: Number,
  createdAt: { type: Date, default: Date.now() },
});
const Blog = mongoose.model("Blog", blogSchema);
app.post("/api/blogs", async (req, res) => {
  try {
    const newUserData = req.body;
    const blog = new Blog(newUserData);
    await blog.save();

    res.status(200).json({
      data: blog,
      message: "new user added",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


app.listen(5000, () => console.log("connect 5000"));
