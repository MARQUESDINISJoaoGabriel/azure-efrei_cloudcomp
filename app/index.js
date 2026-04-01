const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/info', (req, res) => {
  res.json({ app: 'netwatch', version: '1.0.0', env: process.env.NODE_ENV || 'production' });
});

app.get('/', (req, res) => {
  res.send('<h1>netwatch1 - Azure VM App</h1><p><a href="/health">/health</a> | <a href="/api/info">/api/info</a></p>');
});

const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

module.exports = { app, server };
