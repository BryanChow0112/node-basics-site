const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // Set the header content type
  res.setHeader("Content-Type", "text/html");

  // Routing
  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200; // OK (Success)
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/contact":
      path += "contact-me.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.statusCode = 301; // Moved Permanently (Redirect)
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "404.html";
      res.statusCode = 404; // Not Found (Error)
      break;
  }

  // Send an HTML file as a response
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      //   res.write(data);
      res.end(data);
    }
    res.end();
  });
});

// localhost is the default host
server.listen(3000, () => {
  console.log("Listening for requests on port 3000");
});
