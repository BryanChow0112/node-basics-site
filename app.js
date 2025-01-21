const express = require("express");

// Create an Express app
const app = express();
const PORT = 3000;

// Page routes
/**
 * app.get() - Routes HTTP GET requests to the specified path with the specified callback functions.
 * Syntax: app.get(path, handler)
 * @param {string} path - URL path to match
 * @param {function} handler - Callback function(req, res) to handle the request
 */
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
/**
 * app.use() - Mounts middleware function at specified path
 * When no path is specified, it runs for all requests to the app
 * Middleware functions run in the order they are defined
 * Common uses: error handling, authentication, serving static files
 */
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});

// Listen for requests on port 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });