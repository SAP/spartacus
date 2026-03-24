/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as http from 'http';
import httpProxy from 'http-proxy';
import { Agent as HttpsAgent } from 'https';
import { gunzipSync, inflateSync } from 'zlib';

/**
 * Set to `true` if the target server is a CCv2 server.
 *
 * This is needed to set up a custom HTTPS agent with the correct SNI servername.
 */
const IS_CCV2_SERVER = false;
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
function extractUrlWithoutProtocol(url: string): string {
  return url.replace(/^https?:\/\//, '');
}
/**
 * Starts an http proxy server on port 9002 with the provided options.
 */
export async function startBackendProxyServer(
  options: ProxyOptions
): Promise<http.Server> {
  const proxyOptions: httpProxy.ServerOptions = {
    secure: false,
    selfHandleResponse: !!options.responseInterceptor,
  };

  // Add custom agent to support CCv2 servers
  if (IS_CCV2_SERVER) {
    proxyOptions.agent = new HttpsAgent({
      servername: extractUrlWithoutProtocol(options.target),
    });
  }

  const proxy = httpProxy.createProxyServer(proxyOptions);

  proxy.on('proxyReq', (proxyReq) => {
    proxyReq.setHeader('host', extractUrlWithoutProtocol(options.target));
  });

  if (options.responseInterceptor) {
    proxy.on('proxyRes', (proxyRes, req, res) => {
      // We have to buffer the response body before passing it to the interceptor
      const bodyBuffer: Buffer[] = [];
      proxyRes.on('data', (chunk) => {
        bodyBuffer.push(chunk);
      });
      proxyRes.on('end', () => {
        const body = unzipResponseBody(
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

function unzipResponseBody(buffer: Buffer, encoding?: string): string {
  switch (encoding) {
    case 'gzip':
      return gunzipSync(buffer).toString();
    case 'deflate':
      return inflateSync(buffer).toString();
    default:
      return buffer.toString();
  }
}
