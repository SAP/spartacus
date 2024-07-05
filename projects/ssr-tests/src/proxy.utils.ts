/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as http from 'http';
import * as httpProxy from 'http-proxy';

const proxy = (<any>httpProxy).createProxyServer({ secure: false });

/**
 * Default settings to send http requests.
 */
const REQUEST_OPTIONS = {
  host: 'localhost',
  port: 4000,
};

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
   * Number of status code to set response to.
   */
  throwStatus?: number;
}

/**
 * Starts an http proxy server on port 9002 with the provided options.
 */
export async function startProxyServer(options: ProxyOptions) {
  return new Promise((resolve) => {
    const server = http.createServer((req: any, res: any) => {
      const forwardRequest = () =>
        proxy.web(req, res, { target: options.target });

      if (options.throwStatus) {
        proxy.on('proxyRes', (proxyRes: any) => {
          proxyRes.statusCode = options.throwStatus;
        });
      }

      if (options.delay) {
        setTimeout(forwardRequest, options.delay);
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
 * Send an http GET request to a given url.
 */
export async function sendRequest(path: string) {
  return new Promise((resolve, reject) => {
    const req = http.get({ ...REQUEST_OPTIONS, path }, (res: any) => {
      const bodyChunks: string[] = [];

      res
        .on('data', (chunk: any) => {
          bodyChunks.push(chunk);
        })
        .on('end', () => {
          res.bodyChunks = bodyChunks;
          return resolve(res);
        });
    });

    req.on('error', (e: Error) => {
      reject(e);
    });
  });
}
