// Import required modules
const express = require("express");
const path = require("node:path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blog-routes");

const PORT = 3000;

// Initialize Express app
const app = express();

// MongoDB connection string
const dbURI =
  "mongodb+srv://odin:test1234@cluster0.ocby7.mongodb.net/node_learning?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB and start server
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// View engine configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware Setup
// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, "public")));
// Parse URL-encoded bodies (for form data)
app.use(express.urlencoded({ extended: true }));
// HTTP request logger
app.use(morgan("dev"));

// Routes
// Home page redirect to blogs
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// About page
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// Blog routes
app.use("/blogs", blogRoutes);

// 404 page - catch all unhandled routes
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
