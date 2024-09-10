const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain");

  if (req.url === "/") {
    res.statusCode = 200;
    res.end("Hello, World!");
  } else {
    res.statusCode = 404;
    res.end("Page Not Found");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
