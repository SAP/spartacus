/**
 * Development CORS proxy for the Vivaldi BFF.
 *
 * Problem: The BFF dev server uses a self-signed HTTPS cert and does not
 * send CORS headers. Browsers block cross-origin fetch calls to it.
 *
 * This script runs a plain HTTP proxy on port 8483 that:
 *   1. Forwards all requests to https://localhost:8482 (the real BFF)
 *   2. Adds Access-Control-Allow-Origin / CORS headers to every response
 *
 * Usage (run alongside `ng serve` and `vivaldi dev bff`):
 *   node projects/storefrontapp/bff-proxy.mjs
 *
 * Then set CX_BFF_BASE_URL=http://localhost:8483/bff/api
 * (already the default in .env-cmdrc dev profile after this change).
 *
 * No npm install needed — uses only Node.js built-ins.
 */

import { createServer } from 'http';
import { request as httpsRequest } from 'https';

const PROXY_PORT = 8483;
const BFF_HOST = 'localhost';
const BFF_PORT = 8482;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

createServer((req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS_HEADERS);
    res.end();
    return;
  }

  const options = {
    hostname: BFF_HOST,
    port: BFF_PORT,
    path: req.url,
    method: req.method,
    headers: req.headers,
    rejectUnauthorized: false, // accept self-signed cert
  };

  const proxyReq = httpsRequest(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, {
      ...proxyRes.headers,
      ...CORS_HEADERS,
    });
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error('Proxy error:', err.message);
    res.writeHead(502);
    res.end(`BFF proxy error: ${err.message}`);
  });

  req.pipe(proxyReq);
}).listen(PROXY_PORT, () => {
  console.log(`BFF CORS proxy running on http://localhost:${PROXY_PORT}`);
  console.log(`Forwarding to https://localhost:${BFF_PORT}`);
});
