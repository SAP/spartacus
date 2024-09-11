/*
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
export async function sendRequest(path: string, cxConfig?: any) {
  return new Promise((resolve, reject) => {
    const req = http.get(
      {
        ...REQUEST_OPTIONS,
        path,
        headers: {
          Cookie: buildCxConfigE2ECookie(cxConfig),
        },
      },
      (res: any) => {
        const bodyChunks: any[] = [];

        res
          .on('data', (chunk: any) => {
            bodyChunks.push(chunk);
          })
          .on('end', () => {
            const buffer = Buffer.concat(bodyChunks);
            const data = buffer.toJSON().data;
            // TODO: Slice is hack to avoid hitting maximum call stack error
            res.body = String.fromCharCode(...data.slice(0, 105000));
            return resolve(res);
          });
      }
    );

    req.on('error', (e: Error) => {
      reject(e);
    });
  });
}

/**
 *   * Builds a cookie string with key 'cxConfigE2E' and the given `cxConfig`
 *     * object as a value that is stringified and URI-encoded.
 *       *
 *         * Note: `TestConfigModule` of Spartacus will read this cookie
 *           * and inject the passed config chunk into Spartacus global config.
 *             */
function buildCxConfigE2ECookie(cxConfig?: object): string {
  if (!cxConfig) {
    return '{}';
  }
  const cookieKey = 'cxConfigE2E';
  const cookieValue = encodeURIComponent(JSON.stringify(cxConfig));
  return `${cookieKey}=${cookieValue}`;
}
