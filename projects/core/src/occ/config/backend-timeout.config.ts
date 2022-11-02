/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Configuration for timeout of HTTP requests
 */
export abstract class BackendTimeoutConfig {
  /**
   * Timeout in milliseconds for backend requests made in a server.
   */
  server?: number;

  /**
   * Timeout in milliseconds for backend requests made in a browser.
   */
  browser?: number;
}
