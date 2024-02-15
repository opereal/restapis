const express = require("express");
const {
  getAllBlogs,
  createNewBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const requireSignin = require("../middlewares/Authtenticate");
const router = express.Router();

router.get("/", getAllBlogs);

router.post("/", requireSignin, createNewBlog);

router.put("/:blogId", requireSignin, updateBlog);

router.delete("/:blogId", requireSignin, deleteBlog);

module.exports = router;
