const express = require('express');
const path = require('path');
const fs = require('fs');
const route = express.Router();

route.get('/video/:filename', (request, response) => {
    response.setHeader('Content-Type', 'video/mp4');
    const filename = request.params.filename;
  // Read the video file from disk
  const filePath = path.join(__dirname, `../public/UserPost/${filename}`);
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = request.headers.range;

  if (range) {
    // If a range header is present, send partial content
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };
    response.writeHead(206, head);
    file.pipe(response);
  } else {
    // If no range header is present, send the entire file
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    response.writeHead(200, head);
    fs.createReadStream(filePath).pipe(response);
  }
});

module.exports = route;