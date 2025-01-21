const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.write("<h1>Hello World</h1>");
  res.end();
});

// localhost is the default host
server.listen(3000, () => {
  console.log("Listening for requests on port 3000");
});
