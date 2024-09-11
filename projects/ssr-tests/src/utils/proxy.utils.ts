/*
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
  /**
   * Number of seconds to delay requests before sending.
   */
  delay?: number;
  /**
   * Callback to be executed if the request to the target got a response.
   */
  callback?: httpProxy.ProxyResCallback;
}

/**
 * Starts an http proxy server on port 9002 with the provided options.
 */
export async function startBackendProxyServer(
  options: ProxyOptions
): Promise<http.Server> {
  const proxy = httpProxy.createProxyServer({
    secure: false,
  });
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const forwardRequest = () =>
        proxy.web(req, res, { target: options.target });

      if (options.callback) {
        // Add one-time listener for the proxy response that stays until `proxyRes` event is triggered next time.
        proxy.once('proxyRes', options.callback);
      }

      if (options.delay) {
        setTimeout(() => {
          forwardRequest();
        }, options.delay);
      } else {
        forwardRequest();
      }
    });

    server.listen(9002, () => {
      resolve(server);
    });
  });
}
