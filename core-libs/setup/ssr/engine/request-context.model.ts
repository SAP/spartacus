/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExpressServerLogger } from '../logger/loggers/express-server-logger';

/**
 * Spartacus-specific context passed via REQUEST_CONTEXT under the `cx` namespace.
 *
 * This namespace prevents property name collisions with customer-provided
 * properties in REQUEST_CONTEXT. Customers can safely add their own properties
 * to REQUEST_CONTEXT without risk of overwriting Spartacus internals.
 */
export interface CxRequestContext {
  /**
   * Propagates errors from the Angular app to the server layer.
   * Used for CSR fallback on errors during SSR.
   */
  error: (error: unknown) => void;

  /**
   * Server logger for contextual logging with request information.
   */
  logger: ExpressServerLogger;
}

/**
 * Type representing REQUEST_CONTEXT with Spartacus `cx` namespace.
 *
 * Customers can add their own properties alongside the `cx` namespace
 * without risk of collision.
 */
export interface RequestContextWithCx {
  /**
   * Spartacus-specific context namespace.
   */
  cx: CxRequestContext;

  /**
   * Allows customer-provided properties.
   */
  [key: string]: unknown;
}
