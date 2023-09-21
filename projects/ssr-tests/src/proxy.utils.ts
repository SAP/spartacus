/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as http from 'http';
import * as httpProxy from 'http-proxy';

const proxy = (<any>httpProxy).createProxyServer({ secure: false });

const REQUEST_OPTIONS = {
  host: 'localhost',
  port: 4000,
};

/**
 * @param {Object} options Setup options for proxy server.
 * @param {string} options.target The url to reroute requests to.
 * @param {number} options.delay Number of seconds to delay requests before sending.
 * @param {number} options.throwStatus Number of status code to set response to.
 */
export async function startProxyServer(options: any) {
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

export async function sendRequest(path: string) {
  return new Promise((resolve, reject) => {
    const req = http.get({ ...REQUEST_OPTIONS, path }, function (res: any) {
      // Buffer the body entirely for processing as a whole.
      const bodyChunks: string[] = [];
      res
        .on('data', function (chunk: any) {
          bodyChunks.push(chunk);
        })
        .on('end', () => {
          res.bodyChunks = bodyChunks;
          return resolve(res);
        });
    });

    req.on('error', function (e: Error) {
      reject(e);
    });
  });
}
