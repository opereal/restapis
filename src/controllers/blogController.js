const Blog = require("../models/blogModels");
const { getCurrentUser } = require("../services/userServices");

// get all blogs on database
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});

    if (blogs.length <= 0) {
      return res.status(404).json({ error: "no blog found" });
    }

    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

// create new blog
const createNewBlog = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user;
  try {
    const user = await getCurrentUser(id);

    if (!user) {
      return res.status(403).json({ error: "you must be signed in" });
    }

    const blogData = {
      title,
      content,
      author: { email: user.email, userId: user._id },
    };

    const newBlog = new Blog(blogData);
    await newBlog.save();

    if (!newBlog) {
      return res.status(400).json({ error: "blog creation failed" });
    }

    return res
      .status(200)
      .json({ message: "blog created successfully", newBlog });
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

// update blog
const updateBlog = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user;
  const { blogId } = req.params;
  try {
    const user = await getCurrentUser(id);

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(403).json({ error: "blog does not exist" });
    }

    if (!user) {
      return res.status(403).json({ error: "you must be signed in" });
    }

    blog.title = title;
    blog.content = content;

    await blog.save();

    return res.status(200).json({ message: "blog updated successfully", blog });
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

// delete blog
const deleteBlog = async (req, res) => {
  const { blogId } = req.params;

  try {
    await Blog.findByIdAndDelete(blogId);

    return res.status(200).json({ message: "blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

module.exports = { getAllBlogs, createNewBlog, updateBlog, deleteBlog };
