const express = require("express");
const path = require("node:path");
const morgan = require("morgan");
const app = express();
const PORT = 3000;

// Set the view engine to EJS
app.set("view engine", "ejs");
// Look for views in the views directory
app.set("views", path.join(__dirname, "views"));

// Middleware and static files
app.use(express.static(path.join(__dirname, "public")));

// HTTP request logger
app.use(morgan("dev"));

// Page routes
app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur"
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur"
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur"
    }
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// 404 handler - must be last
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

// Listen for requests on port 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
