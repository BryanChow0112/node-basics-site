const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Blog Schema
const blogSchema = new Schema(
  {
    // Title field - required string
    title: {
      type: String,
      required: true
    },
    // Snippet field - required string for blog preview
    snippet: {
      type: String,
      required: true
    },
    // Body field - required string for main content
    body: {
      type: String,
      required: true
    }
  },
  // Add timestamps (createdAt, updatedAt)
  { timestamps: true }
);

// Create model from schema
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
