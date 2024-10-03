/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as http from 'http';
import httpProxy from 'http-proxy';

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

/**
 * Starts an http proxy server on port 9002 with the provided options.
 */
export async function startBackendProxyServer(
  options: ProxyOptions
): Promise<http.Server> {
  const proxy = httpProxy.createProxyServer({
    secure: false,
    selfHandleResponse: !!options.responseInterceptor,
  });
  if (options.responseInterceptor) {
    proxy.on('proxyRes', (proxyRes, req, res) => {
      // We have to buffer the response body before passing it to the interceptor
      const bodyBuffer: Buffer[] = [];
      proxyRes.on('data', (chunk) => {
        bodyBuffer.push(chunk);
      });
      proxyRes.on('end', () => {
        const body = Buffer.concat(bodyBuffer).toString();

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
