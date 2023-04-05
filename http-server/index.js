const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!');
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
  const fs = require('fs');
  app.get('/registration', (req, res) => {
  // TODO: Serve the registration form HTML file
});
});
.listen(5000);
