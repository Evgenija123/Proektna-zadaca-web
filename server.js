
const http = require('http');

const fs = require('fs');


const path = require('path');


const port = 3001;

const publicDir = path.join(__dirname, 'public');

http.createServer((req, res) => {
  let filePath = req.url; 
  console.log(`Request for ${filePath}`); 
  if (filePath === '/') { 
    filePath = '/index1.html'; 
  }
  console.log(`Now is ${filePath}`); 
  filePath = path.join(publicDir, filePath); 
  console.log(`Full path is ${filePath}`); 

  fs.readFile(filePath, (err, content) => {
    if (err) { 
      if (err.code === 'ENOENT') {
       
        res.writeHead(404);
        res.end('404 Not Found');
      } else {
  
        res.writeHead(500);
        res.end('500 Internal Server Error');
      }
    } else {
  
      let contentType;
      switch (path.extname(filePath)) {
        case '.html':
          contentType = 'text/html';
          break;
        case '.css':
          contentType = 'text/css';
          break;
        case '.js':
          contentType = 'text/javascript';
          break;
        case '.jpg':
        case '.jpeg':
          contentType = 'image/jpeg';
          break;
        case '.png':
          contentType = 'image/png';
          break;
        case '.mp4':
          contentType = 'video/mp4';
          break;
        default:
          contentType = 'application/octet-stream';
      }

     
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
}).listen(port);

console.log(`Server listening on port ${port}`);
