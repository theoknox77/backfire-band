const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3003;
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.svg': 'image/svg+xml' };

http.createServer((req, res) => {
  const file = req.url === '/' ? '/index.html' : req.url;
  const fp = path.join(__dirname, file);
  const ext = path.extname(fp);
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(PORT, () => console.log(`BACKFIRE site live at http://localhost:${PORT}`));
