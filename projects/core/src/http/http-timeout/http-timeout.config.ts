/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpContextToken } from '@angular/common/http';

/**
 * Angular HttpContext to configure a timeout for a HTTP request.
 *
 * Allows for configuring different timeout time per platform (in server vs. in browser).
 *
 * When undefined, no timeout will be applied.
 */
export const HTTP_TIMEOUT_CONFIG = new HttpContextToken<
  HttpTimeoutConfig | undefined
>(() => undefined);

/**
 * Configuration for timeout of HTTP requests
 */
export interface HttpTimeoutConfig {
  /**
   * Timeout in milliseconds for backend requests made in a server.
   */
  server?: number;

  /**
   * Timeout in milliseconds for backend requests made in a browser.
   */
  browser?: number;
}

export abstract class BackendHttpTimeoutConfig {
  timeout?: HttpTimeoutConfig;
}

declare module '../../occ/config/occ-config' {
  interface BackendConfig extends BackendHttpTimeoutConfig {}
}
