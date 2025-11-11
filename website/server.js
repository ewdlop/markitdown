const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const webRoot = path.join(__dirname);

const MCP_TARGET = process.env.MCP_TARGET || 'http://127.0.0.1:3001';
const PORT = process.env.PORT || 8080;

app.use(express.static(webRoot));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,Accept'
};

app.options(['/mcp', '/mcp/'], (req, res) => {
  res.set({
    ...corsHeaders,
    Vary: 'Origin'
  });
  res.sendStatus(204);
});

const proxy = createProxyMiddleware({
  target: MCP_TARGET,
  changeOrigin: true,
  selfHandleResponse: false,
  pathRewrite: (path) => {
    if (path === '/mcp') return '/mcp/';
    return path;
  },
  onProxyRes(proxyRes) {
    Object.entries(corsHeaders).forEach(([key, value]) => {
      proxyRes.headers[key] = value;
    });
    proxyRes.headers.Vary = 'Origin';
  }
});

app.use('/mcp', proxy);
app.use('/mcp/', proxy);

app.listen(PORT, () => {
  console.log(`Static site and MCP proxy available at http://127.0.0.1:${PORT}`);
  console.log(`Forwarding /mcp requests to ${MCP_TARGET}`);
});

