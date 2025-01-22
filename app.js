const express = require("express");
const path = require("node:path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/Blog");
const PORT = 3000;

// Create an Express app
const app = express();

// Connect to MongoDB
const dbURI =
  "mongodb+srv://odin:test1234@cluster0.ocby7.mongodb.net/node_learning?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000)) // Listen for requests on port 3000 after connected to MongoDB
  .catch((err) => console.log(err));

// Set the view engine to EJS
app.set("view engine", "ejs");
// Look for views in the views directory
app.set("views", path.join(__dirname, "views"));

// Middleware and static files
app.use(express.static(path.join(__dirname, "public")));

// HTTP request logger
app.use(morgan("dev"));

// Test routes for MongoDB
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog",
    snippet: "about my new blog",
    body: "more about my new blog"
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/single-blog", (req, res) => {
  Blog.findById("67909bcaa0e557f9351fdc33")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Page routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// Blog routes
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { blogs: result, title: "All blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

// 404 handler - must be last
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
