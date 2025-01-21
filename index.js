const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // Set the header content type
  res.setHeader("Content-Type", "text/html");

  // Send an HTML file as a response
  fs.readFile("./views/index.html", (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.write(data);
      res.end();
    }
    res.end();
  });
});

// localhost is the default host
server.listen(3000, () => {
  console.log("Listening for requests on port 3000");
});
