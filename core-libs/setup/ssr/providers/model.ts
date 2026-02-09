/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Server options
 */
export interface ServerOptions {
  /**
   * Specify a domain (origin) from which the HTTP requests are being made.
   * Should be without the trailing slash, e.g. "https://my.domain.com".
   *
   * Resolution order:
   * 1. This explicit option (takes precedence)
   * 2. `SERVER_REQUEST_ORIGIN` token from injector (set by Express engine during SSR)
   * 3. `SERVER_REQUEST_ORIGIN` environment variable
   * 4. Default fallback `http://localhost:4200` (for build-time route extraction)
   *
   * In SSR mode, it will be automatically resolved from the Express server,
   * therefore it doesn't have to be set via this option.
   * If explicitly set, this option will take precedence over the Express server.
   *
   * For prerendering with actual page rendering (not just route extraction),
   * it is recommended to provide it via the `SERVER_REQUEST_ORIGIN` environment
   * variable to ensure correct URL matching for base site detection.
   *
   * During build-time route extraction (which occurs with Angular 19+ `outputMode: "server"`),
   * a fallback value is used automatically if no origin is configured, allowing
   * builds to complete without explicit configuration.
   */
  serverRequestOrigin?: string;
}
