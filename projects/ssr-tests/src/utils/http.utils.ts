/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestConfig } from '@spartacus/core';
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

export interface TestRequest {
  path: string;

  /**
   * Custom Spartacus config chunk to be injected into the Spartacus app under test.
   *
   * It allows to have a Spartacus app that was built once, but test it with various
   * (dynamically injected) configuration variants (e.g. various feature toggles enabled/disabled).
   */
  testConfig?: TestConfig;
}

/**
 * Send an http GET request with given URL to the SSR server.
 */
export async function sendRequestToSsrServer(
  testRequest: TestRequest
): Promise<SsrResponse> {
  return new Promise((resolve, reject) => {
    http
      .get(
        {
          ...REQUEST_OPTIONS,
          path: testRequest.path,
          headers: {
            Cookie: buildCxConfigE2ECookie(testRequest?.testConfig),
          },
        },
        (res) => {
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
        }
      )
      .on('error', (e: Error) => {
        reject(e);
      });
  });
}

/**
 * Builds a cookie string with key 'cxConfigE2E' and the given `cxConfig`
 * object as a value that is stringified and URI-encoded.
 *
 * Note: `TestConfigModule` of Spartacus will read this cookie
 *       and inject the passed config chunk into Spartacus global config.
 */
function buildCxConfigE2ECookie(cxConfig?: object): string {
  if (!cxConfig) {
    return '{}';
  }
  const cookieKey = 'cxConfigE2E';
  const cookieValue = encodeURIComponent(JSON.stringify(cxConfig));
  return `${cookieKey}=${cookieValue}`;
}
