/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as http from 'http';
import httpProxy from 'http-proxy';
import * as https from 'https';
import * as zlib from 'zlib';

/**
 * Options to start a proxy server.
 */
interface ProxyOptions {
  /**
   * The url to reroute requests to.
   */
  target: string;

  responseInterceptor?: (params: {
    /**
     * The body of the response from the upstream server.
     *
     * Note: we're exposing separately from the `proxyRes` object for convenience
     *       (because extracting it manually from `proxyRes` is very cumbersome)
     */
    body: string;

    /**
     * The response from the upstream server.
     */
    proxyRes: http.IncomingMessage;

    /**
     * The request that was sent to the upstream server.
     */
    req: http.IncomingMessage;

    /**
     * The response that will be sent to the client.
     */
    res: http.ServerResponse;
  }) => void;
}
function removeProtocol(url: string): string {
  return url.replace(/^https?:\/\//, '');
}
/**
 * Starts an http proxy server on port 9002 with the provided options.
 */
export async function startBackendProxyServer(
  options: ProxyOptions
): Promise<http.Server> {
  const proxy = httpProxy.createProxyServer({
    secure: false,
    selfHandleResponse: !!options.responseInterceptor,
    agent: new https.Agent({
      servername: removeProtocol(options.target),
    }),
  });
  proxy.on('proxyReq', (proxyReq, req) => {
    proxyReq.setHeader('host', removeProtocol(options.target));
    console.log('proxyReq headers:', proxyReq.getHeaders());
    console.log('proxyReq URL:', proxyReq.path);
    const headers = proxyReq.getHeaders();
    const url = `${options.target}${proxyReq.path}`;

    // Build curl header flags
    const headerFlags = Object.entries(headers)
      .map(([key, value]) => `-H "${key}: ${value}"`)
      .join(' ');

    // Build curl command
    const curlCmd = `curl -X ${req.method} ${headerFlags} "${url}"`;
    console.log('Equivalent curl command:', curlCmd);
  });
  if (options.responseInterceptor) {
    proxy.on('proxyRes', (proxyRes, req, res) => {
      // We have to buffer the response body before passing it to the interceptor
      const bodyBuffer: Buffer[] = [];
      proxyRes.on('data', (chunk) => {
        bodyBuffer.push(chunk);
      });
      proxyRes.on('end', () => {
        const body = decompressBody(
          Buffer.concat(bodyBuffer),
          proxyRes.headers['content-encoding']
        );

        // Pass the body to the interceptor
        if (options.responseInterceptor) {
          options.responseInterceptor({
            body,
            proxyRes,
            res,
            req,
          });
        } else {
          res.end(body);
        }
      });
    });
  }

  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      proxy.web(req, res, { target: options.target });
    });

    server.listen(9002, () => {
      resolve(server);
    });
  });
}

function decompressBody(buffer: Buffer, encoding?: string): string {
  switch (encoding) {
    case 'gzip':
      return zlib.gunzipSync(buffer).toString();
    case 'deflate':
      return zlib.inflateSync(buffer).toString();
    default:
      return buffer.toString();
  }
}
