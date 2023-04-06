const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const args = require('minimist')(process.argv.slice(2), {
  string: ['port'],
  alias: { p: 'port' },
});

const port = args.port || process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url);
  const reqPath = reqUrl.pathname;
  
  if (reqPath === '/') {
    const homePath = path.join(__dirname, 'home.html');
    fs.readFile(homePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal server error');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } else if (reqPath === '/project') {
    const projectPath = path.join(__dirname, 'project.html');
    fs.readFile(projectPath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal server error');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } else if (reqPath === '/registration') {
   
