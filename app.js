const express = require("express");

// Create an Express app
const app = express();
const PORT = 3000;

// Page routes
app.get("/", (req, res) => {
  // Tells Express to look for the file in the current directory
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./views/about.html", { root: __dirname });
});

app.get("/contact", (req, res) => {
  res.sendFile("./views/contact-me.html", { root: __dirname });
});

// Redirects
app.get("/about-me", (req, res) => {
  res.redirect("/about");
});

// 404 handler - must be last
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});

// Listen for requests on port 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});