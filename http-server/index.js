const http = require('http');
const args = require('minimist')(process.argv.slice(2), {
  string: ['port'],
  alias: { p: 'port' },
});

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
node index.js --port 5000
