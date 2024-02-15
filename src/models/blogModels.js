const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      email: String,
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    },

    comments: [
      {
        user: { userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" } },
        text: String,
        createdAt: { type: Date, default: Date.now() },
      },
    ],
  },
  { timestamps: true }
);

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
