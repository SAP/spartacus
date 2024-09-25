/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as http from 'http';

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
