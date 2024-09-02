/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as http from 'http';
import httpProxy, { ProxyResCallback } from 'http-proxy';

const proxy = httpProxy.createProxyServer({
  secure: false,
  // selfHandleResponse: true,
});

/**
 * Default settings to send http requests.
 */
const REQUEST_OPTIONS = {
  host: 'localhost',
  port: 4000,
};

/**
 * Response from SSR server.
 */
export interface SsrResponse {
  statusCode: number | undefined;
  headers: http.IncomingHttpHeaders;
  body: string;
}

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
  callback?: ProxyResCallback;
}

/**
 * Starts an http proxy server on port 9002 with the provided options.
 */
export async function startBackendProxyServer(
  options: ProxyOptions
): Promise<http.Server> {
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

/**
 * Send an http GET request with given URL to the SSR server.
 */
export async function sendRequestToSsrServer(
  path: string
): Promise<SsrResponse> {
  return new Promise((resolve, reject) => {
    http
      .get({ ...REQUEST_OPTIONS, path }, (res) => {
        let body = '';
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body,
          });
        });
      })
      .on('error', (e: Error) => {
        reject(e);
      });
  });
}
