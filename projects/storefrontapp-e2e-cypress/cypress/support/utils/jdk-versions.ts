/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export function isJDK17(): boolean {
  return Cypress.env('JDK_VERSION') === 'JDK17';
}

export function whenJDK17<T, E = never>(cb: () => T, elseCb?: () => E): T | E {
  if (isJDK17()) {
    return cb?.();
  } else {
    return elseCb?.();
  }
}

export function whenJDK21<T, E = never>(cb: () => T, elseCb?: () => E): T | E {
  return whenJDK17(elseCb, cb);
}
