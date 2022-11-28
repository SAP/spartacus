/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
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
   * In SSR mode, it will be automatically resolved from the express server,
   * therefore it doesn't have to be set via this option.
   * If explicitly set, this option will take precedence over the express server.
   *
   * It is _mandatory_ to provide it for the prerendering, as it can not be
   * automatically resolved.
   */
  serverRequestOrigin?: string;
}
