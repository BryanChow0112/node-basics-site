const express = require("express");
const path = require("node:path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blog-routes");
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

// Parse URL-encoded bodies (as sent by HTML forms) and make it available under req.body
app.use(express.urlencoded({ extended: true }));

// HTTP request logger
app.use(morgan("dev"));

// Page routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// Blog routes
app.use("/blogs", blogRoutes);

// 404 handler - must be last
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
