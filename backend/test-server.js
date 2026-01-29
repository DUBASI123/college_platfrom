const express = require('express');
const app = express();

app.get('/api/health', (req, res) => {
  console.log('Health check requested');
  res.json({ status: 'OK', message: 'Server is running' });
});

const PORT = 5000;
const HOST = '127.0.0.1';
const server = app.listen(PORT, HOST, () => {
  console.log(`Test server running on ${HOST}:${PORT}`);
  console.log('Health check available at http://localhost:5000/api/health');
});

server.on('error', (err) => {
  console.error('Server error:', err);
});
