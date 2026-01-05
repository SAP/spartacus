/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Synchronous utility to determine JDK version in Cypress tests.
 *
 * Uses JDK_VERSION from the Cypress environment variables.
 */
export function isJDK17(): boolean {
  return Cypress.env('JDK_VERSION') === 'JDK17';
}

/**
 * Synchronous utility to execute a callback when the JDK version is 17, then return the result.
 */
export function whenJDK17<T, E = never>(cb: () => T, elseCb?: () => E): T | E {
  if (isJDK17()) {
    return cb?.();
  } else {
    return elseCb?.();
  }
}

/**
 * Synchronous utility to execute a callback when the JDK version is 17, then return the result.
 */
export function whenJDK21<T, E = never>(cb: () => T, elseCb?: () => E): T | E {
  return whenJDK17(elseCb, cb);
}
