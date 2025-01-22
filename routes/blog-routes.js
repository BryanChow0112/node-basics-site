const express = require("express");
const blogController = require("../controllers/BlogController");

const router = express.Router();

// Blog routes with their corresponding controller methods
router.get("/create", blogController.blog_create_get); // Display blog creation form
router.get("/", blogController.blog_index); // Display all blogs
router.post("/", blogController.blog_create_post); // Handle new blog creation
router.get("/:id", blogController.blog_details); // Display single blog
router.delete("/:id", blogController.blog_delete); // Delete a blog

module.exports = router;
