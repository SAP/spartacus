/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generates a unique email address for testing purposes.
 *
 * @param alias - A string to identify the user (e.g., 'admin', 'guest').
 * @param useNewTimestamp - If true, generates a new timestamp; otherwise, uses the Cypress 'TIMESTAMP' env variable.
 * @returns A unique email address string.
 */
export function generateMail(alias: string, useNewTimestamp: boolean): string {
  const baseTimestamp = 1535535333333;
  const timestamp = useNewTimestamp
    ? Date.now() - baseTimestamp
    : Cypress.env('TIMESTAMP');
  return `cypress_user_${alias}_${timestamp}@sapcx.com`;
}

/**
 * Generates a random alphanumeric string of length 9.
 *
 * @returns A random string containing lowercase letters and numbers.
 */
export function randomString(): string {
  const length = 9;
  return Math.random().toString(36).substring(2, 2 + length);
}